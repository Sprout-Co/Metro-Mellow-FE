import { QueryHookOptions } from "@apollo/client";
import {
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
  GetUserByIdQuery,
  GetUserByIdQueryVariables,
  GetUsersQuery,
  GetUsersQueryVariables,
  useGetCurrentUserQuery,
  useGetCurrentUserLazyQuery,
  useGetUserByIdQuery,
  useGetUserByIdLazyQuery,
  useGetUsersQuery,
  useGetUsersLazyQuery,
} from "@/graphql/api";

type GetUserByIdOptions = Omit<
  QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>,
  "variables"
> & {
  variables: GetUserByIdQueryVariables;
};

export const useGetCurrentUserHook = (
  options?: QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>
) => {
  const { data, loading, error } = useGetCurrentUserQuery(options);
  return { data, loading, error };
};

export const useLazyGetCurrentUserHook = (
  options?: QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>
) => {
  const [getCurrentUser, { loading, data, error }] =
    useGetCurrentUserLazyQuery(options);

  return {
    getCurrentUser: () => {
      getCurrentUser();
    },
    data,
    loading,
    error,
  };
};

export const useGetUserByIdHook = (options: GetUserByIdOptions) => {
  const { data, loading, error } = useGetUserByIdQuery(options);
  return { data, loading, error };
};

export const useLazyGetUserByIdHook = (options: GetUserByIdOptions) => {
  const [getUserById, { loading, data, error }] =
    useGetUserByIdLazyQuery(options);

  return {
    getUserById: () => {
      getUserById();
    },
    data,
    loading,
    error,
  };
};

export const useGetUsersHook = (
  options?: QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) => {
  const { data, loading, error } = useGetUsersQuery(options);
  return { data, loading, error };
};

export const useLazyGetUsersHook = (
  options?: QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) => {
  const [getUsers, { loading, data, error }] = useGetUsersLazyQuery(options);

  return {
    getUsers: () => {
      getUsers();
    },
    data,
    loading,
    error,
  };
};
