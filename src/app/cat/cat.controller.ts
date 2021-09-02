import { Auth } from '@decorator';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class CatController {
  @Get()
  @Auth([{ mission: '123', privilege: '1312' }])
  async catAuth() {
    return 'ok';
  }
}
