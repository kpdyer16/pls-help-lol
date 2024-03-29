import Head from "next/head";
import Link from "next/link";

export default function Home() {

  return (
    <>
      <Head>
        <title>Pls Help Me</title>
        <meta name="description" content="HEYYYULP HEYYYULP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Pls <span className="text-[hsl(280,100%,70%)]">Help</span> Me 😭
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-black/20"
              href="/issues/new?user=enduser"
            >
              <h3 className="text-2xl font-bold">I&apos;m an end user →</h3>
              <div className="text-lg">
                Report a new issue or find an existing issue
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-black/20"
              href="/issues?user=admin"
            >
              <h3 className="text-2xl font-bold">I&apos;m an admin →</h3>
              <div className="text-lg">
                Respond to existing issues or update the status of the ticket
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
