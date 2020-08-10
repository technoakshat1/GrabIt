import React from "react";
import HeaderComponent from "../components/statefull/header";

import GlobalTheme from "../components/stateless/themeComponent";

function HomePage() {
  return (
    <div>
      <GlobalTheme/>
      <HeaderComponent />
    </div>
  );
}

export default HomePage;
