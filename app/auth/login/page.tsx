//app/login/page.tsx
import Link from "next/link";
import CardComponentFour from "@/components/ui/CardComponentFour";

export default function Login() {
  return (
    <section className="flex flex-col space-y-6 mt-4 lg:pr-8">
      <section className="flex flex-col space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {/* Login with Email */}
          <CardComponentFour
            icon="/images/mail-icon.svg"
            textStart="Sign in with"
            textEnd="Email"
            href="/auth/login/with-mail"
            className="lg:h-[83px]"
          />

          {/* Login with Google */}
          <CardComponentFour
            icon="/images/google-icon.svg"
            textStart="Sign in with"
            textEnd="Google"
            className="lg:h-[83px]"
          />

          {/* Login with Apple (full width across both columns) */}
          <CardComponentFour
            icon="/images/apple-icon.svg"
            textStart="Sign in with"
            textEnd="Apple"
            className="col-span-2 justify-between h-[83px]"
          />
        </div>
      </section>
      <p className="text-slate-400 lg:border-t lg:pt-4">
        Don&apos;t have an account? <span className="font-semibold text-color-one duration-300 hover:text-green-700">
          <Link href="/auth/signup">Sign up</Link>
        </span>
      </p>
    </section>
  );
}
