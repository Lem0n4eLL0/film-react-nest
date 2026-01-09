import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private escapeValue(value: any): string {
    if (typeof value === 'string') {
      return `"${value.replace(/"/g, '\\"')}"`;
    }
    return String(value);
  }

  private formatMessage(
    level: string,
    message: any,
    context?: string,
    ...optionalParams: any[]
  ) {
    const fields: string[] = [];

    fields.push(`level=${level}`);
    fields.push(`message=${this.escapeValue(message)}`);
    if (context) fields.push(`context=${this.escapeValue(context)}`);
    if (optionalParams.length) {
      fields.push(`params=${this.escapeValue(JSON.stringify(optionalParams))}`);
    }
    fields.push(`timestamp=${new Date().toISOString()}`);

    return fields.join('\t');
  }

  log(message: any, context?: string, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, context, ...optionalParams));
  }

  error(
    message: any,
    trace?: string,
    context?: string,
    ...optionalParams: any[]
  ) {
    console.error(
      this.formatMessage('error', message, context, trace, ...optionalParams),
    );
  }

  warn(message: any, context?: string, ...optionalParams: any[]) {
    console.warn(
      this.formatMessage('warn', message, context, ...optionalParams),
    );
  }

  debug?(message: any, context?: string, ...optionalParams: any[]) {
    console.debug(
      this.formatMessage('debug', message, context, ...optionalParams),
    );
  }

  verbose?(message: any, context?: string, ...optionalParams: any[]) {
    console.info(
      this.formatMessage('verbose', message, context, ...optionalParams),
    );
  }
}
