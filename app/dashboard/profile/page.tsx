import type { Metadata } from "next";
import { ProfilePage } from "../../components/dashboard/profile-page";

export const metadata: Metadata = {
  title: "Profile | DTS TECH AI Dashboard",
};

export default function Page() {
  return <ProfilePage />;
}
