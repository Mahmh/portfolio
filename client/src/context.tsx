import { signal } from "@preact/signals-react";

export const isBlogHost = signal(
  typeof window !== "undefined" &&
    (window.location.hostname === "blog.mahermah.com" ||
      window.location.hostname.startsWith("blog."))
);
