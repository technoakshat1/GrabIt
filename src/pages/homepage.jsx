import React, { useContext, useRef, useEffect ,useState } from "react";
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

import ReactPlayer from "react-player";

function HomePage() {
  const [open, setOpen] = useContext(LoginOverlayContext);
  const wrapperRef = useRef(null);
  useOutside(wrapperRef);
  const {heroRef}=useContext(HeroRef);
  const [video,setVideo]=useState(false);

  const mobileView = useMediaQuery({ query: "(max-width: 420px)" });
  const [props,setAnimation]=useSpring(
    ()=>({opacity:0,config:config.molasses})
  );

  function handleScroll(){
    if(heroRef.current.getBoundingClientRect().top<=-80){
      setAnimation({opacity:1});
    }else{
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
          setVideo(false);
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
        <HeroBox onKnowMore={()=>setVideo(true)}/>
        <Overlay
          open={video}
          onClose={() => setVideo(false)}
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
          <div className="video-format" ref={wrapperRef}>
            <ReactPlayer url="https://youtu.be/Ap_nzWmDpP8" width={mobileView?"300px":"900px"} playing={video} height={mobileView?"500px":"400px"} onEnded={()=>setVideo(false)}/>
          </div>
        </Overlay>
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
