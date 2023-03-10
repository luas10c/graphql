import {
  GqlModuleAsyncOptions,
  GqlModuleOptions,
  GqlOptionsFactory,
} from '@nestjs/graphql';
import { MercuriusOptions } from 'mercurius';
import { MercuriusHooks } from './mercurius-hook.interface';
import { MercuriusPlugins } from './mercurius-plugin.interface';

export type MercuriusDriverConfig = GqlModuleOptions &
  MercuriusOptions &
  MercuriusPlugins &
  MercuriusHooks;

export type MercuriusDriverConfigFactory =
  GqlOptionsFactory<MercuriusDriverConfig>;
export type MercuriusDriverAsyncConfig =
  GqlModuleAsyncOptions<MercuriusDriverConfig>;
