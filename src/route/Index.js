import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
// import { ProductContextProvider } from "../pages/pre-built/products/ProductContext";
// import { UserContextProvider } from "../pages/pre-built/user-manage/UserContext";
import { RedirectAs404 } from "../utils/Utils";
import Invest from "../pages/Invest";

import Campaign from "../pages/campaign/Campaign";
import CreateCampaign from "../pages/campaign/CreateCampaign";
import Wallet from "../pages/wallet/Wallet";
import UserProfileLayout from "../pages/profile/UserProfileLayout";
import Inbox from "../pages/inbox/Inbox";
import UpdateCampaign from "../pages/campaign/UpdateCampaign";
import BlockIP from "../pages/BlockIP/BlockedIP";
import Payment from "../pages/wallet/Payment";
import Stripe from "../pages/wallet/Stripe";
import Success from "../pages/wallet/Success";
import Failed from "../pages/wallet/Failed";
import Support from "../pages/support/Support";
import Report from "../pages/Report";
import Invoice from "../pages/wallet/Invoice";
import BtcSuccess from "../pages/wallet/BtcSuccess";


const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>
        {/*Dashboards*/}
        {/* <Route exact path={`${process.env.PUBLIC_URL}/crypto`} component={Crypto}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/analytics`} component={Analytics}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/invest`} component={Invest}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/_blank`} component={Blank}></Route> */}

        {/*Pre-built Pages*/}
        <Route exact path={`${process.env.PUBLIC_URL}/create-campaign`} component={CreateCampaign}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/update-campaign/:type/:cid`} component={UpdateCampaign}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/campaigns`} component={Campaign}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Invest}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/wallet`} component={Wallet}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/profile`} component={UserProfileLayout}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/inbox`} component={Inbox}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/inbox/detail`} component={Inbox}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/block-ip`} component={BlockIP}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/payment`} component={Payment}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/stripe`} component={Stripe}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/support`} component={Support}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/report`} component={Report}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/invoice/:tid`} component={Invoice}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/payment/btc-success`} component={BtcSuccess}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/payment/success/:trn`} component={Success}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/payment/failed/:trn`} component={Failed}></Route>
        {/* <Route exact path={`${process.env.PUBLIC_URL}/user-profile-regular/`} component={UserProfileLayout}></Route> */}
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/user-profile-notification/`}
          component={UserProfileLayout}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/user-profile-activity/`} component={UserProfileLayout}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/user-profile-setting/`} component={UserProfileLayout}></Route>
        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};
export default Pages;
