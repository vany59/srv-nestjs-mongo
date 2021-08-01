import { Auth } from '@decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCat } from './cat.dto';

@Controller('cat')
export class CatController {
  @Get()
  cats() {
    return { data: 123 };
  }

  @Get('/error')
  catError() {
    throw 'code.500';
  }

  @Post('/create')
  createCat(@Body() body: CreateCat) {
    return {
      data: '12121212sz',
    };
  }

  @Get('/auth')
  @Auth()
  authCat() {
    return {
      data: 'auth',
    };
  }
}
