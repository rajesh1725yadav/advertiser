import React, { useState } from "react";
import { SessionDoughnut, SessionOsDoughnut } from "../../charts/analytics/AnalyticsCharts";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { Icon } from "../../../Component";

const SessionOs = ({osData}) => {
  const [sessionDevice, setSessionDevices] = useState("30");
  const win = osData ? parseFloat(osData.windows.percent) : 0;
  const apl = osData ? parseFloat(osData.apple.percent) : 0;
  const lnx = osData ? parseFloat(osData.linux.percent) : 0;
  const and = osData ? parseFloat(osData.android.percent) : 0;
  return (
    <React.Fragment>
      <div className="card-title-group">
        <div className="card-title card-title-sm">
          <h6 className="title">Traffic by Operating System</h6>
        </div>
      </div>
      <div className="device-status my-auto">
        <div className="device-status-ck">
          {osData ?
          <SessionOsDoughnut className="analytics-doughnut" state={osData} />
          : ''
          }
        </div>
        <div className="device-status-group" style={{width:380}}>
          <div className="device-status-data text-center">
            <Icon style={{ color: "#0377D0" }} name="windows"></Icon>
            <div className="title">Windows</div>
            <div className="amount"> {win ? win : 0}%</div>
            <div className="change up text-danger">
              {/* <Icon name="arrow-long-up"></Icon> */}
              {/* {sessionDevice === "7" ? "2.5" : sessionDevice === "15" ? "4.5" : "10.5"}% */}
            </div>
          </div>
          <div className="device-status-data text-center">
            <Icon style={{ color: "#000000" }} name="apple"></Icon>
            <div className="title">Apple</div>
            <div className="amount"> {apl ? apl : 0}%</div>
            <div className="change up text-danger">
              {/* <Icon name="arrow-long-up"></Icon> */}
              {/* {sessionDevice === "7" ? "12.5" : sessionDevice === "15" ? "114.5" : "110.5"}% */}
            </div>
          </div>
          <div className="device-status-data text-center">
            <Icon style={{ color: "#8f9aaa" }} name="linux"></Icon>
            <div className="title">Linux</div>
            <div className="amount"> {lnx ? lnx : 0}%</div>
            <div className="change up text-danger">
              {/* <Icon name="arrow-long-up"></Icon> */}
              {/* {sessionDevice === "7" ? "12.5" : sessionDevice === "15" ? "114.5" : "110.5"}% */}
            </div>
          </div>
          <div className="device-status-data text-center">
            <Icon style={{ color: "#3BD482" }} name="android"></Icon>
            <div className="title">Android</div>
            <div className="amount"> {and ? and : 0}%</div>
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
export default SessionOs;
