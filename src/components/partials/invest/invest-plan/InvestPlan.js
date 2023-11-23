import React, { useEffect, useState } from "react";
import Icon from "../../../icon/Icon";
import { Progress, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";
import { PreviewAltCard } from "../../../preview/Preview";
import { PurchasePlanChart } from "../../charts/invest/InvestChart";
import { investData, investDataSet2, investDataSet3, investDataSet4 } from "./InvestData";

const InvestPlan = ({osData}) => {
  

  return (
    <PreviewAltCard className="card-full" bodyClass="d-flex flex-column h-100">
      <div className="card-title-group mb-3">
        <div className="card-title">
          <h6 className="title">Traffic by OS</h6>
          {/* <p>In last {planSet === "7" ? "7" : planSet === "15" ? "15" : "30"} days top invested schemes.</p> */}
        </div>
      </div>
      <div className="progress-list gy-3">
        
            <div className="progress-wrap">
              <div className="progress-text">
                <div className="progress-label">Windows</div>
                <div className="progress-amount">{osData.windows.percent}%</div>
              </div>
              <Progress className="progress-md" value={osData.windows.percent} color="primary"></Progress>
            </div>
          
            <div className="progress-wrap">
              <div className="progress-text">
                <div className="progress-label">Apple</div>
                <div className="progress-amount">{osData.apple.percent}%</div>
              </div>
              <Progress className="progress-md" value={osData.apple.percent} color="danger"></Progress>
            </div>

            <div className="progress-wrap" >
              <div className="progress-text">
                <div className="progress-label">Android</div>
                <div className="progress-amount">{osData.android.percent}%</div>
              </div>
              <Progress className="progress-md" value={osData.android.percent} color="success"></Progress>
            </div>
      </div>
    </PreviewAltCard>
  );
};
export default InvestPlan;
