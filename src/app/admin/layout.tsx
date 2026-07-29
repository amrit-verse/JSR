import * as React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps): React.JSX.Element {
  return <>{children}</>;
}
