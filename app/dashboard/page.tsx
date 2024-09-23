import { NewVerificationForm } from "@/components/form/verify-token-form";

export default function DashboardPage() {
  return (
    <div className="pt-20 px-20">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <NewVerificationForm
        data={{
          success: true,
          code: 200,
          message: "fdsfdfsd",
        }}
      />
    </div>
  );
}
