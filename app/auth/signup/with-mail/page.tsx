import SignupWithMail from "@/components/Registration/Signup/SignupWithMail";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div><Loading/></div>}>
      <SignupWithMail />
    </Suspense>
  );
}
