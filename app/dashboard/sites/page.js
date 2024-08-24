import { Button } from "@/components/ui/button";
import { FileIcon, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <div className="flex w-full justify-end">
        <Button asChild>
          <Link href={"/dashboard/sites/new"}>
            <PlusCircle className="mr-2 size-4" />
            Create Site
          </Link>
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center rounded-md border border-dashed text-center animate-in p-8 fade-in-50">
        <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
          <FileIcon className="h-12 w-12 text-primary" />
        </div>

        <h2 className="mt-4 text-xl font-medium">No Sites Yet</h2>
        <p className="mt-2 text-muted-foreground">
          Create your first site to get started.
        </p>
      </div>
    </>
  );
};

export default Page;
