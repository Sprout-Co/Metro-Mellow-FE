import { QueryHookOptions } from "@apollo/client";
import {
  GetBookingsQuery,
  GetBookingsQueryVariables,
  GetBookingByIdQuery,
  GetBookingByIdQueryVariables,
  GetCustomerBookingsQuery,
  GetCustomerBookingsQueryVariables,
  GetStaffBookingsQuery,
  GetStaffBookingsQueryVariables,
  useGetBookingByIdQuery,
  useGetBookingByIdLazyQuery,
  useGetBookingsQuery,
  useGetBookingsLazyQuery,
  useGetCustomerBookingsQuery,
  useGetCustomerBookingsLazyQuery,
  useGetStaffBookingsQuery,
  useGetStaffBookingsLazyQuery,
} from "@/graphql/api";

type GetBookingByIdOptions = Omit<
  QueryHookOptions<GetBookingByIdQuery, GetBookingByIdQueryVariables>,
  "variables"
> & {
  variables: GetBookingByIdQueryVariables;
};

export const useGetBookingByIdHook = (options: GetBookingByIdOptions) => {
  const { data, loading, error } = useGetBookingByIdQuery(options);
  return { data, loading, error };
};

export const useLazyGetBookingByIdHook = (options: GetBookingByIdOptions) => {
  const [getBookingById, { loading, data, error }] =
    useGetBookingByIdLazyQuery(options);

  return {
    getBookingById: () => {
      getBookingById();
    },
    data,
    loading,
    error,
  };
};

export const useGetBookingsHook = (
  options?: QueryHookOptions<GetBookingsQuery, GetBookingsQueryVariables>
) => {
  const { data, loading, error } = useGetBookingsQuery(options);
  return { data, loading, error };
};

export const useLazyGetBookingsHook = (
  options?: QueryHookOptions<GetBookingsQuery, GetBookingsQueryVariables>
) => {
  const [getBookings, { loading, data, error }] =
    useGetBookingsLazyQuery(options);

  return {
    getBookings: () => {
      getBookings();
    },
    data,
    loading,
    error,
  };
};

export const useGetCustomerBookingsHook = (
  options?: QueryHookOptions<
    GetCustomerBookingsQuery,
    GetCustomerBookingsQueryVariables
  >
) => {
  const { data, loading, error } = useGetCustomerBookingsQuery(options);
  return { data, loading, error };
};

export const useLazyGetCustomerBookingsHook = (
  options?: QueryHookOptions<
    GetCustomerBookingsQuery,
    GetCustomerBookingsQueryVariables
  >
) => {
  const [getCustomerBookings, { loading, data, error }] =
    useGetCustomerBookingsLazyQuery(options);

  return {
    getCustomerBookings: () => {
      getCustomerBookings();
    },
    data,
    loading,
    error,
  };
};

export const useGetStaffBookingsHook = (
  options?: QueryHookOptions<
    GetStaffBookingsQuery,
    GetStaffBookingsQueryVariables
  >
) => {
  const { data, loading, error } = useGetStaffBookingsQuery(options);
  return { data, loading, error };
};

export const useLazyGetStaffBookingsHook = (
  options?: QueryHookOptions<
    GetStaffBookingsQuery,
    GetStaffBookingsQueryVariables
  >
) => {
  const [getStaffBookings, { loading, data, error }] =
    useGetStaffBookingsLazyQuery(options);

  return {
    getStaffBookings: () => {
      getStaffBookings();
    },
    data,
    loading,
    error,
  };
};
