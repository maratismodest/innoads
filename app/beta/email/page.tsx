'use client';
import React from 'react';

import buttonStyles from '@/styles/buttonStyles';
import { clientPrisma } from '@/utils/api/createRequest';

async function sendEmail(to: string, subject: string, text: string) {
  try {
    const { data } = await clientPrisma.post('/email', { to, subject, text });
    if (data.ok) {
      console.log('Email sent successfully');
    } else {
      console.error('Failed to send email');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const Page = () => {
  if (process.env.NODE_ENV === 'production') {
    return <div>This page is not available in production.</div>;
  }
  return (
    <div>
      <h1>Send Email</h1>
      <button
        className={buttonStyles()}
        onClick={() => sendEmail('maratismodest@gmail.com', 'Test Subject', 'This is a test email')}
      >
        Send
      </button>
    </div>
  );
};

export default Page;
