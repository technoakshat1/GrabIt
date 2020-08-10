import {createContext} from 'react';

const ThemeContext=createContext(["light",()=>{}]);
export const SwitchContext=createContext([false,()=>{}]);

export default ThemeContext;