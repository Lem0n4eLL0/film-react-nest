import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const validateTskvLog = (
    consoleSpy: jest.SpyInstance,
    expectedLevel: string,
    message: any,
    context?: string,
    ...params: any[]
  ) => {
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    const logLine = consoleSpy.mock.calls[0][0];

    expect(logLine).toMatch(/\t/);

    const fields = logLine.split('\t');
    const record: Record<string, string> = {};

    for (const field of fields) {
      const [key, value] = field.split('=', 2);
      if (key && value !== undefined) {
        record[key] = value;
      }
    }

    expect(record).toHaveProperty('level', expectedLevel);
    expect(record).toHaveProperty('timestamp');
    expect(new Date(record.timestamp).toString()).not.toBe('Invalid Date');

    let expectedMessageStr: string;
    if (typeof message === 'string') {
      expectedMessageStr = `"${message.replace(/"/g, '\\"')}"`;
    } else {
      expectedMessageStr = String(message);
    }
    expect(record.message).toBe(expectedMessageStr);

    if (context !== undefined) {
      const expectedContext = `"${context.replace(/"/g, '\\"')}"`;
      expect(record).toHaveProperty('context', expectedContext);
    } else {
      expect(record).not.toHaveProperty('context');
    }

    if (params.length > 0) {
      const expectedParams = `"${JSON.stringify(params).replace(/"/g, '\\"')}"`;
      expect(record).toHaveProperty('params', expectedParams);
    } else {
      expect(record).not.toHaveProperty('params');
    }
  };

  it('should log warning without context or params', () => {
    logger.warn('test');
    validateTskvLog(consoleWarnSpy, 'warn', 'test');
  });

  it('should escape double quotes in strings', () => {
    const message = 'test message';
    logger.log(message, 'test');

    const logLine = consoleLogSpy.mock.calls[0][0];
    expect(logLine).toContain('message="test message"');
    expect(logLine).toContain('context="test"');
  });

  it('should not include context if undefined', () => {
    logger.log('test');
    const logLine = consoleLogSpy.mock.calls[0][0];
    expect(logLine).not.toContain('context=');
  });

  it('should not include params if empty', () => {
    logger.log('test', 'ctx');
    const logLine = consoleLogSpy.mock.calls[0][0];
    expect(logLine).not.toContain('params=');
  });

  it('should handle non-string message', () => {
    logger.log(42, 'test');
    const logLine = consoleLogSpy.mock.calls[0][0];
    expect(logLine).toContain('message=42');
    expect(logLine).toContain('context="test"');

    logger.log({ a: 1 });
    const objLine = consoleLogSpy.mock.calls[1][0];
    expect(objLine).toContain('message=[object Object]');
  });
});
