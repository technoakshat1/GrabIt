import {createContext} from 'react';

const ThemeContext=createContext(["light",()=>{}]);
export const SwitchContext=createContext([false,()=>{}]);
export const AuthenticationContext=createContext([false,()=>{}]);
export const LoginOverlayContext=createContext([false,()=>{}]);
export const defaultLoginContext=createContext(["signIn",()=>{}]);

export default ThemeContext;