import React from 'react';
import GlobalTheme from "../components/stateless/themeComponent";
import Header from "../components/statefull/header";
import Footer from "../components/stateless/footer";
import "../Styles/DashBoard.css";
import DashBoardControlPannel from "../components/statefull/dashboardControlPanel";

function AccountDashboardPage() {
    return (
        <div className="account-dashboard">
            <GlobalTheme/>
            <Header/>
            <DashBoardControlPannel/>
            <Footer/>
        </div>
    )
}

export default AccountDashboardPage;
