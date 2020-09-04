import React, { useContext, useRef, useEffect } from "react";
import { Overlay } from "react-portal-overlay";

import { LoginOverlayContext ,HeroRef } from "../context/context";

import HeaderComponent from "../components/statefull/header";

import GlobalTheme from "../components/stateless/themeComponent";

import LoginComponent from "../components/statefull/loginComponent";

import HeroBox from "../components/stateless/Herobox";

import { useMediaQuery } from "react-responsive";

import {useSpring,animated,config} from "react-spring";

import CategoryCard from "../components/stateless/CategoryCard";

import { Categories } from "../categories";

function HomePage() {
  const [open, setOpen] = useContext(LoginOverlayContext);
  const wrapperRef = useRef(null);
  useOutside(wrapperRef);
  const {heroRef}=useContext(HeroRef);

  const mobileView = useMediaQuery({ query: "(max-width: 420px)" });
  const [props,setAnimation]=useSpring(
    ()=>(!mobileView?{opacity:0,config:config.molasses,delay:1000}:{opacity:1})
  );

  function handleScroll(){
    if(heroRef.current.getBoundingClientRect().top<=-200&&!mobileView){
      setAnimation({opacity:1});
    }else if(!mobileView){
      setAnimation({opacity:0});
    }
   
  }

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  });

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
      <section>
        <GlobalTheme />
        <HeaderComponent />
        <Overlay
          open={open}
          onClose={() => setOpen(false)}
          css={{
            display: `flex`,
            background: `rgba(0, 0, 0, 0.7)`,
            justifyContent: `center`,
            height: `100rem`,
            width:`100%`,
            position:`fixed`,
            top:`${!mobileView? `-15rem`:`0rem`}`,
            left: `0rem`,
          }}
        >
          <div ref={wrapperRef}>
            <LoginComponent />
          </div>
        </Overlay>
        <HeroBox />
      </section>
      <section className="category-section" >
        <animated.div className="Categories-background" style={props} >
           <h1>Currently Hot Categories!</h1>
          <div className="container">
            <div className="row category-item">
              {Categories.map((category, index) => {
                if (index <= 2) {
                  return (
                    <div className="col-lg-4 col-md-8">
                      <CategoryCard title={category.title} img={category.image} />
                    </div>
                  );
                }
              })}
            </div>
            <div className="row">
              {Categories.map((category, index) => {
                if (index >= 3) {
                  return (
                    <div className="col-lg-4 col-md-8">
                      <CategoryCard title={category.title} img={category.image}  />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </animated.div>
      </section>
    </div>
  );
}

export default HomePage;
