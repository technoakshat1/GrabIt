import React,{useContext,useRef,useEffect} from "react";
import {Overlay} from "react-portal-overlay";

import {LoginOverlayContext,AuthenticationContext} from "../context/context";

import HeaderComponent from "../components/statefull/header";

import GlobalTheme from "../components/stateless/themeComponent";

import LoginComponent from "../components/stateless/loginComponent";

function HomePage() {
  const [open,setOpen]=useContext(LoginOverlayContext);
  const wrapperRef = useRef(null);
  useOutside(wrapperRef);

  


  function useOutside(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
         }
        }
        

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div>
      <GlobalTheme/>
      <HeaderComponent />
      <Overlay open={open} onClose={()=>setOpen(false)} css={
        {
          display: `flex`,
          background:`rgba(0, 0, 0, 0.3)`,
          justifyContent:`center`,
          height:`80rem`
        }
        
        }>
       <div ref={wrapperRef}>
        <LoginComponent/>
        </div>
      </Overlay>
    </div>
  );
}

export default HomePage;
