import React, { useState } from "react";
import GlobalTheme from "../components/stateless/themeComponent";
import Header from "../components/statefull/header";
import Footer from "../components/stateless/footer";
import "../Styles/DashBoard.css";
import DashBoardControlPannel from "../components/statefull/dashboardControlPanel";
import DashBoardMainPannel from "../components/stateless/dashBoardMainPanel";
import NotificationBox from "../components/statefull/notificationBox";
import {
  dashBoardContext,
  notificationContext,
  editContext,
} from "../context/context";

function AccountDashboardPage() {
  const dashBoardAnimation = useState(false);
  const notification = useState(false);
  const edit = useState(true);
  return (
    <div className="account-dashboard">
      <GlobalTheme />
      <Header />
      {notification[0] && (
        <NotificationBox
          message="Success your account Profile updated!"
          onClose={() => {}}
        />
      )}
      {!edit[0] && (
        <NotificationBox message="In Edit mode ! make sure you don't leave any field empty!" 
        onClose={()=>{}} 

        />
      )}
      <dashBoardContext.Provider value={[...dashBoardAnimation]}>
        <notificationContext.Provider value={[...notification]}>
          <editContext.Provider value={[...edit]}>
            <div style={{ display: "flexbox", flexDirection: "row" }}>
              <DashBoardControlPannel />
              <DashBoardMainPannel />
            </div>
          </editContext.Provider>
        </notificationContext.Provider>
      </dashBoardContext.Provider>
      <Footer />
    </div>
  );
}

export default AccountDashboardPage;
