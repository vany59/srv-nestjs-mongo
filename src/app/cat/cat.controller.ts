import { Controller, Get } from '@nestjs/common';

@Controller('cat')
export class CatController {
  @Get()
  cats() {
    return { data: 123 };
  }
}
