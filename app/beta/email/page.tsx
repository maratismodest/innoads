'use client';
import React from 'react';

import buttonStyles from '@/styles/buttonStyles';
import { sendClientEmail } from '@/utils/api/client/sendClientEmail';

const EmailPage = () => {
  return (
    <div>
      <h1>Email sender</h1>
      <button className={buttonStyles()} onClick={sendClientEmail}>
        Send
      </button>
    </div>
  );
};

export default EmailPage;
