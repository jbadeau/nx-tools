/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface PrismaResetSchema {
  /**
   * The path to the prisma schema eg. 'prisma/schema.prisma'
   */
  schema: string;
  /**
   * Remove all terminal outputs the child process
   */
  silent?: boolean;
  [k: string]: unknown;
}
