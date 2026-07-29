import * as React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  badge,
  children,
}: PageHeaderProps): React.JSX.Element {
  return (
    <div className="bg-muted/40 border-b border-border py-8 md:py-12 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          {badge && (
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-saffron-500/10 text-saffron-600 dark:bg-saffron-500/20 dark:text-saffron-400">
              {badge}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {children && <div className="shrink-0">{children}</div>}
      </div>
    </div>
  );
}
