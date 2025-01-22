import React, {Suspense} from "react";
import Dashboard from "@/components/AuthDashboard/Dashboard";
import Loading from "@/components/ui/Loading";

export default function AuthDashboard() {
  return (
    <Suspense fallback={<div><Loading/></div>}>
      <Dashboard />
    </Suspense>
  )

}
