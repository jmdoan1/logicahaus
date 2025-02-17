"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Copy, CopyCheck, CopyX } from "lucide-react";
import { Input } from "@/app/_components/ui/input";
import { copyToClipboard } from "./util";

export default function PasswordGenerator({ cute }: { cute?: boolean }) {
  const [password, setPassword] = useState("");
  const [copyStatus, setCopyStatus] = useState<"success" | "fail" | "none">(
    "none"
  );

  useEffect(() => {
    if (copyStatus !== "none") {
      const timer = setTimeout(() => setCopyStatus("none"), 3000);
      return () => clearTimeout(timer);
    }
  }, [copyStatus]);

  const generatePasswordMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/easy-pass");
      if (!res.ok) throw new Error("Failed to fetch password");
      const data = await res.json();
      return data.phrase as string;
    },
    onSuccess: (phrase) => {
      setPassword(phrase);
    },
  });

  function handleGenerate() {
    generatePasswordMutation.mutate();
  }

  async function handleCopy() {
    const success = await copyToClipboard(password);
    setCopyStatus(success ? "success" : "fail");
  }

  return (
    <section id="easy-password-generator">
      {cute ? (
        <Card className="w-full mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">
              🔐 Cute Password Generator 🐱
            </CardTitle>
            <CardDescription>
              Generate strong and adorable passwords! 🌈✨
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 text-center font-mono text-lg"
                placeholder="Your cute password will appear here!"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className={`absolute right-0 top-0 h-full ${
                  copyStatus === "success"
                    ? "text-green-500 hover:text-green-600"
                    : copyStatus === "fail"
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-500 hover:text-gray-600"
                }`}
              >
                {copyStatus === "success" ? (
                  <CopyCheck className="h-4 w-4" />
                ) : copyStatus === "fail" ? (
                  <CopyX className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105"
            >
              🎨 Generate Cute Password 🦄
            </Button>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            Your passwords are as unique as you are! 🌟
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Easy Password Generator
            </CardTitle>
            <CardDescription>
              Generate strong passwords that are easy to remember!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 text-center font-mono text-lg"
                placeholder="Your password will appear here"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className={`absolute right-0 top-0 h-full ${
                  copyStatus === "success"
                    ? "text-green-500 hover:text-green-600"
                    : copyStatus === "fail"
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-500 hover:text-gray-600"
                }`}
              >
                {copyStatus === "success" ? (
                  <CopyCheck className="h-4 w-4" />
                ) : copyStatus === "fail" ? (
                  <CopyX className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              onClick={handleGenerate}
              className="w-full text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105"
            >
              Generate Password
            </Button>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            Stay safe out there 🔐
          </CardFooter>
        </Card>
      )}
    </section>
  );
}
