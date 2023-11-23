import React, { useState } from "react";
import { SessionDoughnut } from "../../charts/analytics/AnalyticsCharts";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { Icon } from "../../../Component";

const SessionDevice = ({dvData}) => {
  const [sessionDevice, setSessionDevices] = useState("30");
  const des = dvData ? parseFloat(dvData.desktop.percent) : 0;
  const mob = dvData ? parseFloat(dvData.mobile.percent) : 0;
  const tab = dvData ? parseFloat(dvData.tablet.percent) : 0;

  return (
    <React.Fragment>
      <div className="card-title-group">
        <div className="card-title card-title-sm">
          <h6 className="title">Traffic by Devices</h6>
        </div>
      </div>
      <div className="device-status my-auto">
        <div className="device-status-ck">
          {dvData ? 
          <SessionDoughnut className="analytics-doughnut" state={dvData} />
          : ''}
        </div>
        <div className="device-status-group">
          <div className="device-status-data text-center">
            <Icon style={{ color: "#EB2F48" }} name="monitor"></Icon>
            <div className="title">Desktop</div>
            <div className="amount"> {des}%</div>
            <div className="change up text-danger">
              {/* <Icon name="arrow-long-up"></Icon> */}
              {/* {sessionDevice === "7" ? "2.5" : sessionDevice === "15" ? "4.5" : "10.5"}% */}
            </div>
          </div>
          <div className="device-status-data text-center">
            <Icon style={{ color: "#ff6e00" }} name="mobile"></Icon>
            <div className="title">Mobile</div>
            <div className="amount"> {mob}%</div>
            <div className="change up text-danger">
              {/* <Icon name="arrow-long-up"></Icon> */}
              {/* {sessionDevice === "7" ? "12.5" : sessionDevice === "15" ? "114.5" : "110.5"}% */}
            </div>
          </div>
          <div className="device-status-data text-center">
            <Icon style={{ color: "#FEC30D" }} name="tablet"></Icon>
            <div className="title">Tablet</div>
            <div className="amount"> {tab}%</div>
            <div className="change up text-danger">
              {/* <Icon name="arrow-long-up"></Icon> */}
              {/* {sessionDevice === "7" ? "25.5" : sessionDevice === "15" ? "14.5" : "15.5"}% */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SessionDevice;
