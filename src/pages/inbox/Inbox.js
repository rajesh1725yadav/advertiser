import React, { useContext, useEffect, useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import InvestOverview from "../../components/partials/invest/invest-overview/InvestOverview";
import InvestPlan from "../../components/partials/invest/invest-plan/InvestPlan";
import RecentInvest from "../../components/partials/invest/recent-investment/RecentInvest";
import RecentActivity from "../../components/partials/default/recent-activity/Activity";
import Notifications from "../../components/partials/default/notification/Notification";
import { DropdownToggle, DropdownMenu, Card, UncontrolledDropdown, DropdownItem, ModalBody, Modal } from "reactstrap";
import {
  Block,
  BlockDes,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  PreviewAltCard,
  TooltipComponent,
} from "../../components/Component";
import { BalanceBarChart, DepositBarChart, WithdrawBarChart } from "../../components/partials/charts/invest/InvestChart";
import NotiDetail from "./NotiDetail";
import AppContext from "../../context/AppContext";

const Inbox = () => {
const appSts = useContext(AppContext);
const [modal, setModal] = useState(false);
const [sm, updateSm] = useState(false);
const [ndesc, setNdesc] = useState('');
const [ntitle, setNtitle] = useState('');
// const [durl, setDurl] = useState('');
// const [nid, setNid] = useState('');

// let title = appSts.sts.ntitle ? appSts.sts.ntitle : '';
// let desc = appSts.sts.ndesc ? appSts.sts.ndesc : '';
// const durl = appSts.sts.durl ? appSts.sts.durl : '';
// const nid = appSts.sts.nid ? appSts.sts.nid : '';

useEffect(()=>{

  // setNtitle(title);
  // setNdesc(desc);
  // setDurl(durl);
  // setNid(nid);
  console.log(appSts.sts);
},[])
  return (
    <React.Fragment>
      <Head title="My Inbox" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Inbox {}</BlockTitle>
              <BlockDes className="text-soft">
                <p>Here you can find all notifications and offers</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col md="12" xxl="9">
              <Card className="card-bordered card-full">
                {appSts.sts.ntitle.length ?
                  <NotiDetail appState={appSts}/>
                  : 
                <RecentActivity appState={appSts} />
                }
              </Card>
            </Col>
          </Row>
        </Block>
      </Content>
      {/* <Modal isOpen={modal} className="modal-dialog-centered" size="lg" toggle={() => setModal(false)}>
        <ModalBody>
        <div className="p-2">
            <h5 className="title">{ntitle}</h5>
            
            {ndesc}
          </div>
        </ModalBody>
      </Modal> */}
    </React.Fragment>
  );
};

export default Inbox;
