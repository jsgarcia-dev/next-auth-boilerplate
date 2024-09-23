import { CardWrapper } from "@/components/auth/card-wrapper";
import type { Response } from "@/types";
import { redirect } from "next/navigation";

type NewVerificationFormProps = {
  data: Response;
};

export const NewVerificationForm = ({ data }: NewVerificationFormProps) => {
  if (!data.success) {
    return redirect("/login");
  }

  return (
    <CardWrapper
      headerTitle="Email Address Verified!"
      headerDescription="Congratulations! You have successfully verified your email address. You can now use your account to login to the website."
      backButtonLabel="Back to login"
      backButtonHref="/login"
      heroImage="/assets/email-verified.svg"
    >
      <div className="text-center">
        <p className="text-sm text-gray-600 mt-4">
          Your account is now fully activated and ready to use.
        </p>
      </div>
    </CardWrapper>
  );
};
