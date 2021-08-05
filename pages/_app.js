import "../styles/globals.css";
import { Provider } from "next-auth/client";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const name = "TolongCariKerja";
  const description = "TolongCariKerja is an initiative to help Malaysians find jobs easily while supporting the #KitaJagaKita movement in Malaysia through AI speech services.";
  const url = "https://tolong-cari-kerja.vercel.app/";
  const image = "/images/meta-image.png";

  return (
    <Provider
      session={pageProps.session}
      options={{
        clientMaxAge: 60,
        keepAlive: 5 * 60,
      }}
    >
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta name="title" content={name} />
        <meta name="description" content={description} />
        <link rel="icon" type="image/png" href="images/favicon.png" />
        <meta name="theme-color" content="#1F2937" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={name} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
