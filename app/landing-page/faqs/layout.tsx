//app/faqs/layout.tsx
export default function FaqsLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col bg-color-two">
        {children}
      </div>
    );
  }
  