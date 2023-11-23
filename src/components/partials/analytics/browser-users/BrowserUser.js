import React, { useEffect, useState } from "react";
import Icon from "../../../icon/Icon";
import Progress from "../../../progress/Progress";
import { browserUserData, browserUserDataSet2, browserUserDataSet3 } from "../../charts/analytics/AnalyticsData";
import { DropdownItem, UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { DataTableRow, DataTableHead, DataTableItem } from "../../../table/DataTable";

const BrowserUser = ({country}) => {

  const [browser, setBrowser] = useState("30");
  const [data, setData] = useState(browserUserData);

  useEffect(() => {
    let newData;
    if (browser === "7") {
      newData = browserUserDataSet2;
    } else if (browser === "15") {
      newData = browserUserDataSet3;
    } else {
      newData = browserUserData;
    }
    setData(newData);
  }, [browser]);
  
  return (
    <React.Fragment>
      <div className="card-inner mb-n2">
        <div className="card-title-group">
          <div className="card-title card-title-sm">
            <h6 className="title">Traffic by Country</h6>
          </div>
        </div>
      </div>

      <div className="nk-tb-list is-loose">
        <DataTableHead>
          <DataTableRow>
            <span>Country</span>
          </DataTableRow>
          {/* <DataTableRow className="text-right">
            <span>Users</span>
          </DataTableRow>
          <DataTableRow>
            <span>% Users</span>
          </DataTableRow> */}
          <DataTableRow className="tb-col-sm text-right">
            <span>Traffic</span>
          </DataTableRow>
        </DataTableHead>
        {country ? country.map((item) => {
          return (
            <DataTableItem key={item.id}>
              <DataTableRow>
                <div className="icon-text">
                  <Icon className={`text-${item.theme}`} name="globe"></Icon>
                  <span className="tb-lead">{item.country}</span>
                </div>
              </DataTableRow>
              {/* <DataTableRow className="text-right">
                <span className="tb-sub tb-amount">
                  <span>{item.users}</span>
                </span>
              </DataTableRow> */}
              {/* <DataTableRow>
                <Progress value={item.userPercentage} size="md" className="progress-alt bg-transparent" />
              </DataTableRow> */}
              <DataTableRow className="tb-col-sm text-right">
                <span className="tb-sub">{item.total}</span>
              </DataTableRow>
            </DataTableItem>
          );
        }) : ''}
      </div>
    </React.Fragment>
  );
};
export default BrowserUser;
