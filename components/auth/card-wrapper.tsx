import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardWrapperProps {
  headerTitle: string;
  headerDescription?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  onBackButtonClick?: () => void;
  heroImage?: string;
  children: ReactNode;
}

export const CardWrapper = ({
  headerTitle,
  headerDescription,
  backButtonLabel,
  backButtonHref,
  onBackButtonClick,
  children,
}: CardWrapperProps) => {
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">{headerTitle}</h2>
        {headerDescription && (
          <p className="text-sm text-gray-600 mt-2">{headerDescription}</p>
        )}
      </div>

      {children}

      {backButtonLabel && (
        <div className="mt-4 text-center">
          {onBackButtonClick ? (
            <Button
              size="sm"
              variant="link"
              className="p-0 text-xs text-blue-500 w-full justify-center"
              onClick={onBackButtonClick}
              type="button"
            >
              {backButtonLabel}
            </Button>
          ) : (
            <Link href={backButtonHref || "#"}>
              <Button
                size="sm"
                variant="link"
                className="p-0 text-xs text-blue-500 w-full justify-center"
                type="button"
              >
                {backButtonLabel}
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
