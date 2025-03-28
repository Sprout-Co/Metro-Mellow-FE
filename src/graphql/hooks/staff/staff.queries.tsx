import { QueryHookOptions } from "@apollo/client";
import {
  GetStaffProfileByIdQuery,
  GetStaffProfileByIdQueryVariables,
  GetStaffProfilesQuery,
  GetStaffProfilesQueryVariables,
  GetAvailableStaffQuery,
  GetAvailableStaffQueryVariables,
  GetStaffPerformanceQuery,
  GetStaffPerformanceQueryVariables,
  useGetStaffProfileByIdQuery,
  useGetStaffProfileByIdLazyQuery,
  useGetStaffProfilesQuery,
  useGetStaffProfilesLazyQuery,
  useGetAvailableStaffQuery,
  useGetAvailableStaffLazyQuery,
  useGetStaffPerformanceQuery,
  useGetStaffPerformanceLazyQuery,
} from "@/graphql/api";

type GetStaffProfileByIdOptions = Omit<
  QueryHookOptions<GetStaffProfileByIdQuery, GetStaffProfileByIdQueryVariables>,
  "variables"
> & {
  variables: GetStaffProfileByIdQueryVariables;
};

type GetStaffPerformanceOptions = Omit<
  QueryHookOptions<GetStaffPerformanceQuery, GetStaffPerformanceQueryVariables>,
  "variables"
> & {
  variables: GetStaffPerformanceQueryVariables;
};

type GetAvailableStaffOptions = Omit<
  QueryHookOptions<GetAvailableStaffQuery, GetAvailableStaffQueryVariables>,
  "variables"
> & {
  variables: GetAvailableStaffQueryVariables;
};

export const useGetStaffProfileByIdHook = (
  options: GetStaffProfileByIdOptions
) => {
  const { data, loading, error } = useGetStaffProfileByIdQuery(options);
  return { data, loading, error };
};

export const useLazyGetStaffProfileByIdHook = (
  options: GetStaffProfileByIdOptions
) => {
  const [getStaffProfileById, { loading, data, error }] =
    useGetStaffProfileByIdLazyQuery(options);

  return {
    getStaffProfileById: () => {
      getStaffProfileById();
    },
    data,
    loading,
    error,
  };
};

export const useGetStaffProfilesHook = (
  options?: QueryHookOptions<
    GetStaffProfilesQuery,
    GetStaffProfilesQueryVariables
  >
) => {
  const { data, loading, error } = useGetStaffProfilesQuery(options);
  return { data, loading, error };
};

export const useLazyGetStaffProfilesHook = (
  options?: QueryHookOptions<
    GetStaffProfilesQuery,
    GetStaffProfilesQueryVariables
  >
) => {
  const [getStaffProfiles, { loading, data, error }] =
    useGetStaffProfilesLazyQuery(options);

  return {
    getStaffProfiles: () => {
      getStaffProfiles();
    },
    data,
    loading,
    error,
  };
};

export const useGetAvailableStaffHook = (options: GetAvailableStaffOptions) => {
  const { data, loading, error } = useGetAvailableStaffQuery(options);
  return { data, loading, error };
};

export const useLazyGetAvailableStaffHook = (
  options: GetAvailableStaffOptions
) => {
  const [getAvailableStaff, { loading, data, error }] =
    useGetAvailableStaffLazyQuery(options);

  return {
    getAvailableStaff: () => {
      getAvailableStaff();
    },
    data,
    loading,
    error,
  };
};

export const useGetStaffPerformanceHook = (
  options: GetStaffPerformanceOptions
) => {
  const { data, loading, error } = useGetStaffPerformanceQuery(options);
  return { data, loading, error };
};

export const useLazyGetStaffPerformanceHook = (
  options: GetStaffPerformanceOptions
) => {
  const [getStaffPerformance, { loading, data, error }] =
    useGetStaffPerformanceLazyQuery(options);

  return {
    getStaffPerformance: () => {
      getStaffPerformance();
    },
    data,
    loading,
    error,
  };
};
