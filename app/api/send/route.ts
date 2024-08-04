import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { EmailTemplate } from '@/components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

const email = 'maratismodest@gmail.com';

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'InnoAds <onboarding@resend.dev>',
      to: [email],
      subject: 'Hello InnoAds',
      react: EmailTemplate({ firstName: 'InnoAds' }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: `Something went wrong: ${error}` }, { status: 500 });
  }
}
