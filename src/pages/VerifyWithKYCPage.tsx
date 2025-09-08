import { KYCForm } from "@/components/modules/auth/KYCForm";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import verifiedImage from "../assets/images/verified.png";

export default function VerifyWithKYCPage() {
  const { data: userInfo, isLoading } = useGetMeQuery(undefined);
  return (
    <div className="mx-auto min-h-svh ">
      <div className="flex flex-col gap-4 p-6">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium"></a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {!isLoading && !userInfo?.data.isVerified && <KYCForm />}
            {!isLoading && userInfo.data.isVerified && (
              <div className="my-auto">
                <img className="h-30 w-30 mx-auto" src={verifiedImage} alt="" />
                <h1 className="text-center text-gray-400">
                  Your Account is already KYC verified. To reset your KYC,
                  contact with admin.
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
