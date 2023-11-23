import React, { useState, useEffect, useContext } from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import InvestOverview from "../components/partials/invest/invest-overview/InvestOverview";
import InvestPlan from "../components/partials/invest/invest-plan/InvestPlan";
import RecentInvest from "../components/partials/invest/recent-investment/RecentInvest";
import RecentActivity from "../components/partials/default/recent-activity/Activity";
import Notifications from "../components/partials/default/notification/Notification";
import { DropdownToggle, DropdownMenu, Card, UncontrolledDropdown, DropdownItem } from "reactstrap";
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
} from "../components/Component";
import { BalanceBarChart, DepositBarChart, WithdrawBarChart } from "../components/partials/charts/invest/InvestChart";
import BrowserUser from "../components/partials/analytics/browser-users/BrowserUser";
import AudienceOverview from "../components/partials/analytics/audience-overview/AudienceOverview";
import SessionDevice from "../components/partials/analytics/session-devices/SessionDevice";
import SalesOverview from "../components/partials/default/sales-overview/SalesOverview";
import { Link } from "react-router-dom";
import CampData from "./Dashboard/CampData";
import { dashboardGraph, getTopCamps } from "../app/api";
import SessionOs from "../components/partials/analytics/session-devices/SessionOs";
import AppContext from "../context/AppContext";
import Loader from "../app/Loader";

const InvestHomePage = () => {
  const [sm, updateSm] = useState(false);
  const [days, setDays] = useState(0);
  const ctx = useContext(AppContext);
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(false);
  const [cdata, setCdata] = useState([]);
  
  const adGraphData = async (day) => {
    setLoad(true)
    let uid = localStorage.getItem('uid');
    
    let res = await dashboardGraph({
      uid:uid, 
      option:day
    });
    
    setData(res);
    let res2 = await getTopCamps({
      uid:uid,
      option:day
    });
    setCdata(res2.topcamp);

    ctx.dispatch({
      type:'wlt',
      wlt: res.wallet
    });
    setLoad(false)
  }

useEffect(()=>{
  adGraphData(0)
},[]);

// 4207 3993 4819 6758 - 04/26 - 230

  return (
    <React.Fragment>
      <Head title="Welcome to 7Search PPC" />
      <Content>
      {/* <Loader visible={load} /> */}
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>
                  <span style={{fontSize:24}}>
                    Welcome to 7Search PPC
                  </span>
                </BlockTitle>
              <BlockDes className="text-dark">
                <p>Reach your right audience with 7Search PPC Advertising Network.</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon name="filter-alt" className="d-none d-sm-inline"></Icon>
                          <span>{days == 0 ? 'Today' : days+' Days'}</span>
                          <Icon name="chevron-right" className="dd-indc"></Icon>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setDays(0);
                                  adGraphData(0)
                                }}
                              > <span>Today</span>
                              {days === 0 && <Icon name="check" style={{position:'absolute', right:'10px', fontSize:'14px'}} />}
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setDays(7);
                                  adGraphData(7)
                                }}
                              >
                                <span>7 Days</span>
                                {days === 7 && <Icon name="check" style={{position:'absolute', right:'10px', fontSize:'14px'}} />}
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setDays(15)
                                  adGraphData(15)
                                }}
                              >
                                <span>15 Days</span>
                                {days === 15 && <Icon name="check" style={{position:'absolute', right:'10px', fontSize:'14px'}} />}
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setDays(30)
                                  adGraphData(30)
                                }}
                              >
                                <span>30 Days</span>
                                {days === 30 && <Icon name="check" style={{position:'absolute', right:'10px', fontSize:'14px'}} />}
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <Row className="g-gs">
            <Col lg="7" xxl="7">
              <PreviewAltCard className="h-100">
                {data !== null && <SalesOverview adGraph={data.graph} />}
              </PreviewAltCard>
            </Col>
            <Col md="5" xxl="5">
              <Card className="card-bordered h-100">
                {/* {data !== null && <CampData campData={data.topcamp} />} */}
                {data !== null && <CampData campData={cdata} />}
              </Card>
            </Col>
            <Col md="5" xxl="4">
              <PreviewAltCard className="h-100" bodyClass="h-100 stretch flex-column">
              {data !== null && <SessionDevice dvData={data.device} />}
              </PreviewAltCard>
            </Col>
            <Col md="6" xxl="4">
            <PreviewAltCard className="h-100" bodyClass="h-100 stretch flex-column">
              {data !== null && <SessionOs osData={data.os}/>}
              </PreviewAltCard>
            </Col>
            <Col md="6" xxl="4">
              <Card className="card-bordered h-100">
              {data !== null && <BrowserUser country={data.country} />}
              </Card>
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default InvestHomePage;
