import * as React from "react";
import { cn } from "@/lib/utils";

interface FormContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FormContainer = React.forwardRef<HTMLDivElement, FormContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "story-container p-6 md:p-8 animate-in fade-in duration-500",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FormContainer.displayName = "FormContainer";

export { FormContainer };
