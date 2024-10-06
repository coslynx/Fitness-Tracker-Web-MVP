import { useSession } from "next-auth/react";

export const useUser = () => {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  return { isLoading, isAuthenticated, user };
};