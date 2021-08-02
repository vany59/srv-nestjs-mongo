import { Auth } from '@decorator';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CatEntity, CreateCat } from './cat.dto';
import { catService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: catService) {}

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

  @Post('/createdb')
  createDb(@Body() body: CreateCat) {
    this.catService.createCat(body.name);
  }
}
