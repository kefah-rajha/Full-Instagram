import { NextResponse, NextRequest} from 'next/server'


import { verify  } from 'jsonwebtoken'
const secretToken=process.env.REFRESH_TOKEN_SECRET;
export default async function middleware(NextRequest){
    const {cookies}=NextRequest;
    const jwt =cookies.refreash_token;
    const url =NextRequest.url;
    if(url.includes("/otherPages")){
        if(jwt === "undefined"){
            return NextResponse.redirect(new URL('/regester', NextRequest.url))
        }
            try{
                verify(jwt,secretToken)
                return NextResponse.NextResponse.rewrite(new URL('/otherPages', NextRequest.url))

            }catch(error){
                return NextResponse.redirect(new URL('/regester', NextRequest.url))

            }
        }
      

    
    
    return NextResponse.next();

}