import { useGetCurrentUserQuery } from "@/graphql/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth() {
  const { data, loading, error } = useGetCurrentUserQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && error) {
      // If there's an error, the user is not authenticated
      router.push("/login");
    }
  }, [loading, error, router]);

  return {
    user: data?.me,
    loading,
    error,
    isAuthenticated: !!data?.me,
  };
}
