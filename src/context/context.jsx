import { createContext } from "react";

const ThemeContext = createContext(["light", () => {}]);
export const SwitchContext = createContext([false, () => {}]);
export const AuthenticationContext = createContext([false, () => {}]);
export const LoginOverlayContext = createContext([false, () => {}]);
export const defaultLoginContext = createContext(["signIn", () => {}]);
export const ThemeSaveContext=createContext();
export const ApiContext = createContext();
export const HeroRef= createContext(null);
export const dashBoardContext=createContext([false,()=>{}]);
export const notificationContext=createContext([false,()=>{}]);
export const editContext=createContext([true,()=>{}]);

export default ThemeContext;
