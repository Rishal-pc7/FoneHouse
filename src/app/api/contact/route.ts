import { Resend } from "resend";
import { z } from "zod";

const formSchema = z.object({
  fullname: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8).max(15).regex(/^[0-9()+-\s]+$/),
  message: z.string().min(5),
});

export async function POST(req: Request):Promise<Response> {
  try {
    const data = await req.json();

    const result = formSchema.safeParse(data);
    if (!result.success) {
      return new Response(
        JSON.stringify({ error: "Invalid payload", details: result.error.flatten().fieldErrors }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Server misconfiguration: missing RESEND_API_KEY" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Acme<onboarding@resend.dev>",
      to: "rishal01010@gmail.com",
      subject: "Enquiry from "+result.data.fullname,
      html: `<p><strong>From:</strong> ${result.data.fullname}</p> 
             <p><strong>Email:</strong>${result.data.email}</p>
             <p><strong>Phone:</strong> ${result.data.phone}</p>
             <hr/>
             <p>${result.data.message}</p>`,
      replyTo: result.data.email       
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }catch (err) {
  const errorMessage = typeof err === 'object' && err !== null && 'message' in err
    ? (err as { message: string }).message
    : "Unknown error";
  return new Response(JSON.stringify({ error: errorMessage }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}
}
