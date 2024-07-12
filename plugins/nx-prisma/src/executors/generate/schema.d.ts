/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

import { PrismaBase } from '../../interfaces';

/**
 * Generate artifacts (e.g. Prisma Client).
 */
export interface GenerateExecutorSchema extends PrismaBase {
  /**
   * The generate command will generate Prisma Client for use with the Data Proxy.
   */
  'data-proxy'?: boolean;
  /**
   * Specifies the generator to use for generating prisma client.
   */
  generator?: string;
  /**
   * The generate command will continue to watch the schema.prisma file and re-generate Prisma Client on file changes.
   */
  watch?: boolean;
}