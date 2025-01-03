import { DetailedHTMLProps, AnchorHTMLAttributes } from "react";

export default function NewTabLink(
  props: Omit<
    DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    "target" | "rel"
  >
) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}
