import React from "react";
import { useEffect } from "react";
import { DropdownItem, DropdownToggle, DropdownMenu, UncontrolledDropdown } from "reactstrap";
import { dashboardGraph } from "../../../../app/api";
import { Icon } from "../../../Component";
import { LineChart } from "../../charts/default/Charts";

const SalesOverview = ({adGraph}) => {

  return (
    <React.Fragment>
      <div className="card-title-group align-start gx-3 mb-4">
        <div className="card-title">
          <h6 className="title">Ads Overview</h6>
          <p>
            This section will display your ad performance.
            {/* <a
              href="#details"
              onClick={(ev) => {
                ev.preventDefault();
              }}
            >
              See Details
            </a> */} 
          </p>
        </div>
        {/* <div className="card-tools">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" color="transparent">
              <a
                href="#toggle"
                onClick={(ev) => ev.preventDefault()}
                className="btn btn-primary btn-dim d-none d-sm-inline-flex"
              >
                <Icon className="d-none d-sm-inline" name="download-cloud" />
                <span>
                  <span className="d-none d-md-inline">Download</span> Report
                </span>
              </a>
              <a
                href="#toggle"
                onClick={(ev) => ev.preventDefault()}
                className="btn btn-primary btn-icon btn-dim d-sm-none"
              >
                <Icon name="download-cloud" />
              </a>
            </DropdownToggle>
            <DropdownMenu right>
              <ul className="link-list-opt no-bdr">
                <li>
                  <DropdownItem
                    tag="a"
                    href="#dropdownitem"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    <span>Download Mini Version</span>
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem
                    tag="a"
                    href="#dropdownitem"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    <span>Download Full Version</span>
                  </DropdownItem>
                </li>
                <li className="divider"></li>
                <li>
                  <DropdownItem
                    tag="a"
                    href="#dropdownitem"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    <Icon name="opt-alt" />
                    <span>Options</span>
                  </DropdownItem>
                </li>
              </ul>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div> */}
      </div>
      <div className="analytic-data-group analytic-ov g-3">
          <div className="analytic-data analytic-ov-data">
            <div className="title">Clicks</div>
            <div className="amount" style={{color:'#798bff'}}>{adGraph ? adGraph.data.click : 0}</div>
            <div className="change up">
              {/* <Icon name="arrow-long-up"></Icon> {auOverview === "month-1" ? "12.31" : "5.21"}% */}
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Impressions</div>
            <div className="amount text-danger">{adGraph ? adGraph.data.impression : 0}</div>
            <div className="change up">
              {/* <Icon name="arrow-long-up"></Icon> {auOverview === "month-1" ? "47.5" : "80.6"}% */}
            </div>
          </div>
          {/* <div className="analytic-data analytic-ov-data">
            <div className="title">CONVERSIONS</div>
            <div className="amount re">0</div>
            <div className="change down">
            </div>
          </div> */}
          <div className="analytic-data analytic-ov-data">
            <div className="title">Cost</div>
            <div className="amount">${adGraph ? adGraph.data.amount : 0}</div>
            <div className="change down">
              {/* <Icon name="arrow-long-down"></Icon> {auOverview === "month-1" ? "12.57" : "18.21"}% */}
            </div>
          </div>
        </div>
      <div className="nk-sales-ck large pt-4">
        {adGraph ? 
        <LineChart graphData={adGraph} />
        : ''}
      </div> 
    </React.Fragment>
  );
}

export default SalesOverview;
