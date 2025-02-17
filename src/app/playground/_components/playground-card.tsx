import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Code, Expand, Shrink } from "lucide-react";

interface Props {
  children: ReactNode;
  footerText: string;
  codeUrl?: string;
  navUrl?: string;
  inline?: boolean;
  titleClass?: string;
  title: string;
  description: string;
}
export default function PlayGroundCard({
  children,
  footerText,
  codeUrl,
  navUrl,
  inline,
  titleClass,
  title,
  description,
}: Props) {
  return (
    <Card className="w-full mx-auto relative">
      {codeUrl ? (
        <a
          href={codeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <Code className="h-5 w-5" />
        </a>
      ) : null}
      <CardHeader className="text-center">
        <CardTitle className={`text-2xl font-bold ${titleClass}`}>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="text-center text-sm text-muted-foreground">
        {footerText}
      </CardFooter>
      {navUrl ? (
        <a
          href={navUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 text-gray-500 hover:text-gray-700"
        >
          {inline ? (
            <Expand className="h-5 w-5" />
          ) : (
            <Shrink className="h-5 w-5" />
          )}
        </a>
      ) : null}
    </Card>
  );
}
