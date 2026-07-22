import { notFound } from "next/navigation";
import CuelumePlayground from "@/components/playground/cuelume-playground";

export default function CuelumePlaygroundPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return <CuelumePlayground />;
}
