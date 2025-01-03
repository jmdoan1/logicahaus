import { DetailedHTMLProps, HTMLAttributes } from "react";

export default function List({
  className,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) {
  return <ul className={"list-disc list-inside " + className} {...rest} />;
}

export function NestedList({
  className,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) {
  return <ul className={"list-disc ml-10 " + className} {...rest} />;
}
