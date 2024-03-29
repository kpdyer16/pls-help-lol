import { TextArea, TextField } from "@radix-ui/themes";
import { type FormEvent } from "react";
import Head from "next/head";
import Link from "next/link";


import { api } from "~/utils/api";

export default function NewIssuePage() {
  const createIssueMutation = api.issue.create.useMutation();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const email = formData.get('email') as string;
    const description = formData.get('description') as string;

    createIssueMutation.mutate(
      {title, email, description},
      { 
        onError: (data, variables, context) => {
          console.log(data);
          console.log("Something went wrong. It's a shame something went wrong even when reporting an issue");
        },
        onSuccess: (data, variables, context) => {
          console.log(`Would normally send email here with body:\nYour submission has been received`);
        } 
      }
    );
  }

  return (
    <>
      <Head>
        <title>Pls Help Me</title>
        <meta name="description" content="HEYYULP HEYYULP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-white">
        <form 
          className="container flex flex-col justify-center gap-2 px-4 py-16 w-2/5"
          onSubmit={handleSubmit}
          >
          <h1 className="mb-3 text-2xl">New issue</h1>
          <label className="w-1 h-1 -m-1 p-0 overflow-hidden">Title</label>
          <TextField.Input type="text" placeholder="Title" name="title" className="text-lg border-2 rounded-sm p-2 flex-grow-1"/>
          <label className="w-1 h-1 -m-1 p-0 overflow-hidden">Email</label>
          <TextField.Input type="email" placeholder="Email" name="email" className="text-lg border-2 rounded-sm p-2 flex-grow-1"/>
          <label className="w-1 h-1 -m-1 p-0 overflow-hidden">Description</label>
          <TextArea placeholder="Describe your issue.." size="3" name="description" className="h-40"/>
          <button type="submit" className="w-min px-4 py-2 text-md rounded text-white bg-blue-600">Submit</button>
        </form>
      </main>
    </>
  );
}
