import { Controller, Get } from '@nestjs/common';

@Controller('province')
export class ProvinceController {
  @Get()
  province() {
    return { data: 'province' };
  }
}
