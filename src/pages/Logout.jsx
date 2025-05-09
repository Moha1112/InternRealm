import { LogoutForm } from "@/components/logout-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LogoutForm />
      </div>
    </div>
  )
}
