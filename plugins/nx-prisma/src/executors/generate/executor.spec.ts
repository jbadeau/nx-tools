import { getExecOutput } from '@nx-tools/core';
import { ExecutorContext } from '@nx/devkit';
import executor from './executor';
import { GenerateExecutorSchema } from './schema';

jest.mock('@nx-tools/core', () => {
  const originalModule = jest.requireActual('@nx-tools/core');
  return {
    __esModule: true,
    ...originalModule,
    getExecOutput: jest.fn(async () => Promise.resolve({ stderr: '', exitCode: 0 })),
  };
});

const context: ExecutorContext = {
  root: 'workspace-root',
  projectsConfigurations: { version: 2, projects: { foo: { root: 'apps/foo' } } },
  projectName: 'foo',
  cwd: process.cwd(),
  isVerbose: false,
};

export const expectCommandToHaveBeenCalled = (cmd: string, args: string[]) => {
  expect(getExecOutput).toHaveBeenCalledWith(cmd, args, {
    ignoreReturnCode: true,
  });
};

describe('Generate Executor', () => {
  beforeEach(() => {
    jest.spyOn(console, 'info').mockImplementation(() => true);
  });

  it('can run with empty options', async () => {
    const options: GenerateExecutorSchema = {};
    const output = await executor(options, context);
    expect(
      expectCommandToHaveBeenCalled('npx prisma generate', ['--schema=workspace-root/apps/foo/prisma/schema.prisma'])
    );
    expect(output.success).toBeTruthy();
  });

  test.each([['schema', 'my-prisma-file.schema']])(
    'given %p option with %p value, should be handled has arg',
    async (option: keyof GenerateExecutorSchema, value: string) => {
      const options: GenerateExecutorSchema = {
        [option]: value,
      };
      const output = await executor(options, context);
      expect(expectCommandToHaveBeenCalled('npx prisma generate', [`--${option}=${value}`]));
      expect(output.success).toBeTruthy();
    }
  );

  test.each([['data-proxy'], ['accelerate'], ['no-engine'], ['no-hints'], ['allow-no-models'], ['watch']])(
    'given %p, should be handled has flag',
    async (flag: keyof GenerateExecutorSchema) => {
      const options: GenerateExecutorSchema = {
        [flag]: true,
      };
      const output = await executor(options, context);
      expect(
        expectCommandToHaveBeenCalled('npx prisma generate', [
          '--schema=workspace-root/apps/foo/prisma/schema.prisma',
          `--${flag}`,
        ])
      );
      expect(output.success).toBeTruthy();
    }
  );

  it('with all options', async () => {
    const options: GenerateExecutorSchema = {
      schema: 'my-schema.schema',
      'data-proxy': true,
      generator: 'sample-generator',
      watch: true,
    };
    const output = await executor(options, context);
    expect(
      expectCommandToHaveBeenCalled('npx prisma generate', [
        '--schema=my-schema.schema',
        '--generator=sample-generator',
        '--data-proxy',
        '--watch',
      ])
    );
    expect(output.success).toBeTruthy();
  });
});
