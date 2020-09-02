import React, { useContext, useRef, useEffect } from "react";
import { Overlay } from "react-portal-overlay";

import { LoginOverlayContext } from "../context/context";

import HeaderComponent from "../components/statefull/header";

import GlobalTheme from "../components/stateless/themeComponent";

import LoginComponent from "../components/statefull/loginComponent";

import { useMediaQuery } from "react-responsive";

function HomePage() {
  const [open, setOpen] = useContext(LoginOverlayContext);
  const wrapperRef = useRef(null);
  useOutside(wrapperRef);

  const mobileView = useMediaQuery({ query: "(max-width: 420px)" });

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
      if (!mobileView) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.addEventListener("touchstart", handleClickOutside);
      }

      return () => {
        // Unbind the event listener on clean up
        if (!mobileView) {
          document.removeEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("touchstart", handleClickOutside);
        }
      };
    }, [ref]);
  }

  return (
    <div style={{ height: `100%` }}>
      <GlobalTheme />
      <HeaderComponent />
      <Overlay
        open={open}
        onClose={() => setOpen(false)}
        css={{
          display: `flex`,
          background: `rgba(0, 0, 0, 0.3)`,
          justifyContent: `center`,
          height: `80rem`,
        }}
      >
        <div ref={wrapperRef}>
          <LoginComponent />
        </div>
      </Overlay>
    </div>
  );
}

export default HomePage;
