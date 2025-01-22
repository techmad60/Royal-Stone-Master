import VerifyMail from "@/components/Registration/Login/SignInVerifyEmail";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";


export default function Page() {
  return (
    <Suspense fallback={<div><Loading/></div>}>
      <VerifyMail />
    </Suspense>
  );
}
