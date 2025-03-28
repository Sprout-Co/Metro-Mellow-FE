import {
  LoginMutationOptions,
  LoginMutationVariables,
  RegisterMutationOptions,
  RegisterMutationVariables,
  UpdateProfileMutationOptions,
  UpdateProfileMutationVariables,
  ChangePasswordMutationOptions,
  ChangePasswordMutationVariables,
  ForgotPasswordMutationOptions,
  ForgotPasswordMutationVariables,
  ResetPasswordMutationOptions,
  ResetPasswordMutationVariables,
  UpdateUserRoleMutationOptions,
  UpdateUserRoleMutationVariables,
  useLoginMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateUserRoleMutation,
} from "@/graphql/api";

export const useLoginHook = (
  args: LoginMutationVariables,
  options?: LoginMutationOptions
) => {
  const [login, { data, loading, error }] = useLoginMutation({
    variables: args,
    ...options,
  });
  return { login, data, loading, error };
};

export const useRegisterHook = (
  args: RegisterMutationVariables,
  options?: RegisterMutationOptions
) => {
  const [register, { data, loading, error }] = useRegisterMutation({
    variables: args,
    ...options,
  });
  return { register, data, loading, error };
};

export const useUpdateProfileHook = (
  args: UpdateProfileMutationVariables,
  options?: UpdateProfileMutationOptions
) => {
  const [updateProfile, { data, loading, error }] = useUpdateProfileMutation({
    variables: args,
    ...options,
  });
  return { updateProfile, data, loading, error };
};

export const useChangePasswordHook = (
  args: ChangePasswordMutationVariables,
  options?: ChangePasswordMutationOptions
) => {
  const [changePassword, { data, loading, error }] = useChangePasswordMutation({
    variables: args,
    ...options,
  });
  return { changePassword, data, loading, error };
};

export const useForgotPasswordHook = (
  args: ForgotPasswordMutationVariables,
  options?: ForgotPasswordMutationOptions
) => {
  const [forgotPassword, { data, loading, error }] = useForgotPasswordMutation({
    variables: args,
    ...options,
  });
  return { forgotPassword, data, loading, error };
};

export const useResetPasswordHook = (
  args: ResetPasswordMutationVariables,
  options?: ResetPasswordMutationOptions
) => {
  const [resetPassword, { data, loading, error }] = useResetPasswordMutation({
    variables: args,
    ...options,
  });
  return { resetPassword, data, loading, error };
};

export const useUpdateUserRoleHook = (
  args: UpdateUserRoleMutationVariables,
  options?: UpdateUserRoleMutationOptions
) => {
  const [updateUserRole, { data, loading, error }] = useUpdateUserRoleMutation({
    variables: args,
    ...options,
  });
  return { updateUserRole, data, loading, error };
};
