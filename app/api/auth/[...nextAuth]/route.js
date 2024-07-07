import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import GooglerProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";

const handler = NextAuth({
    providers:[
        GooglerProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    async session({session}){
try {
    await connectToDB();

    // check if a user already exists   

    // if not, create a new user
    return true;
} catch (error) {
    console.log(error);
    return false;
}
    },
    async signin({}){

    }
})

export {handler as GET, handler as POST} 