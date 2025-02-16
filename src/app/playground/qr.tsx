"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Copy, Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { toast } from "@/app/_hooks/use-toast";

export default function QRCodeGenerator() {
  const [inputText, setInputText] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState("");

  const generateQRCode = (text: string) => {
    if (text > "") {
      QRCode.toDataURL(text, { width: 300, margin: 2 }, (err, url) => {
        if (err) {
          console.error(err);
          return;
        }
        setQrCodeImage(url);
      });
    } else setQrCodeImage("");
  };

  useEffect(() => generateQRCode(inputText), [inputText]);

  const copyImage = async () => {
    try {
      const response = await fetch(qrCodeImage);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      toast({
        title: "Image copied",
        description: "The QR code image has been copied to your clipboard.",
      });
    } catch (err) {
      console.error("Failed to copy image: ", err);
      toast({
        title: "Copy failed",
        description: "Failed to copy the QR code image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const saveImage = () => {
    const link = document.createElement("a");
    link.href = qrCodeImage;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Image saved",
      description: "The QR code image has been doanloaded to your device",
    });
  };

  return (
    <section id="qr-code-generator">
      <Card className="w-full mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            QR Code Generator
          </CardTitle>
          <CardDescription>
            Generate QR codes for any text or URL
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text or URL to generate QR code"
            className="w-full"
          />
          {qrCodeImage && (
            <div className="flex flex-col items-center gap-4">
              {/* <div className="bg-white p-1 rounded-lg shadow-md"> */}
              <img
                src={qrCodeImage}
                alt="Generated QR Code"
                className="rounded-lg shadow-md"
              />
              {/* </div> */}
              <div className="flex gap-2">
                <Button onClick={copyImage} variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={saveImage} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          Scan and share with ease! 📲
        </CardFooter>
      </Card>
    </section>
  );
}
