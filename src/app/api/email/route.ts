import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, type, code } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    let subject = "";
    let html = "";

    switch (type) {
      case "verification":
        subject = "Verify your email address";
        html = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333; text-align: center;">Verify Your Email</h1>
            <p style="color: #666; font-size: 16px; line-height: 1.5;">
              Thank you for signing up with ${process.env.NEXT_PUBLIC_APP_NAME}! To complete your registration, please use the following verification code:
            </p>
            <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
              <h2 style="color: #333; font-size: 32px; letter-spacing: 5px; margin: 0;">${code}</h2>
            </div>
            <p style="color: #666; font-size: 14px; text-align: center;">
              This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
            </p>
          </div>
        `;
        break;

      default:
        return NextResponse.json(
          { error: "Invalid email type" },
          { status: 400 }
        );
    }
    const data = await resend.emails.send({
      from: `${process.env.NEXT_PUBLIC_APP_NAME} <noreply@${process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, "") || ""}>`,
      to: email,
      subject,
      html,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
