import Script from "next/script";

interface GoogleTagManagerProps {
  gtmId: string;
}

const isProduction = () => {
  // Only track in actual production, not staging/preview/development
  // Check in order: custom env var, VERCEL_ENV (server-side), NEXT_PUBLIC_ENV (client-side)
  const env =
    process.env.NEXT_PUBLIC_APP_ENV ||
    process.env.VERCEL_ENV ||
    process.env.NEXT_PUBLIC_ENV ||
    "";
  console.log("env", env);
  console.log(
    "isProduction",
    env === "production" && process.env.NODE_ENV !== "development"
  );
  return env === "production" && process.env.NODE_ENV !== "development";
};

export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  if (!isProduction()) {
    return null;
  }
  return (
    <>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      {/* End Google Tag Manager (noscript) */}
    </>
  );
}

export function GoogleTagManagerScript({ gtmId }: GoogleTagManagerProps) {
  if (!isProduction()) {
    return null;
  }
  return (
    <Script
      id="google-tag-manager"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `,
      }}
    />
  );
}

