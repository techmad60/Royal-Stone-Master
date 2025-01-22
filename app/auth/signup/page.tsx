//app/signup/page.tsx
import Link from "next/link";
import CardComponentFour from "@/components/ui/CardComponentFour";

export default function SignUp() {
    return (
        <section className="flex flex-col space-y-6 mt-4 sm:space-y-8 lg:pr-8 lg:space-y-6">
            <section className="flex flex-col space-y-4">
                <div className="grid grid-cols-2 gap-2 sm:gap-6 sm:mt-4 lg:mt-0 lg:gap-2">
                    {/* Signup with Email */}
                    <CardComponentFour icon="/images/mail-icon.svg" textStart="Continue" textEnd="Email" href="/auth/signup/with-mail" className="lg:h-[83px]" />

                    {/* Signup with Google */}
                    <CardComponentFour icon="/images/google-icon.svg" textStart="Continue" textEnd="Google" className="lg:h-[83px]" />

                    {/* Signup with Apple (full width across both columns) */}
                    <CardComponentFour icon="/images/apple-icon.svg" textStart="Continue" textEnd="Apple" className="col-span-2 justify-between h-[83px]" />
                </div>
            </section>
            <p className="text-slate-400 lg:border-t lg:pt-4">
                Already have an account?{" "}
                <span className="font-semibold text-color-one duration-300 hover:text-green-700">
                    <Link href="/auth/login">Sign in</Link>
                </span>
            </p>
        </section>
    );
}
