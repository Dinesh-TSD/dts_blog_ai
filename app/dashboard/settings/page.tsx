import type { Metadata } from "next";
import { SettingsPage } from "../../components/dashboard/settings-page";

export const metadata: Metadata = {
  title: "Settings | DTS TECH AI Dashboard",
};

export default function Page() {
  return <SettingsPage />;
}
