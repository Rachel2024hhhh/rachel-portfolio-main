// app/head.tsx
import Script from "next/script";

export default function Head() {
  return (
    <>
      <title>Rachel Gonzalez</title>
      <meta name="description" content="Your website description" />

      {/* Google Analytics */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-BLN3Q4BNTD" />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BLN3Q4BNTD');
          `,
        }}
      />
    </>
  );
}