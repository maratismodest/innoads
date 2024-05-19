import Script from 'next/script';
import React from 'react';

const Layout = ({ children }: any) => {
  return (
    <>
      {children}
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
    </>
  );
};

export default Layout;
