import { Button, DropdownMenu, TextArea } from "@radix-ui/themes";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { api } from "~/utils/api";

export default function Issue({  }) {
  const router = useRouter();
  const idStr = router.query.id! as string;
  const id = parseInt(idStr);
  const issueData = api.issue.getIssueById.useQuery({ id });
  const issue = issueData.data ?? null;
  const responseData = api.issue.getResponses.useQuery({ id });
  const updateStatusMutation = api.issue.updateStatus.useMutation();
  const [status, setStatus] = useState(issue?.status);
  
  
  if (issue === null) {
    return (<p>couldn&apos;t find this issue</p>)
  }

  const responses = responseData.data; 
  return (
    <>
      <Head>
        <title>{issue.title}</title>
        <meta name="description" content="HEYYYULP HEYYYULP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="container flex flex-col items-left justify-center gap-2 px-4 py-16">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft" className=" bg-slate-200 w-1/6">
                Status: {status}
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onSelect={() => {
                updateStatusMutation.mutate({ id, status: 'new'});
                setStatus('new');
              }}>new</DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => {
                updateStatusMutation.mutate({ id, status: 'in progress'});
                setStatus('in progress');
              }}>in progress</DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => {
                updateStatusMutation.mutate({ id, status: 'resolved'});
                setStatus('resolved');
              }}>resolved</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <h2 className="text-3xl font-bold">{issue.title}</h2>
          <p className="">Reported: {issue.createdAt.toLocaleString()}</p>
          <p className="text-xl">{issue.description}</p>
          <div className="overflow-auto">
            {responses?.map(response => 
              <p key={response.id} className="border-2">{response.text}</p>  
            )}
          </div>
          <form onSubmit={() => { return; }}>
            <TextArea size="3" className=" max-w-2xl"/>
            <button type="submit" className="bg-blue-400 text-white p-2 rounded mt-3">Submit response</button> 
          </form>
        </div>
      </main>
    </>
  );
}
