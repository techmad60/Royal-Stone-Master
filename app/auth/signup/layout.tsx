import AuthHeader from "@/components/ui/AuthHeader";
import Prompt from "@/components/ui/Prompt";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-white">
      <div className="p-4 sm:p-12 lg:grid grid-cols-2 lg:p-0 gap-12">
        <div>
          <Prompt prompt="1,000+ users are making smart investment choices. Why not be one of them? 🤔"/>
        </div>
        <div className="flex flex-col">
          <AuthHeader title="Create a Royal Stone Account"/>
          {children} {/* Ensure children are rendered here */}
        </div>
      </div>
    </div>
  );
}

