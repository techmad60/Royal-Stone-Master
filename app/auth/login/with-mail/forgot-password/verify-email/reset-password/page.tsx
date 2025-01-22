import React, { Suspense } from "react";
import Loading from "@/components/ui/Loading";
import ResetPassword from "@/components/Registration/Login/ResetPassword";

export default function Page() {
  return (
    <Suspense fallback={<div><Loading/></div>}>
      <ResetPassword />
    </Suspense>
  );
}
