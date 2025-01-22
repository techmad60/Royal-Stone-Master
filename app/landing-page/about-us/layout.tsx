//app/about-us/layout.tsx
export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col bg-color-two">
        {children}
      </div>
    );
  }
  