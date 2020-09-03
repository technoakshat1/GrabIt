import { createContext } from "react";

const ThemeContext = createContext(["light", () => {}]);
export const SwitchContext = createContext([false, () => {}]);
export const AuthenticationContext = createContext([false, () => {}]);
export const LoginOverlayContext = createContext([false, () => {}]);
export const defaultLoginContext = createContext(["signIn", () => {}]);
export const ApiContext = createContext();
export const HeroRef= createContext(null);

export default ThemeContext;
