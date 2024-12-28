"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, subject, message });
  };

  return (
    <div className="container flex flex-grow">
      <div className="w-full rounded-lg shadow-xl bg-border">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 px-16 py-16 mx-auto text-gray-900 ">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Lets talk about everything!</h2>
              <div className="text-gray-700 mt-8">
                Hate forms? Send us an email instead{" "}
                <span className="underline">
                  <a target="_BLANK" href="https://veilmail.io/irish-irish-geoff">https://veilmail.io/irish-geoff</a>
                </span>
              </div>
            </div>
            <div className="mt-8 text-center">
              placeholder
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <Label>Full Name</Label>
              <Input
                name="fullname"
                type="text"
                placeholder=""
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input name="email" type="text" />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea name="message"></Textarea>
            </div>
            <Button variant="default" className="uppercase w-full">
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
