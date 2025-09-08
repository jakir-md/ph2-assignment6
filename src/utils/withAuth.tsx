import { useGetMeQuery } from "@/redux/features/user/user.api";
import type { ComponentType } from "react";
import { useNavigate } from "react-router";

export const withAuth = (Component: ComponentType, userRole: string) => {
  return function AuthWraper() {
    const { data, isLoading } = useGetMeQuery(undefined);
    const navigate = useNavigate();

    if (!isLoading && !data?.data.email) {
      navigate("/login");
    }

    if (userRole && !isLoading && userRole !== data?.data.role) {
      navigate("/unAuthorized");
    }

    return <Component />;
  };
};
