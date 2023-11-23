import React, {useEffect} from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { RedirectAs404 } from "./utils/Utils";
import PrivateRoute from "./route/PrivateRoute";

import Layout from "./layout/Index";
import "./assets/css/custom.css";
import Error404Classic from "./pages/error/404-classic";
import Error404Modern from "./pages/error/404-modern";
import Error504Modern from "./pages/error/504-modern";
import Error504Classic from "./pages/error/504-classic";

// import Faq from "./pages/others/Faq";
// import Terms from "./pages/others/Terms";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Success from "./pages/auth/Success";
import TransactionPrint from "./pages/wallet/InvoicesPrint";
import ResetPassword from "./pages/auth/ResetPassword";
import ResetPass from "./pages/auth/ResetPass";
import AutoLog from "./pages/auth/AutoLog";
import ForgetSuccess from "./pages/auth/ForgetSuccess";

import ReactGA from "react-ga4";
// import InvoicePrint from "./pages/pre-built/invoice/InvoicePrint";
// import './firebase';
// import './firebase-messaging-sw';


const App = () => {
  
  useEffect(()=> {
    ReactGA.initialize("G-XBPZ576D0X");

    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "j59tt3dijb");

  },[])

  return (
    <Switch>
      {/* Auth Pages */}
      <Route exact path={`${process.env.PUBLIC_URL}/auth-success`} component={Success}></Route>
      <Route exact path={`${process.env.PUBLIC_URL}/forget-password`} component={ForgotPassword}></Route>
      <Route exact path={`${process.env.PUBLIC_URL}/forget-password-process`} component={ForgetSuccess}></Route>
      <Route exact path={`${process.env.PUBLIC_URL}/reset-password/:uid/:key`} component={ResetPassword}></Route>
      <Route exact path={`${process.env.PUBLIC_URL}/reset-pass/:uid/:key`} component={ResetPass}></Route>
      <Route exact path={`${process.env.PUBLIC_URL}/auth-register`} component={Register}></Route>
      <Route exact path={`${process.env.PUBLIC_URL}/auth-login`} component={Login}></Route>
      <Route exact path={`${process.env.PUBLIC_URL}/auto-auth/:token`} component={AutoLog}></Route>

      {/* Print Pages */}
      {/* <Route exact path={`${process.env.PUBLIC_URL}/invoice-print/:id`} component={InvoicePrint}></Route> */}

      {/* Helper pages */}
      {/* <Route exact path={`${process.env.PUBLIC_URL}/auths/terms`} component={Terms}></Route> */}
      {/* <Route exact path={`${process.env.PUBLIC_URL}/auths/faq`} component={Faq}></Route> */}

      {/* <Route exact path={`${process.env.PUBLIC_URL}/invoice-print`} component={InvoicePrint}></Route> */}

      {/*Error Pages*/}
      <Route exact path={`${process.env.PUBLIC_URL}/errors/404-classic`} component={Error404Classic}></Route>
      <Route exact path={`${process.env.PUBLIC_URL}/errors/504-modern`} component={Error504Modern}></Route>
      <Route exact path={`${process.env.PUBLIC_URL}/errors/404-modern`} component={Error404Modern}></Route>
      <Route exact path={`${process.env.PUBLIC_URL}/errors/504-classic`} component={Error504Classic}></Route>
      <Route  exact path={`${process.env.PUBLIC_URL}/transaction-print/:transactionid`} component={TransactionPrint}/>


      {/*Main Routes*/}
      <PrivateRoute exact path="" component={Layout}></PrivateRoute>
      <Route component={RedirectAs404}></Route>
    </Switch>
  );
};

export default withRouter(App);
