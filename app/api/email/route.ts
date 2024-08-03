import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const user = 'support@innoads.ru';
const pass = 'Kazan2024!';

export async function POST(request: Request, response: Response) {
  const body = await request.json();

  const { to, subject, text } = body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.spaceweb.ru',
    port: 25,
    secure: false, // Use TLS
    auth: {
      user: user,
      pass: pass,
    },
  });

  try {
    // Send the email
    const info = await transporter.sendMail({
      from: '"InnoAds 👻" <support@innoads.ru>', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      // html: '<b>Hello world?</b>', // html body
    });
    console.log('Message sent: %s', info.messageId);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email' });
  }
}
