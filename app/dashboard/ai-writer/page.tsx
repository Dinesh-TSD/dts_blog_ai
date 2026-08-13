import type { Metadata } from "next";
import { AiWriterPage } from "../../components/dashboard/ai-writer-page";

export const metadata: Metadata = {
  title: "AI Writer | DTS TECH AI Dashboard",
};

export default function Page() {
  return <AiWriterPage />;
}
