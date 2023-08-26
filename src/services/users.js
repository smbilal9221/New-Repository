import fs from 'fs'
import path from 'path'
import {compare, hash} from 'bcryptjs'
const filePath = path.join(process.cwd(),"src","database","users.json")
import React, { useState } from 'react';


export function getAll(){
    const data =fs.readFileSync(filePath)
    return JSON.parse(data);
}

export function getById(id){
    const data = getAll()
    return data.find(user => user.id === Number(id))
}

export function getByEmail(email){//email exists finding function  
    const data = getAll()
    return data.find(user => user.email.toLowerCase() === email.toLowerCase() )
}

export async function verifyPassword(hashedpassword,password){
    const isValid = await compare(password,hashedpassword)
    return isValid
}

export async function save (email, password){
    const found = getByEmail(email)//only check user is exist? answer is undefine or email of user 
    if(found){
        
        throw new Error( "User already exist")
    }

    const data =  getAll()

    const hashedpassword = await hash(password,12)//chnage p.w into hash(p.w)
    console.log(data)
    data.push({
        id : data.length +1,
        email,password : hashedpassword
    });
    fs.writeFileSync(filePath, JSON.stringify(data))
}