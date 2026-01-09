import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleDebugSpy: jest.SpyInstance;
  let consoleInfoSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new JsonLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation();
    consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const validateLogStructure = (
    consoleSpy: jest.SpyInstance,
    level: string,
    message: any,
    context?: string,
    ...params: any[]
  ) => {
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    const logCallArg = consoleSpy.mock.calls[0][0];

    let parsed: any;
    try {
      parsed = JSON.parse(logCallArg);
    } catch (e) {
      throw new Error(`Invalid JSON: ${logCallArg}`);
    }

    expect(parsed).toHaveProperty('timestamp');
    expect(new Date(parsed.timestamp).toString()).not.toBe('Invalid Date');
    expect(parsed).toHaveProperty('level', level);
    expect(parsed).toHaveProperty('message', message);
    expect(parsed).toHaveProperty('context', context || undefined);
    expect(parsed).toHaveProperty('params');
    expect(parsed.params).toEqual(params);
  };

  it('should log with correct JSON structure', () => {
    const message = 'test';
    const context = 'test context';
    const params = ['test', 42, { key: 'test' }];

    logger.log(message, context, ...params);
    validateLogStructure(consoleLogSpy, 'log', message, context, ...params);
  });

  it('should log error with correct JSON structure', () => {
    const message = 'test';
    const trace = 'test trace';
    const context = 'test context';
    const params = ['extra'];

    logger.error(message, trace, context, ...params);
    validateLogStructure(
      consoleErrorSpy,
      'error',
      message,
      context,
      trace,
      ...params,
    );
  });

  it('should log warning with correct JSON structure', () => {
    const message = 'test';
    const context = 'test context';

    logger.warn(message, context);
    validateLogStructure(consoleWarnSpy, 'warn', message, context);
  });

  it('should log debug with correct JSON structure', () => {
    const message = 'test';
    const context = 'test context';
    const params = [1, 2, 3];

    logger.debug?.(message, context, ...params);
    validateLogStructure(consoleDebugSpy, 'debug', message, context, ...params);
  });

  it('should log verbose with correct JSON structure', () => {
    const message = 'test';
    const context = 'test context';

    logger.verbose?.(message, context);
    validateLogStructure(consoleInfoSpy, 'verbose', message, context);
  });

  it('should handle undefined context', () => {
    logger.log('test');
    const logCallArg = consoleLogSpy.mock.calls[0][0];
    const parsed = JSON.parse(logCallArg);
    expect(parsed.context).toBeUndefined();
  });

  it('should handle non-string messages', () => {
    const objMessage = { event: 'user-login', userId: 123 };
    logger.log(objMessage, 'Auth');

    const parsed = JSON.parse(consoleLogSpy.mock.calls[0][0]);
    expect(parsed.message).toEqual(objMessage);
  });

  it('should log empty params as empty array', () => {
    logger.log('test', 'test context');
    const parsed = JSON.parse(consoleLogSpy.mock.calls[0][0]);
    expect(parsed.params).toEqual([]);
  });
});
