import { createContext } from "react";

export type ContextCartCountType = {
    contextCartCount: number;
    // eslint-disable-next-line @typescript-eslint/ban-types
    setContextCartCount: Function;
}

export const ContextCartCount = createContext<ContextCartCountType>({
    contextCartCount: 0,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setContextCartCount: () => {},
})