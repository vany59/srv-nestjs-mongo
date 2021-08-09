import { Auth } from '@decorator';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class CatController {
  @Get()
  @Auth()
  async catAuth() {
    return 'ok';
  }
}
