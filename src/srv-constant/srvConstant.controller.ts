import { Controller, Get } from '@nestjs/common';

@Controller('const')
export class ConstController {
  @Get()
  cst() {
    return { data: 123 };
  }
}
