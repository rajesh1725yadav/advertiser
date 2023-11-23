import React, { useEffect, useState } from "react";
// import Progress from "../../../progress/Progress";

// import { browserUserData } from '../../components/charts/analytics/AnalyticsData'

// import { browserUserData, browserUserDataSet2, browserUserDataSet3 } from "../../charts/analytics/AnalyticsData";
import {  DropdownItem, UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { topCampList } from "../../app/api";
// import { DataTableRow, DataTableHead, DataTableItem } from "../../../table/DataTable";
import { DataTableRow, DataTableHead, DataTableItem, Icon, Progress } from "../../components/Component";


const CampData = ({campData}) => {


  // const browserUserData = (campData) ? campData : [];

  // const [cdata, setCdata] = useState(browserUserData);

  return (
    <React.Fragment>
      <div className="card-inner mb-n2">
        <div className="card-title-group">
          <div className="card-title card-title-sm">
            <h6 className="title">Top 5 Campaigns</h6>
          </div>
        </div>
      </div>

      <div className="nk-tb-list is-loose">
        <DataTableHead>
          <DataTableRow>
            <span>Campaigns</span>
          </DataTableRow>
          <DataTableRow className="text-center">
            <span>Clicks</span>
          </DataTableRow>
          <DataTableRow className="text-center">
            <span>Impressions</span>
          </DataTableRow>
          {/* <DataTableRow>
            <span>Impr</span>
          </DataTableRow> */}
          <DataTableRow className="tb-col-sm text-right">
            <span>Cost</span>
          </DataTableRow>
        </DataTableHead>
        {campData.length ? campData.map((item, key) => {
          return (
            <DataTableItem key={key}>
              <DataTableRow>
                <div className="icon-text">
                  {/* <Icon className={`text-${item.theme}`} name="globe"></Icon> */}
                  <span className="tb-lead">{item.campaign_name}</span>
                </div>
                  <small className="tb-lead text-primary">{item.campaign_id}</small>
              </DataTableRow>
              <DataTableRow className="text-center">
                <span className="tb-sub tb-amount">
                  <span>{item.totalclick}</span>
                </span>
              </DataTableRow>
              <DataTableRow className="text-center">
                <span className="tb-sub tb-amount">
                  <span>{item.totalimp}</span>
                </span>
              </DataTableRow>
              {/* <DataTableRow>
                <Progress value={10} size="md" className="progress-alt bg-transparent" />
              </DataTableRow> */}
              <DataTableRow className="tb-col-sm text-right">
                <span className="tb-sub">{(parseFloat(item.impamt) + parseFloat(item.clickamt)).toFixed(2)}</span>
              </DataTableRow>
            </DataTableItem>
          );
        }) : ''}
      </div>
    </React.Fragment>
  );
};
export default CampData;
