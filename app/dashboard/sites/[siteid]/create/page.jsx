"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton, UploadDropzone } from "@/utils/UploadThingComponent";
import { ArrowLeft, Atom, AtomIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { set } from "zod";

const CreatePost = ({ params }) => {
  const [imageUrl, setImageUrl] = useState(undefined);

  return (
    <>
      <div className="flex items-center">
        <Button asChild size="icon" variant="outline">
          <Link href={`/dashboard/sites/${params.siteid}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="ml-2 text-xl font-semibold">Create Post</h1>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Article Details</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam eligendi, reprehenderit illo perferendis itaque eius
              autem vel mollitia ad optio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input placeholder="Title" />
              </div>
              <div className="grid gap-2">
                <Label>Slug</Label>
                <Input placeholder="Article slug" />
                <Button className="w-fit" variant="secondary" type="button">
                  <AtomIcon className="size-4 mr-2" /> Generate Slug
                </Button>
              </div>
              <div className="grid gap-2">
                <Label>Small Description</Label>
                <Textarea placeholder="Small description" className="h-32" />
              </div>
              <div className="grid gap-2">
                <Label>Cover Image</Label>
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    width={500}
                    height={200}
                    alt="cover image"
                    className=" rounded-lg object-contain"
                  />
                ) : (
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res);
                      setImageUrl(res[0].url);
                      toast.success("Upload Completed");
                    }}
                    onUploadError={(error) => {
                      // Do something with the error.
                      setImageUrl(undefined);
                      toast.error(`ERROR! ${error.message}`);
                    }}
                  />
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CreatePost;
