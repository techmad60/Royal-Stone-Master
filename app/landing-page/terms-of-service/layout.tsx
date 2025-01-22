//app/terms-of-service/layout.tsx
export default function TermsOfServiceLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col bg-color-two">
        {children}
      </div>
    );
  }
  