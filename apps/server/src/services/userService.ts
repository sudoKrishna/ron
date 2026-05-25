import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@repo/db";

const JWT_SECRET = " this";

export const createUser = async(username  : string, password : string) => {
    const existingUser = await prisma.user.findUnique({
        where : {username}
    });
    if(existingUser) {
        return new Error("user already exists backcodimatker lude")
    }
    const hashPassword = await bcrypt.hash(password , 10);

    const user = await prisma.user.create({
        data : {
            username, 
            password :  hashPassword,

            collateral :  {
                create : {
                    available : 0,
                    locked : 0
                },
            },
        },
        include : {
            collateral : true,
        }
    })
    return {message : "singup is succesfull", userId: user.userId}
}

export const loginUser = async(username : string, password : string) => {
    const user = await prisma.user.findUnique({
        where : {username},
    })

    if(!user) {
        throw new Error ("user not found")
    }

    const isMatch = await bcrypt.compare(password , user.password);

    if(!isMatch) {
        throw new Error("incalid password")
    }

    const token = jwt.sign(
        {userId : user.userId, password : user.password},
        JWT_SECRET,
        {expiresIn : "1h"}
    );
    return {
        message : "login hogaya",
        token
    }
}