import React, { useState, useEffect, useContext } from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import { FormGroup, Label, Input, Row, Col, Card, CardHeader, CardBody, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Tooltip } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  CodeBlock,
  OverlineTitle,
  OutlinedInput,
  Icon,
  Button,
  BlockBetween,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem
} from "../components/Component";
import { getReportData, getUserCampIdData } from "../app/api";
import { Link } from "react-router-dom";
import Loader from "../app/Loader";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker"
import { JsonToExcel } from "react-json-to-excel";
import exportFromJSON from "export-from-json";
import Moment from "react-moment";
import AppContext from "../context/AppContext";

export default function Report() {

  const [sm, updateSm] = useState(false);
  const [adtype, setAdtype] = useState('');
  const [adtp, setAdtp] = useState('');
  const [loading, setLoading] = useState(false);

  const [camps, setCamps] = useState(null);

  const [totals, setTotals] = useState(null);
  const [repType, setRepType] = useState('Campaign');
  const [cmpId, setCampId] = useState('');

  const [rangeDate, setRangeDate] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 7)),
    end: new Date()
    // start: new Date(),
    // end: new Date(new Date().setDate(new Date().getDate() + 7))
  });

  const [data, setData] = useState(null);

  const ctx = useContext(AppContext);
  const getCampReport = async (rtype = '', start, end) => {
    setLoading(true)
    //   console.log(getDate(rangeDate.start));
    let date_to = start ? getDate(start) : getDate(rangeDate.start);
    let date_from = end ? getDate(end) : getDate(rangeDate.end);
    console.log(rangeDate.end)
    if (!rangeDate.end) {
      setRangeDate({ ...rangeDate, end: new Date() });
    }
    let uid = localStorage.getItem('uid');

    let res = await getReportData({
      uid: uid,
      from_date: date_from,
      to_date: date_to,
      camp_id: cmpId ? cmpId : 'All',
      ad_type: adtp ? adtp : '',
      rep_type: (rtype.length) ? rtype : repType,
      lim: 20,
      page: 1
    });
    if (res) {
      console.log(res);
      setData(res.data);
      setTotals(res.total);
    }

    ctx.dispatch({
      type: 'wlt',
      wlt: res.wallet,

    });
    setLoading(false)
  }

  const onRangeChange = (dates) => {
    const [start, end] = dates;
    setRangeDate({ start: start, end: end });
    // getCampReport(start, end);
  };

  const getDate = (ndate) => {
    let newDate = (ndate) ? ndate : new Date();
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const d = newDate.getDate();

    return `${year}-${month.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
  }

  const onReportSearch = async () => {
    getCampReport();
  }

  const onAdtypeChange = async (text, val) => {

    setAdtype(text);
    setAdtp(val);

    let uid = localStorage.getItem('uid');
    let res = await getUserCampIdData({
      ad_type: val,
      uid: uid
    });

    setCamps(res.data);
    // console.log(res.data);
  }

  const exportExcel = () => {

    const fileName = 'report';
    const exportType = exportFromJSON.types.xls
    console.log(data)
    exportFromJSON({ data, fileName, exportType })
  }

  const [tooltipOpen5, setOpen5] = useState(false);
  const toggle5 = () => { setOpen5(!tooltipOpen5) };

  useEffect(() => {
    getCampReport();
  }, []);

  return (
    <React.Fragment>
      <Head title="Statistics"></Head>
      <Content>
        {/* <Loader visible={loading} /> */}
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page> Statistics</BlockTitle>
              <BlockDes className="text-soft">All campaign's statistics</BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>

                  <ul className="nk-block-tools g-3">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon name="filter-alt" className="d-none d-sm-inline"></Icon>
                          <span>Report By {repType}</span>
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
                                  setRepType('Campaign')
                                  getCampReport('Campaign');
                                }}
                              >
                                <span>Campaign</span>
                                {repType === 'Campaign' && <Icon name="check" style={{ position: 'absolute', right: '10px', fontSize: '14px' }} />}
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setRepType('Account')
                                  getCampReport('Account')
                                }}
                              >
                                <span>Account</span>
                                {repType === 'Account' && <Icon name="check" style={{ position: 'absolute', right: '10px', fontSize: '14px' }} />}
                              </DropdownItem>
                            </li>


                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon name="filter-alt" className="d-none d-sm-inline"></Icon>
                          <span>Filtered By {adtype}</span>
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
                                  // setAdtype('');
                                  // setAdtp('');
                                  onAdtypeChange('', '');
                                }}
                              > <span>All Ads</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  onAdtypeChange('Text Ads', 'text');
                                }}
                              >
                                <span>Text Ads</span>
                                {adtype === 'Text Ads' && <Icon name="check" style={{ position: 'absolute', right: '10px', fontSize: '14px' }} />}
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  onAdtypeChange('Banner Ads', 'banner');
                                  // setAdtype('Banner Ads')
                                  // setAdtp('banner');
                                }}
                              >
                                <span>Banner Ads</span>
                                {adtype === 'Banner Ads' && <Icon name="check" style={{ position: 'absolute', right: '10px', fontSize: '14px' }} />}
                              </DropdownItem>
                            </li>
                            {/* <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  onAdtypeChange('Video Ads', 'video');
                                }}
                              >
                                <span>Video Ads</span>
                                {adtype === 'Video Ads' && <Icon name="check" style={{position:'absolute', right:'10px', fontSize:'14px'}} />}
                              </DropdownItem>
                            </li> */}
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  onAdtypeChange('Social Ads', 'social');
                                  // setAdtype('Social Ads');
                                  // setAdtp('social');
                                }}
                              >
                                <span>Socialbar Ads</span>
                                {adtype === 'Social Ads' && <Icon name="check" style={{ position: 'absolute', right: '10px', fontSize: '14px' }} />}
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  onAdtypeChange('Native Ads', 'native');
                                  // setAdtype('Native Ads')
                                  // setAdtp('native');
                                }}
                              >
                                <span>Native Ads </span>
                                {adtype === 'Native Ads' && <Icon name="check" style={{ position: 'absolute', right: '10px', fontSize: '14px' }} />}
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  onAdtypeChange('Popunder Ads', 'popup');
                                  // setAdtype('Popunder Ads')
                                  // setAdtp('popunder');
                                }}
                              >
                                <span>Popunder Ads</span>
                                {adtype === 'Popunder Ads' && <Icon name="check" style={{ position: 'absolute', right: '10px', fontSize: '14px' }} />}
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    {adtype.length ?
                      <li>
                        <UncontrolledDropdown>
                          <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                            <Icon name="filter-alt" className="d-none d-sm-inline"></Icon>
                            <span>Campaign By {cmpId && '#' + cmpId}</span>
                            <Icon name="chevron-right" className="dd-indc"></Icon>
                          </DropdownToggle>
                          <DropdownMenu right>
                            <ul className="link-list-opt no-bdr" style={{ overflowY: 'scroll', minHeight: 400, maxHeight: 600 }}>
                              <li key={1203}>
                                <DropdownItem
                                  tag="a"
                                  href="#dropdownitem"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    setCampId('');
                                  }}
                                >
                                  <span>All</span>
                                  {/* {repType === 'Account' && <Icon name="check" style={{position:'absolute', right:'10px', fontSize:'14px'}} />} */}
                                </DropdownItem>
                              </li>
                              {camps ?
                                camps.map((item, key) => {
                                  return (<li key={key}>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdownitem"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        setCampId(item.campaign_id);
                                      }}
                                    >
                                      <div>
                                        <span>{item.campaign_name}</span>
                                        <br />
                                        <small style={{ color: "#8094AE" }}>#{item.campaign_id}</small>

                                      </div>
                                      {/* {repType === 'Account' && <Icon name="check" style={{position:'absolute', right:'10px', fontSize:'14px'}} />} */}
                                    </DropdownItem>
                                  </li>)
                                })
                                : ''}
                            </ul>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </li>
                      : ''
                    }
                    <li>
                      <div style={{ position: 'relative' }}>

                        <DatePicker
                          selected={rangeDate.start}
                          startDate={rangeDate.start}
                          onChange={onRangeChange}
                          endDate={rangeDate.end}
                          selectsRange
                          className="form-control date-picker"
                          dateFormat='dd-M-yyyy'
                          maxDate={new Date()}
                        />
                      </div>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary" onClick={onReportSearch}>
                        <Icon name="search"></Icon>
                        <span>Search</span>
                      </Button>
                      &nbsp;
                      <Button color="secondary" onClick={exportExcel}>
                        <Icon name="download"></Icon>
                        {/* <span>Search</span> */}
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <DataTable className="card-stretch custom-stats">
            <DataTableBody>
              <DataTableHead className="nk-tb-item nk-tb-head">
                {/* <DataTableRow className="nk-tb-col-check">
                  <div className="custom-control custom-control-sm custom-checkbox notext">
                  <label className="custom-control-label" htmlFor="pid-all"></label>
                  </div>
                </DataTableRow> */}
                <DataTableRow>
                  <span className="sub-text"><b>Date</b></span>
                </DataTableRow>
                {repType == 'Campaign' && <DataTableRow size="lg">
                  <span className="sub-text"><b>Campaigns ID</b></span>
                </DataTableRow>}
                <DataTableRow size="lg">
                  <span className="sub-text"><b>Impressions</b> <Icon name="info-fill" id="impHd" className="text-white mt-2" /></span>
                  <Tooltip placement="auto" isOpen={tooltipOpen5} target="impHd" toggle={toggle5}>Impression is counted every time your ad is shown and for popunder ads format it means the ads is also clicked</Tooltip>
                </DataTableRow>
                <DataTableRow size="lg">
                  <span className="sub-text"><b>Clicks</b></span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className="sub-text"><b>CTR</b></span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className="sub-text"><b>Avg. CPC/CPM</b></span>
                </DataTableRow>
                <DataTableRow className="text-right">
                  <span className="sub-text"><b>Cost</b></span>
                </DataTableRow>
                {/* <DataTableRow size="md text-right">
                  <span className="sub-text">Conversion</span>
                </DataTableRow> */}
                {/* <DataTableRow >
                  <span className="sub-text">Status</span>
                </DataTableRow>
                <DataTableRow className="nk-tb-col-tools text-right">
                  <UncontrolledDropdown>
                    <DropdownToggle tag="a" className="btn btn-xs btn-trigger btn-icon dropdown-toggle mr-n1">
                      <Icon name="more-h"></Icon>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <ul className="link-list-opt no-bdr">
                        <li onClick={() => updateAllRows('active')}>
                          <DropdownItem
                            tag="a"
                            href="#markasdone"
                            onClick={(ev) => {
                              ev.preventDefault();
                            }}
                          >
                            <Icon name="play"></Icon>
                            <span>Active All</span>
                          </DropdownItem>
                        </li>
                        <li onClick={() => updateAllRows('pause')}>
                          <DropdownItem
                            tag="a"
                            href="#markasdone"
                            onClick={(ev) => {
                              ev.preventDefault();
                            }}
                          >
                            <Icon name="pause"></Icon>
                            <span>Pause All</span>
                          </DropdownItem>
                        </li>
                        <li onClick={() => updateAllRows('delete')}>
                          <DropdownItem
                            tag="a"
                            href="#remove"
                            onClick={(ev) => {
                              ev.preventDefault();
                            }}
                          >
                            <Icon name="trash"></Icon>
                            <span>Delete All </span>
                          </DropdownItem>
                        </li>
                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </DataTableRow> */}
              </DataTableHead>
              {data
                ? data.map((item, key) => {
                  // var days = setDeadlineDays(item.deadline);
                  // let chkSts = (chk.indexOf(item.campaign_id) >= 0) ? true : false;

                  return (
                    <DataTableItem key={key} className="custom-strip">
                      <DataTableRow className="sm">
                        <span >
                          <Moment format="DD MMM YYYY">
                            {item.Created}
                          </Moment>
                        </span>
                        <br />
                        <small className="d-none d-xs-block">
                          Click : {item.Clicks}
                          &nbsp; | &nbsp;
                          Impr : {item.Imprs}
                        </small>
                      </DataTableRow>
                      {repType == 'Campaign' && <DataTableRow size="lg">
                        <span>{item.CampaignId ? item.CampaignId : '--'}</span>
                      </DataTableRow>}
                      <DataTableRow size="lg">
                        <span>{item.Imprs}</span>
                      </DataTableRow>
                      <DataTableRow size="lg">
                        <span>{item.Clicks}</span>
                      </DataTableRow>
                      <DataTableRow size="lg">
                        <span>{item.CTR.toFixed(1)}%</span>
                      </DataTableRow>
                      <DataTableRow size="lg">
                        <span>{item.AvgCPC.toFixed(4)}</span>
                      </DataTableRow>
                      <DataTableRow className="text-right" >
                        <span >${item.Total.toFixed(4)}</span>
                      </DataTableRow>
                      {/* <DataTableRow size="lg" className="text-right">
                          <span>{item.click}</span>
                        </DataTableRow> */}


                    </DataTableItem>
                  );
                })
                : null}
              {totals ?
                <DataTableItem key={0} className="f-table">
                  <DataTableRow className="sm">
                    <span className="tb-amount">Total</span>
                  </DataTableRow>
                  {repType == 'Campaign' && <DataTableRow size="lg">
                    <span>{'--'}</span>
                  </DataTableRow>}
                  <DataTableRow size="lg">
                    <span className="tb-amount">{totals.total_impression}</span>
                  </DataTableRow>
                  <DataTableRow size="lg">
                    <span className="tb-amount">{totals.total_click}</span>
                  </DataTableRow>
                  <DataTableRow size="lg">
                    <span className="tb-amount">{totals.total_ctr.toFixed(1)}%</span>
                  </DataTableRow>
                  <DataTableRow size="lg">
                    <span className="tb-amount">{totals.total_avgcpc.toFixed(4)}</span>
                  </DataTableRow>
                  <DataTableRow className="text-right" >
                    <span className="tb-amount">${totals.total_amount.toFixed(4)}</span>
                  </DataTableRow>
                  {/* <DataTableRow size="lg" className="text-right">
                          <span className="tb-amount">0</span>
                        </DataTableRow> */}


                </DataTableItem>
                : ''}
              {/* <div className="card-inner text-center">
                          <span>No record found !</span>
                        </div> */}
            </DataTableBody>
            {!data && 
            <div className="card-inner text-center">
              <span>No record found !</span>
            </div>
            }
            {/* <div className="card-inner">
              {data.length > 0 ? (
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={pgs}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">No campaign found</span>
                </div>
              )}
            </div> */}
          </DataTable>
        </Block>


        <ToastContainer />
      </Content>
    </React.Fragment>
  )
}