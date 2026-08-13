import type { Metadata } from "next";
import { DraftsPage } from "../../components/dashboard/drafts-page";

export const metadata: Metadata = {
  title: "Drafts | DTS TECH AI Dashboard",
};

export default function Page() {
  return <DraftsPage />;
}
