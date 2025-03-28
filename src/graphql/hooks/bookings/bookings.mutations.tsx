import {
  CreateBookingMutationOptions,
  CreateBookingMutationVariables,
  UpdateBookingMutationOptions,
  UpdateBookingMutationVariables,
  CancelBookingMutationOptions,
  CancelBookingMutationVariables,
  CompleteBookingMutationOptions,
  CompleteBookingMutationVariables,
  AssignStaffMutationOptions,
  AssignStaffMutationVariables,
  UpdateBookingStatusMutationOptions,
  UpdateBookingStatusMutationVariables,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useCancelBookingMutation,
  useCompleteBookingMutation,
  useAssignStaffMutation,
  useUpdateBookingStatusMutation,
} from "@/graphql/api";

export const useCreateBookingHook = (
  args: CreateBookingMutationVariables,
  options?: CreateBookingMutationOptions
) => {
  const [createBooking, { data, loading, error }] = useCreateBookingMutation({
    variables: args,
    ...options,
  });
  return { createBooking, data, loading, error };
};

export const useUpdateBookingHook = (
  args: UpdateBookingMutationVariables,
  options?: UpdateBookingMutationOptions
) => {
  const [updateBooking, { data, loading, error }] = useUpdateBookingMutation({
    variables: args,
    ...options,
  });
  return { updateBooking, data, loading, error };
};

export const useCancelBookingHook = (
  args: CancelBookingMutationVariables,
  options?: CancelBookingMutationOptions
) => {
  const [cancelBooking, { data, loading, error }] = useCancelBookingMutation({
    variables: args,
    ...options,
  });
  return { cancelBooking, data, loading, error };
};

export const useCompleteBookingHook = (
  args: CompleteBookingMutationVariables,
  options?: CompleteBookingMutationOptions
) => {
  const [completeBooking, { data, loading, error }] =
    useCompleteBookingMutation({
      variables: args,
      ...options,
    });
  return { completeBooking, data, loading, error };
};

export const useAssignStaffHook = (
  args: AssignStaffMutationVariables,
  options?: AssignStaffMutationOptions
) => {
  const [assignStaff, { data, loading, error }] = useAssignStaffMutation({
    variables: args,
    ...options,
  });
  return { assignStaff, data, loading, error };
};

export const useUpdateBookingStatusHook = (
  args: UpdateBookingStatusMutationVariables,
  options?: UpdateBookingStatusMutationOptions
) => {
  const [updateBookingStatus, { data, loading, error }] =
    useUpdateBookingStatusMutation({
      variables: args,
      ...options,
    });
  return { updateBookingStatus, data, loading, error };
};
