import type { Metadata } from "next";
import { OverviewPage } from "../components/dashboard/overview-page";

export const metadata: Metadata = {
  title: "Overview | DTS TECH AI Dashboard",
};

export default function DashboardPage() {
  return <OverviewPage />;
}
