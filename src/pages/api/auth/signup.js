// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getAll, save } from "@/services/users"

export default function handler(req, res) {//this line is ever applocation
  if(req.method !== 'POST'){//restrict only function on Post request
    res.status(404).send()//if request not in pOST so respone 404(error) 
  }
  const {email,password} = req.body//email and password got from body 
  try{
    save(email,password)//this function call from services
    res.status(201).send()//when accept any thing so the code no is 201
}catch(err){
 
  res.status(400).json({message : err})//if any error occur so  
}
  }
  
