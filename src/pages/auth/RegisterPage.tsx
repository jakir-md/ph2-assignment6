import Logo from "@/assets/icons/Logo"
import { RegisterForm } from "@/components/modules/auth/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="mx-auto min-h-svh ">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Logo />
            </div>
            DigiWallet Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm/>
          </div>
        </div>
      </div>
    </div>
  )
}
