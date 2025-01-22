// Settings Page
import React, { Suspense } from "react";
import SettingsParent from "@/components/Settings/SettingsParent";
import Loading from "@/components/ui/Loading";

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <SettingsParent />
    </Suspense>
  );
}
