import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import {resData} from '../../utils'
import { Auth, UserId } from '../auth/auth.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ){}

  @Post('login')
  login(@Body() body: any, @Res() res: Response){
    this.userService.login(body)
    .then(data => resData({res, data}))
    .catch(()=> {
      res.status(403).send({
        "statusCode": 403,
        "message": "Forbidden resource",
        "error": "Forbidden"
      })
    })
  }

  @Post('create')
  createUser(@Body() body: any, @Res() res: Response){
    this.userService.create(body).then((data)=>{
      resData({res,data})
    }).catch(e => resData({res, error: e.message}))
  }

  @Get('me')
  @Auth()
  async me(@UserId() userId: string, @Res() res: Response){
    this.userService.me(userId)
    .then(user => resData({res, data: user}))
    .catch(e => resData({res, error: e.message}))
  }
}
