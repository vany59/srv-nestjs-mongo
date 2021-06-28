import { Auth } from '@decorator';
import { Controller, Get } from '@nestjs/common';

@Controller('cat')
export class CatController {
  @Get()
  @Auth()
  cats() {
    return { data: 123 };
  }
}
