import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export async function POST(request: NextRequest) {
    const { orderId, sessionId } = await request.json();
    try{

        const response = await fetch(`${process.env.OTTU_BASE_URL}b/checkout/v1/pymt-txn/${sessionId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Api-key ${process.env.OTTU_API_KEY}`
            }
        });
        const data = await response.json();
        
        if(data.state==="paid"){
            return NextResponse.json({state:data.state},{status:200});
        }
        else{
            return NextResponse.json({state:data.state,session_id:data.session_id},{status:300});
        }
    }catch(error){
        console.log(error);
        return NextResponse.json({error:"Failed to verify payment"},{status:500});
    }
}