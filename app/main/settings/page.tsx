// Settings Page
import SettingsParent from "@/components/Settings/SettingsParent";
import { Suspense } from "react";

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div>
        </div>
      }
    >
      <SettingsParent />
    </Suspense>
  );
}
