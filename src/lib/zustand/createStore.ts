import { StateCreator, create, StoreApi } from "zustand";
import { devtools } from "zustand/middleware";

type SetState<T> = StoreApi<T>["setState"];

export const createStore = <T extends object>(
  name: string,
  initialState: Partial<T>,
  actions: (set: SetState<T>) => Partial<T>
) => {
  return create<T>()(
    devtools(
      (set) =>
        ({
          ...initialState,
          ...actions(set),
        }) as T,
      { name }
    )
  );
};
