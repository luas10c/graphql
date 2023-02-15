import { mergeTypeDefs } from '@graphql-tools/merge';
import { Injectable } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { flatten } from 'lodash';
import glob from 'fast-glob';
import normalize from 'normalize-path';

@Injectable()
export class GraphQLTypesLoader {
  async mergeTypesByPaths(paths: string | string[]): Promise<string> {
    if (!paths || paths.length === 0) {
      return null;
    }
    const types = await this.getTypesFromPaths(paths);
    const flatTypes = flatten(types);

    return mergeTypeDefs(flatTypes, {
      throwOnConflict: true,
      commentDescriptions: true,
      reverseDirectives: true,
    });
  }

  private async getTypesFromPaths(paths: string | string[]): Promise<string[]> {
    const includeNodeModules = this.includeNodeModules(paths);

    paths = Array.isArray(paths)
      ? paths.map((path) => normalize(path))
      : normalize(paths);

    const filePaths = await glob(paths, {
      ignore: includeNodeModules ? [] : ['node_modules'],
    });
    if (filePaths.length === 0) {
      throw new Error(
        `No type definitions were found with the specified file name patterns: "${paths}". Please make sure there is at least one file that matches the given patterns.`,
      );
    }
    const fileContentsPromises = filePaths.sort().map((filePath) => {
      return readFile(filePath.toString(), 'utf8');
    });

    return Promise.all(fileContentsPromises);
  }

  private includeNodeModules(pathOrPaths: string | string[]): boolean {
    if (Array.isArray(pathOrPaths)) {
      return pathOrPaths.some((path) => path.includes('node_modules'));
    }
    return pathOrPaths.includes('node_modules');
  }
}
