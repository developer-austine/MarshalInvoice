import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";


export async function POST(
    request: Request,
    {
    params,
    }: {
        params: Promise<{invoiceId: string}>
    }) {
    
        try {
            const session = await requireUser();

            const { invoiceId } = await params;
        
            const invoiceData = await prisma.invoice.findUnique({
                where: {
                    id: invoiceId,
                    userId: session.user?.id,
                },
            });
        
            if(!invoiceData) {
                return NextResponse.json({error: 'Invoice not found'}, {status: 404})
            }
        
            const sender = {
                email: "hello@demomailtrap.com",
                name: "Austine Alex",
              };
        
               emailClient.send({
                  from: sender,
                  to: [{ email: "austinealex369@gmail.com" }],
                  template_uuid: "96d97991-b7c2-47fe-8bc9-28b1fa438a04",
                  template_variables: {
                    "first_name": invoiceData.clientName,
                    "company_info_name": "Analytixs",
                    "company_info_address": "Ngumba Estate",
                    "company_info_city": "Nairobi",
                    "company_info_zip_code": "12345",
                    "company_info_country": "Kenya"
                  }
                });
        
                return NextResponse.json({success: true})
        } catch (error) {
            return NextResponse.json({error: 'Failed to send email remindeer'}, {status: 500})
        }
}