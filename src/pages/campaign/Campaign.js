import React, { useState, useEffect, useContext } from "react";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import DatePicker from "react-datepicker";
import swal from 'sweetalert2'
import classnames from "classnames";
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownItem,
  Badge,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  NavLink,
  Table,
  Tooltip
} from "reactstrap";
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Icon,
  Button,
  Col,
  UserAvatar,
  PaginationComponent,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  RSelect,
} from "../../components/Component";
import { projectData, teamList } from "./ProjectData";
import { findUpper, setDeadline, setDeadlineDays, calcPercentage } from "../../utils/Utils";
import { useForm } from "react-hook-form";
import { Link , Redirect, useHistory} from "react-router-dom";
import { CampaignList, createDuplicateCampaign, deleteCampaign, getCampaignInfo, updateAllCampaign, updateCampaignStatus } from "../../app/api";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../app/Loader";
import CopyLoader from "../../app/CopyLoader";
import AppContext from "../../context/AppContext";


export const Campaign = () => {
  const ctx = useContext(AppContext);
  let history = useHistory();
  const showToast = (type) => {

    if(type == 1) {
      toast.success("Campaign Deleted Successfully", {
        position: "top-right",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        // closeButton: <CloseButton />,
      });
    } else {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
      });
      
    }
  };

  const [sm, updateSm] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [cload, setCload] = useState(false);

  const [data, setData] = useState({});
  const [cinfo, setCinfo] = useState({});
  const [img, setImg] = useState({});

  const [cls, setCls] = useState('danger');
  const [pgs, setPgs] = useState(0);
  
  // const [spg, setSpg] = useState(20);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  
  const [adtype, setAdtype] = useState('');
  const [adStatus, setAdStatus] = useState('');

  const [chk, setChk] = useState([]);
  const [chkAll, setChkAll] = useState(false);

  const [activeTab, setActiveTab] = useState("1");
  const [modalTab, setModalTab] = useState(false);
  const toggleTab = () => setModalTab(!modalTab);
  
  const setCheckBox = (val) => {
    
    let data = [];
    let cid = 0;
    chk.map((item) => {
      if(item === val) {
        cid = 1;
      }
      data.push(item);
    });

    if(cid === 0) {
      data.push(val);
    }

    setChk(data);
    // console.log(data);

  }
   
  const unsetCheckBox = (val) => { 
    let data = chk.filter(item => item !== val)
    setChk(data);
    setChkAll(false)
  }
   
  const updateAllRows = async (type) => {
    if(chk.length > 0) {
      setLoading(true);
      let uid = localStorage.getItem('uid');
      let res = await updateAllCampaign({
        uid:uid,
        type:type,
        cid : chk,
      });
      setLoading(false);
      let adt = getAdType();
      let sts = getAdStatus();
      getCampData(adt, sts, skey, currentPage, itemPerPage);

    } else {

      toast.error("Please select a campaign!", {
        position: "top-right",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
      });
      
    }
  }


  const getAdType = () => {
    let adt = '';
    if(adtype == 'Text Ads') {
      adt = 'text';
    } else if(adtype == 'Banner Ads') {
      adt = 'banner';
    } else if(adtype == 'Video Ads') {
      adt = 'video';
    } else if(adtype == 'Social Ads') {
      adt = 'social';
    } else if(adtype == 'Native Ads') {
      adt = 'native';
    } else if(adtype == 'Popunder Ads') {
      adt = 'popup';
    }
    return adt;
  }

  const getAdStatus = () => {
    let adt = '';
    if(adStatus == 'In Review') {
      adt = 1;
    } else if(adStatus == 'Active') {
      adt = 2;
    } else if(adStatus == 'Inactive') {
      adt = 3;
    } else if(adStatus == 'Paused') {
      adt = 4;
    } else if(adStatus == 'Suspended') {
      adt = 6;
    }
    return adt;
  }
  // Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if(currentPage !== pageNumber) {
      let adt = getAdType();
      let sts = getAdStatus()
      getCampData(adt, sts, skey, pageNumber)
    }
  }

  const { errors, register, handleSubmit } = useForm();

  const getCampData = async (type = '', sts = '', src='', pg=1, lim=0) => {
    
    setLoading(true)

    let stat = (sts > 0) ? sts : (sts == 0) ? '' : getAdStatus(sts);
    let itemLim = (lim > 0) ? lim : itemPerPage;
    // let src2 = (skey) ? skey : src;
    const res = await CampaignList(type, stat, src, pg, itemLim);
    if(res.data) {
      setData(res.data)
      setPgs(res.row)
      ctx.dispatch({
        type:'wlt',
        wlt: res.wallet
      });
      // console.log(res);
    } 
    setLoading(false)

  }

  const delCamp = async (cid) => {
    setLoading(true)
    let uid = localStorage.getItem('uid');
    let res = await deleteCampaign(uid, cid);
    if(res.code === 200) {
      showToast(1)
      getCampData();
    } else {
      showToast(2);
    }
    setLoading(false)
  }


  const updateCampg = async (cid,sts) => {
    
    setLoading(true);
    let uid = localStorage.getItem('uid');
    let res = await updateCampaignStatus(uid,cid,sts);
    if(res.code === 200) {
      let adt = getAdType();
      let sts = getAdStatus()
      getCampData(adt, sts, skey, currentPage, itemPerPage);
    }
    setLoading(false);

  }

  const copyCampaign = async (cid) => {
    setCload(true);
    let uid = localStorage.getItem('uid');
    let res = await createDuplicateCampaign({
      uid:uid,
      cid:cid
    });
    if(res.code === 200) {
      ctx.dispatch({
        type:'copy',
        cmp_copy:1
      });
      // let adt = getAdType();
      // getCampData(adt, currentPage, itemPerPage);
      history.push(`${process.env.PUBLIC_URL}/update-campaign/`+res.adtype+'/'+res.camp_id);
      // history.push(`${process.env.PUBLIC_URL}/update-campaign/text/CMPT63B3F54BBD467`);
    }

  }

  const getCampInfo = async (cid) => {
    
    setActiveTab("1");
    setLoading(true)
    let uid = localStorage.getItem('uid');
    let res = await getCampaignInfo(uid, cid);
    
    if(res.data)  {
      setCinfo(res.data);

      if(res.images) {
        setImg(res.images);
      } else {
        setImg({})
      }
      toggleTab()
    }

    setLoading(false)

    // console.log(cinfo.images);
  }
    
  const [skey, setSkey] = useState('');

  const onCampSearch = (e) => {
    let src = e.target.value;
    // console.log(src)
    setSkey(src);
    if(src.length > 4) {
      let adt = getAdType();
      let sts = getAdStatus();
      getCampData(adt, sts, src);
    } else {
      getCampData();
    }
  }

  const [tooltipOpen5 , setOpen5] = useState(false);
  const toggle5 = () => { setOpen5(!tooltipOpen5) };

  useEffect(()=> {
    ctx.dispatch({
      type:'copy',
      cmp_copy:0
    });
    getCampData();
  },[]);

  return (
    <>
    <React.Fragment>
      <Head title="My Campaign"></Head>
      <Content>
      {/* <Loader visible={loading} /> */}
      <CopyLoader visible={cload} />
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page> Campaigns</BlockTitle>
              <BlockDes className="text-soft">You have total {pgs} campaigns</BlockDes>
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
                  <ul className="nk-block-tools g-3 d-block d-md-flex">
                  <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          placeholder="Search by Campaign ID"
                          onChange={(e) => onCampSearch(e)}
                        />
                      </div>
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
                                  getCampData('', adStatus, skey)
                                  setAdtype('')
                                }}
                              > <span>All</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  getCampData('text', adStatus, skey)
                                  setAdtype('Text Ads')
                                }}
                              >
                                <span>Text Ads</span>
                                {adtype === 'Text Ads' && <Icon name="check" style={{position:'absolute', right:'10px', fontSize:'14px'}} />}
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  getCampData('banner', adStatus, skey)
                                  setAdtype('Banner Ads')
                                }}
                              >
                                <span>Banner Ads</span>
                                {adtype === 'Banner Ads' && <Icon name="check" style={{position:'absolute', right:'10px', fontSize:'14px'}} />}
                              </DropdownItem>
                            </li>
                            {/* <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  getCampData('video', adStatus)
                                  setAdtype('Video Ads')
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
                                  getCampData('social', adStatus, skey)
                                  setAdtype('Socialbar Ads')
                                }}
                              >
                                <span>Socialbar Ads</span>
                                {adtype === 'Socialbar Ads' && <Icon name="check" style={{position:'absolute', right:'10px', fontSize:'14px'}} />}
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  getCampData('native', adStatus, skey)
                                  setAdtype('Native Ads')
                                }}
                              >
                              <span>Native Ads </span>
                              {adtype === 'Native Ads' && <Icon name="check" style={{position:'absolute', right:'10px', fontSize:'14px'}} />}
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  getCampData('popup', adStatus, skey)
                                  setAdtype('Popunder Ads')
                                }}
                              >
                                <span>Popunder Ads</span>
                                {adtype === 'Popunder Ads' && <Icon name="check" style={{position:'absolute', right:'10px', fontSize:'14px'}} />}
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
                          <span>Status By {adStatus}</span>
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
                                  let adt = getAdType();
                                  getCampData(adt, 0, skey)
                                  setAdStatus('')
                                }}
                              > <span>All</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  let adt = getAdType();
                                  getCampData(adt, 1, skey)
                                  setAdStatus('In Review')
                                }}
                              >
                                <span>In Review</span>
                                {adStatus === 'In Review' && <Icon name="check" style={{position:'absolute', right:'10px', fontSize:'14px'}} />}
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  let adt = getAdType();
                                  getCampData(adt, 2, skey)
                                  setAdStatus('Active')
                                }}
                              >
                                <span>Active</span>
                                {adStatus === 'Active' && <Icon name="check" style={{position:'absolute', right:'10px', fontSize:'14px'}} />}
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  let adt = getAdType();
                                  getCampData(adt,3, skey)
                                  setAdStatus('Inactive')
                                }}
                              >
                                <span>Inactive</span>
                                {adStatus === 'Inactive' && <Icon name="check" style={{position:'absolute', right:'10px', fontSize:'14px'}} />}
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  let adt = getAdType();
                                  getCampData(adt, 4, skey)
                                  setAdStatus('Paused')
                                }}
                              >
                                <span>Paused</span>
                                {adStatus === 'Paused' && <Icon name="check" style={{position:'absolute', right:'10px', fontSize:'14px'}} />}
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  let adt = getAdType();
                                  getCampData(adt, 6,skey)
                                  setAdStatus('Suspended')
                                }}
                              >
                              <span>Suspended </span>
                              {(adStatus === 'Suspended') && <Icon name="check" style={{position:'absolute', right:'10px', fontSize:'14px'}} />}
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Link to={`${process.env.PUBLIC_URL+'/create-campaign'}`}>
                      <Button color="primary">
                        <Icon name="plus"></Icon>
                        <span>New Campaign</span>
                      </Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <DataTable className="card-stretch">
            <DataTableBody className="custom-stats">
              <DataTableHead className="nk-tb-item nk-tb-head">
                <DataTableRow className="nk-tb-col-check">
                  <div className="custom-control custom-control-sm custom-checkbox notext">
                    <input
                      type="checkbox"
                      className="custom-control-input form-control"
                      id="pid-all"
                      checked={chkAll} 
                      onChange={(e) => 
                        {
                          let cdt = [];
                          if(e.target.checked === true) {
                            data.map((item) => {
                              // console.log(item.campaign_id);
                              cdt.push(item.campaign_id);
                            });
                            setChk(cdt);
                            // setChkAll(true)
                          } else {
                            setChk([])
                            // setChkAll(false)
                          }
                          setChkAll(!chkAll)
                        }
                      }
                    />
                    <label className="custom-control-label" htmlFor="pid-all"></label>
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Campaigns Name</span>
                </DataTableRow>
                <DataTableRow size="lg">
                  <span className="sub-text">Category</span>
                </DataTableRow>
                <DataTableRow size="lg">
                  <span className="sub-text" >Impressions <Icon name="info-fill" id="impHd" className="text-white mt-2" /></span>
                   <Tooltip placement="auto" isOpen={tooltipOpen5} target="impHd" toggle={toggle5}>Impression is counted every time your ad is shown and for popunder ads format it means the ads is also clicked</Tooltip>
                </DataTableRow>
                <DataTableRow size="lg">
                  <span className="sub-text">Clicks</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className="sub-text">Daily Budget</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className="sub-text">Ad Type</span>
                </DataTableRow>
                <DataTableRow >
                  <span className="sub-text">Status</span>
                </DataTableRow>
                <DataTableRow >
                  <span className="sub-text">Created</span>
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
                </DataTableRow>
              </DataTableHead>
              {data.length > 0
                ? data.map((item) => {
                    // var days = setDeadlineDays(item.deadline);
                    let chkSts = (chk.indexOf(item.campaign_id) >= 0) ? true : false;
                    
                    return (
                      <DataTableItem key={item.campaign_id}>
                        <DataTableRow className="nk-tb-col-check">
                          <div className="custom-control custom-control-sm custom-checkbox notext">
                            <input
                              type="checkbox"
                              className="custom-control-input form-control"
                              defaultChecked={chkSts}
                              id={item.campaign_id + "pid-all"}
                              key={Math.random()}
                              onChange={(e) => {
                                if(e.target.checked === true) {
                                  setCheckBox(item.campaign_id);
                                } else {
                                  unsetCheckBox(item.campaign_id);
                                }
                                  // onSelectChange(e, item.campaign_id)
                                }
                              }
                            />
                            <label className="custom-control-label" htmlFor={item.campaign_id + "pid-all"}></label>
                          </div>
                        </DataTableRow>
                        <DataTableRow>
                          {/* <a
                            href="#title"
                            onClick={(ev) => {
                              ev.preventDefault();
                            }}
                            className="project-title"
                          >
                            <UserAvatar className="sq" theme={item.avatarClass} text={findUpper(item.title)} />
                          </a> */}
                            {/* <div className="project-info">
                              <h6 className="title">{item.campaign_name}</h6>
                              <span>#{item.campaign_id}</span>
                            </div> */}
                            <div className="user-info" onClick={() =>{
                              getCampInfo(item.campaign_id)
                            }}>
                              <a href="#" className="tb-lead text-primary">
                                {item.campaign_name}{" "}
                               
                              </a>
                              <span>{item.campaign_id}</span><br/>
                              <span> {(item.spent_amt) ? (item.spent_amt >= item.daily_budget) ? <Badge pill color={cls}>Daily Budget Exausted</Badge> : '' : ''}</span>
                            </div>
                        </DataTableRow>
                        <DataTableRow size="lg">
                          <span>{item.cat_name}</span>
                        </DataTableRow>
                        <DataTableRow size="lg">
                          <span>{item.imprs}</span>
                        </DataTableRow>
                        <DataTableRow size="lg">
                          <span>{item.click}</span>
                        </DataTableRow>
                        <DataTableRow size="lg">
                          <span className="tb-amount">${item.daily_budget}</span>
                        </DataTableRow>

                        <DataTableRow size="mb">
                          {item.ad_type === 'text' && <Badge pill color="primary">Text</Badge>}
                          {item.ad_type === 'banner' && <Badge pill color="warning">Banner</Badge>}
                          {/* {item.ad_type === 'video' && <Badge pill color="danger">Video</Badge>} */}
                          {item.ad_type === 'native' && <Badge pill color="info">Native</Badge>}
                          {item.ad_type === 'social' && <Badge pill color="success">Socialbar</Badge>}
                          {item.ad_type === 'popup' && <Badge pill color="dark">Popunder</Badge>}
                            {/* <Icon name="clock"></Icon> */}
                        </DataTableRow>
                  
                        <DataTableRow >
                          {item.status === 0 && <span className={`badge badge-dim badge-info`}><span>Incomplete</span></span>}
                          {item.status === 1 && <span className={`badge badge-dim badge-primary`}><span>In Review</span></span>}
                          {item.status === 2 && <span className={`badge badge-dim badge-success`}><span>Active</span></span>}
                          {item.status === 3 && <span className={`badge badge-dim badge-danger`}><span>Inactive</span></span>}
                          {item.status === 4 && <span className={`badge badge-dim badge-warning`}><span>Paused</span></span>}
                          {item.status === 5 && <span className={`badge badge-dim badge-dark`}><span>On Hold</span></span>}
                          {item.status === 6 && <span className={`badge badge-dim badge-danger`}><span>Suspended</span></span>}
                            {/* <Icon name="clock"></Icon> */}
                        </DataTableRow>
                        <DataTableRow >
                          <span>{item.createdat}</span>
                            {/* <Icon name="clock"></Icon> */}
                        </DataTableRow>
                        <DataTableRow className="nk-tb-col-tools text-right">
                          {(item.status < 6) ? 
                          <ul className="nk-tb-actions gx-1">
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="text-soft dropdown-toggle btn btn-icon btn-trigger">
                                  <Icon name="more-h"></Icon>
                                </DropdownToggle>
                                <DropdownMenu right>
                                  <ul className="link-list-opt no-bdr">
                                    <li>
                                      <Link to={`${process.env.PUBLIC_URL}/update-campaign/`+item.ad_type+'/'+item.campaign_id} >
                                        <Icon name="edit"></Icon>
                                        <span>Edit</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link onClick={() => {
                                          copyCampaign(item.campaign_id);
                                      }} >
                                        <Icon name="copy"></Icon>
                                        <span>Copy</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <DropdownItem
                                        tag="a"
                                        href="#markasdone"
                                        onClick={(ev) => {
                                          ev.preventDefault();

                                          swal.fire({
                                              title: "Are you sure?",
                                              text: "You won't be able to revert this!",
                                              icon: "warning",
                                              showCancelButton: true,
                                              confirmButtonText: "Yes, delete it!",
                                          }).then((result) => {
                                              if (result.isConfirmed) {
                                                delCamp(item.campaign_id);
                                              }
                                          });
                                          
                                        }}
                                      >
                                        <Icon name="trash"></Icon>
                                        <span>Delete</span>
                                      </DropdownItem>
                                    </li>
                                      
                                    <li>
                                      {item.status === 2 ? (
                                      <DropdownItem
                                        tag="a"
                                        href="#markasdone"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          updateCampg(item.campaign_id, 4)
                                        }}
                                      >
                                        <Icon name="pause"></Icon>
                                        <span>Pause</span>
                                      </DropdownItem>
                                      ) : item.status === 4 ? (
                                        <DropdownItem
                                          tag="a"
                                          href="#markasdone"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            updateCampg(item.campaign_id, 2)
                                          }} 
                                        >
                                        <Icon name="play"></Icon>
                                        <span>Active</span>
                                      </DropdownItem>
                                      ) : ''}
                                    </li>
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                          </ul>
                          : '' }
                        </DataTableRow>
                      </DataTableItem>
                    );
                  })
                : null}
            </DataTableBody>
              <div className="card-inner" style={{display:'flex'}}>
                <div style={{alignSelf:'self-start', width:'97%'}}>
                  
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
                </div>
      
              <div style={{alignSelf:'end'}}>
                    <UncontrolledDropdown>
                                  <DropdownToggle
                                    tag="a"
                                    className="dropdown-toggle bg-white btn btn-sm btn-outline-light btn-icon"
                                  >
                                  &nbsp; &nbsp;  {itemPerPage} <Icon name="downward-ios"></Icon>
                                  </DropdownToggle>
                                  <DropdownMenu right>
                                    <ul className="link-list-opt no-bdr">
                                     
                                      <li onClick={() => {  }}  >
                                        <DropdownItem
                                          tag="a"
                                          href="#"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            setItemPerPage(10)
                                            let adt = getAdType();
                                            getCampData(adt, adStatus, skey, 1 , 10)
                                          }}
                                        >
                                          <span>10</span>
                                        </DropdownItem>
                                      </li>
                                      <li onClick={() => {  }}  >
                                        <DropdownItem
                                          tag="a"
                                          href="#"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            setItemPerPage(20)
                                            let adt = getAdType();
                                            getCampData(adt, adStatus, skey, 1 , 20)
                                          }}
                                        >
                                          <span>20</span>
                                        </DropdownItem>
                                      </li>
                                      <li onClick={() => {  }}  >
                                        <DropdownItem
                                          tag="a"
                                          href="#"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            setItemPerPage(50)
                                            let adt = getAdType();
                                            getCampData(adt, adStatus, skey, 1 , 50)
                                          }}
                                        >
                                          <span>50</span>
                                        </DropdownItem>
                                      </li>
                                      <li onClick={() => {  }}  >
                                        <DropdownItem
                                          tag="a"
                                          href="#"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            setItemPerPage(100)
                                            let adt = getAdType();
                                            getCampData(adt, adStatus, skey, 1 , 100)
                                          }}
                                        >
                                          <span>100</span>
                                        </DropdownItem>
                                      </li>
                                      <li onClick={() => {  }}  >
                                        <DropdownItem
                                          tag="a"
                                          href="#"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            setItemPerPage(500)
                                            let adt = getAdType();
                                            getCampData(adt, adStatus, skey, 1 , 500)
                                          }}
                                        >
                                          <span>500</span>
                                        </DropdownItem>
                                      </li>
                                    </ul>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
              </div>
            </div>
            {/* <br /> */}
          </DataTable>
        </Block>
        

        <ToastContainer />
      </Content>
    </React.Fragment>
    
        <Modal isOpen={modalTab} toggle={toggleTab} size='lg'>
              <ModalHeader
                toggle={toggleTab}
                close={
                  <button className="close" onClick={toggleTab}>
                    <Icon name="cross" />
                  </button>
                }
              >
              Campaign Details - #{cinfo.campaign_id}
              </ModalHeader>
              <ModalBody>
                <Nav tabs className="mt-n3">
                  <NavItem>
                    <NavLink
                      tag="a"
                      href="#tab"
                      to="#tab"
                      className={classnames({ active: activeTab === "1" })}
                      onClick={(ev) => {
                        ev.preventDefault();
                        setActiveTab("1");
                      }}
                    >
                      Campaign Details
                    </NavLink>
                  </NavItem>
                  {(cinfo.ad_type == 'banner' || cinfo.ad_type == 'native' || cinfo.ad_type == 'social') ?
                  <NavItem>
                    <NavLink
                      tag="a"
                      href="#tab"
                      to="#tab"
                      className={classnames({ active: activeTab === "2" })}
                      onClick={(ev) => {
                        ev.preventDefault();
                        setActiveTab("2");
                      }}
                      >
                      Campaign Images
                    </NavLink>
                  </NavItem>
                    : '' } 
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    {/* <h6 className="title">Campaign Details</h6> */}
                    <table className="sm-tbl">  
                      {/* <thead>    
                          <tr>      
                              <th scope="col">Campaign ID</th>      
                              <th scope="col">First</th>      
                              <th scope="col">Last</th>      
                              <th scope="col">Handle</th>    
                          </tr>  
                      </thead>   */}
                      <tbody>    
                          <tr>      
                              <th>Campaign ID :</th>      
                              <td>#{(cinfo.campaign_id) ? cinfo.campaign_id : '--'}</td>      
                              <th>Category :</th>      
                              <td>{cinfo.cat_name}</td>    
                          </tr>    
                          {cinfo.ad_title && <tr><th>Ad Title :</th><td colSpan={3}>{cinfo.ad_title}</td></tr>}
                          {cinfo.ad_description && <tr><th>Ad Description :</th><td colSpan={3}>{cinfo.ad_description}</td></tr>}
                          {/* {cinfo.destination_url && <tr><th>Destination URLs :</th><td colSpan={3}>{cinfo.destination_url}</td></tr>} */}

                          <tr>
                              <th>Destination URL :</th>      
                              {/* <td colSpan={3}>{cinfo.target_url}</td>     */}
                              <td colSpan={3}>{(cinfo.target_url && cinfo.target_url.length > 70) ? (<a href="javascript:;" title={cinfo.target_url}>{cinfo.target_url.substring(0,70)+'...'}</a>)  : cinfo.target_url}</td>    
                          </tr>   
                          {cinfo.conversion_url ?
                          <tr>
                              <th>Conversion URL :</th>      
                              <td colSpan={3}>{cinfo.conversion_url}</td>    
                          </tr>   
                          : ''}
                          <tr>      
                              <th>Daily Budget :</th>      
                              <td>${cinfo.daily_budget}</td>      
                          </tr>
                          <tr>
                            <th>Countries :</th>      
                            <td colSpan={3}>{cinfo.country_name ?  
                            cinfo.country_name.split(',').map((item) => {
                                return(
                                  <Badge pill color="secondary sm-tag">{item}</Badge>
                                )
                            })
                            // setValueInTag(cinfo.country_name) 

                            : 'All'}</td>     
                          </tr> 
                          <tr>      
                              <th>Device Type :</th>      
                              <td>{(cinfo.device_type) ? 
                              cinfo.device_type.split(',').map((item) => {
                                return(
                                  <Badge pill color="outline-info sm-tag">{item.toUpperCase()}</Badge>
                                )
                              })
                               : '--'}</td>      
                              <th>Device OS :</th>      
                              <td>{(cinfo.device_os) ? 
                              cinfo.device_os.split(',').map((item) => {
                                return(
                                  <Badge pill color="outline-info sm-tag">{item.toUpperCase()}</Badge>
                                )
                            })
                              : '--'}</td>    
                          </tr>
                          <tr>      
                              <th>Clicks :</th>      
                              <td>{cinfo.click ? cinfo.click : 0}</td>      
                              <th>Impressions :</th>      
                              <td>{cinfo.imprs ? cinfo.imprs : 0}</td>    
                          </tr> 
                          {/* <tr>      
                              <th>Created</th>      
                              <td>124</td>      
                              <th></th>      
                              <td></td>    
                          </tr>        */}
                      </tbody>
                  </table>
                  </TabPane>
                  <TabPane tabId="2">
                    {/* <h6 className="title">Campaign Images</h6> */}
                    <div className="row">

                      <div className="col-md-3">
                        <img src={img.ad1}/>
                      </div>
                      <div className="col-md-4">
                        <img src={img.ad2}  />
                      </div>
                      <div className="col-md-5">
                      <img src={img.ad3}  />
                      </div>
                    </div>
                    {/* <p>
                    
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro numquam distinctio ab
                      cupiditate veniam a aperiam architecto perspiciatis quidem provident!
                    </p>
                    <p>
                      <strong>Debitis ullam impedit</strong>, dolore architecto porro doloremque eum magni dolorum.
                    </p> */}
                  </TabPane>
                </TabContent>
              </ModalBody>
    </Modal>
    
    </>
  );
};

export default Campaign;
