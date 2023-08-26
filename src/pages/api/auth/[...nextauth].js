//every rout catch this file because of dynamic   
import { getByEmail, verifyPassword } from "@/services/users";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
// se use next auth liabray use to login authentication
export const authOptions = {
  // Configure one or more authentication providers
  session:{
    jwt : true//jason web token
  },
  providers: [
    CredentialsProvider({
        async authorize({email,password}) {
           const user = getByEmail(email)

           if(!user){
            throw new Error ("User not Found")
           }
           
           const isValid = await verifyPassword(user.password,password)
           if(!isValid){
            throw new Error ("Wrong Password")
           }
           return{email};//empty bracket nextAuth liabray samjh jaye gi ke OK email ke nam ka token bn jaye ga
          }
    }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)