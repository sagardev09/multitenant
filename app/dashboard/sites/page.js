import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FileIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function getData(userid) {
  const data = prisma.site.findMany({
    where: {
      userId: userid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function AllSites() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log(user);

  if (!user) {
    return redirect("/api/auth/login");
  }

  const data = await getData(user.id);
  console.log(data);

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
      {data === undefined || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed text-center animate-in p-8 fade-in-50">
          <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
            <FileIcon className="h-12 w-12 text-primary" />
          </div>

          <h2 className="mt-4 text-xl font-medium">No Sites Yet</h2>
          <p className="mt-2 text-muted-foreground">
            Create your first site to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {data.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.imageUrl ?? "/hero.png"}
                alt={item.name}
                className="rounded-t-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate py-1">{item.name}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {item.description}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${item.id}`}>
                    View Articles
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
