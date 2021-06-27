import { Response } from "express";

export const resData = ({res, data=null, error=null, more={}})=>{
  if(error){
    res.status(200).send({
      code: 400,
      message: error
    })
  }else{
    res.status(200).send({
      code: 200,
      message: 'success',
      data,
      ...more
    })
  }
}