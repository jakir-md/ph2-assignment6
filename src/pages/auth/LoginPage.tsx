import Logo from "@/assets/icons/Logo"
import { LoginForm } from "@/components/modules/auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="mx-auto min-h-svh ">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Logo />
            </div>
            DigiWallet Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
