import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';


import { api } from "~/utils/api";

import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Theme>
      <main className={`font-sans ${inter.variable}`}>
        <Component {...pageProps} />
      </main>
    </Theme>
  );
};

export default api.withTRPC(MyApp);
