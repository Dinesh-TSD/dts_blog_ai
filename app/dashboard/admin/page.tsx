import type { Metadata } from "next";
import { AdminPage } from "../../components/dashboard/admin-page";

export const metadata: Metadata = {
  title: "Admin | DTS TECH AI Dashboard",
};

export default function Page() {
  return <AdminPage />;
}
