import "../styles/globals.css";
import { Provider } from "next-auth/client";

export default function App({ Component, pageProps }) {
  return (
    <Provider
      session={pageProps.session}
      options={{
        clientMaxAge: 60,
        keepAlive: 5 * 60,
      }}
    >
      <Component {...pageProps} />
    </Provider>
  );
}
