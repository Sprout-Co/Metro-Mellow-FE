import { QueryHookOptions } from "@apollo/client";
import {
  GetServicesQuery,
  GetServicesQueryVariables,
  GetServiceByIdQuery,
  GetServiceByIdQueryVariables,
  useGetServiceByIdQuery,
  useGetServiceByIdLazyQuery,
  useGetServicesQuery,
  useGetServicesLazyQuery,
} from "@/graphql/api";

type GetServiceByIdOptions = Omit<
  QueryHookOptions<GetServiceByIdQuery, GetServiceByIdQueryVariables>,
  "variables"
> & {
  variables: GetServiceByIdQueryVariables;
};

export const useGetServiceByIdHook = (options: GetServiceByIdOptions) => {
  const { data, loading, error } = useGetServiceByIdQuery(options);
  return { data, loading, error };
};

export const useLazyGetServiceByIdHook = (options: GetServiceByIdOptions) => {
  const [getServiceById, { loading, data, error }] =
    useGetServiceByIdLazyQuery(options);

  return {
    getServiceById: () => {
      getServiceById();
    },
    data,
    loading,
    error,
  };
};

export const useGetServicesHook = (
  options?: QueryHookOptions<GetServicesQuery, GetServicesQueryVariables>
) => {
  const { data, loading, error } = useGetServicesQuery(options);
  return { data, loading, error };
};

export const useLazyGetServicesHook = (
  options?: QueryHookOptions<GetServicesQuery, GetServicesQueryVariables>
) => {
  const [getServices, { loading, data, error }] =
    useGetServicesLazyQuery(options);

  return {
    getServices: () => {
      getServices();
    },
    data,
    loading,
    error,
  };
};
