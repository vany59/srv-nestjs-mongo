import { Logger } from '@nestjs/common';

export class MyLogger extends Logger {
  log(message: string, trace: string) {
    if (trace === 'RoutesResolver' || trace === 'RouterExplorer' || trace === 'InstanceLoader'   ) return;
    super.log(message, trace);
  }

  error(message: string, trace: string) {
    super.error(message, trace);
  }

  warn(message: string, trace: string) {
    super.warn(message, trace);
  }

  debug(message: string, trace: string) {
    super.debug(message, trace);
  }

  verbose(message: string, trace: string) {
    super.verbose(message, trace);
  }
}
