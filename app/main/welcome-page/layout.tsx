//app/login/layout.tsx
import Prompt from "@/components/ui/Prompt";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-white">
      <div className="p-4 lg:grid grid-cols-2 lg:p-0 gap-12">
        <div>
          <Prompt prompt="Welcome back! 1,000+ users are already on the path to smart investing. Ready to take the next step? 🤔"/>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-base text-color-zero mt-6 lg:text-[22px]">Welcome back to your Royal Stone account</p>
          {children} {/* Ensure children are rendered here */}
        </div>
      </div>
    </div>
  );
}

