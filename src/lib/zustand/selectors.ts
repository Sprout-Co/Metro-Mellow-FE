import { shallow } from "zustand/shallow";

export function createSelector<T extends object, U>(selector: (state: T) => U) {
  return (state: T) => selector(state);
}

export function createShallowSelector<T extends object, U>(
  selector: (state: T) => U
) {
  return [selector, shallow] as const;
}
