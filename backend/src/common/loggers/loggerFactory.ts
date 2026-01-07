import { LoggerService } from '@nestjs/common';
import { DevLogger } from './dev.logger';
import { assertNever } from 'utils/utils';
import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';

export type LoggerType = 'dev' | 'json' | 'tskv';

export default class LoggerFactory {
  public static createLogger(type: LoggerType): LoggerService {
    switch (type) {
      case 'dev':
        return new DevLogger();
      case 'json':
        return new JsonLogger();
      case 'tskv':
        return new TskvLogger();
      default:
        assertNever(type);
    }
  }
}
