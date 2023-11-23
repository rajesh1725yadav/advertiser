import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown } from "reactstrap";
import { getNotificationShort } from "../../../../app/api";
import Moment from "react-moment";
import Icon from "../../../../components/icon/Icon";
import data from "./NotificationData";
import AppContext from "../../../../context/AppContext";

const NotificationItem = (props) => {
  const { icon, iconStyle, title, text, time, id, view } = props;
  const ntitle = (title.length > 25) ? title.substr(0, 30)+'...' : title;
  let cls = (view == 1) ? 'nk-notification-item sm-bg-light' : 'nk-notification-item'; 
  let nbadge = (view == 0) ? <span className="badge badge-danger badge-pill text-light">New</span> : '';
  return (
    <div className={cls} key={id} id={id} style={{borderBottom:'1px solid #ddd'}}>
      {/* <div className="nk-notification-icon">
        <Icon name={icon} className={[`icon-circle ${iconStyle ? " " + iconStyle : ""}`]} />
      </div> */}
      <div className="nk-notification-content">
        <div className="nk-notification-text text-dark"><b>{ntitle}</b> &nbsp; {nbadge}</div>
        <div className="nk-notification-text">{text}</div>
        <div className="nk-notification-time"><Moment fromNow>{time}</Moment></div>
      </div>
    </div>
  );
};

const Notification = ({isOpen, setIsOpen, toggle}) => {

  const history = useHistory();
  const [ndata, setNdata] = useState(null);
  const appState = useContext(AppContext);
  const getNotiData = async () => {
    let res = await getNotificationShort();
    if(res.data) {
      setNdata(res.data);
    }
  }
  
  useEffect(()=>{
    getNotiData();
  },[])

  return (
    <UncontrolledDropdown className="user-dropdown" isOpen={isOpen} toggle={toggle} >
      <DropdownToggle tag="a" className="dropdown-toggle nk-quick-nav-icon">
        <div className="icon-status icon-status-info">
          <Icon name="bell-fill" />
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-xl dropdown-menu-s1">
        <div className="dropdown-head">
          <span className="sub-title nk-dropdown-title"><b>{data.title}</b></span>
          {/* <a href="#markasread" onClick={(ev) => ev.preventDefault()}>
            Mark All as Read
          </a> */}
        </div>
        <div className="dropdown-body">
          <div className="nk-notification">
            {ndata !== null ? ndata.map((item, key) => {
              
              return ( 
                <a href="#"  onClick={()=>{
                  // let sts = appState.sts;
                  // sts['ntitle'] = item.title;
                  // sts['ndesc'] = item.noti_desc;
                  // sts['durl'] = item.display_url;
                  // console.log('test')
                  appState.dispatch({
                    type:'notiup',
                    ntitle:item.title,
                    ndesc:item.noti_desc,
                    durl: item.display_url,
                    nid: item.notifuser_id
                  })
                  setIsOpen(false);
                  getNotiData();
                  history.push('/inbox')
                }}>
                <NotificationItem
                  key={key}
                  id={item.id}
                  icon="bell"
                  iconStyle={item.iconStyle}
                  title={item.title}
                  view={item.view}
                  // text={(item.noti_desc.length > 35 ) ? item.noti_desc.substr(0,35)+'...' : item.title}
                  text={(item.noti_desc.length > 35 ) ? item.noti_desc.substr(0,35)+'...' : item.noti_desc}
                  time={item.created_at}
                 
                />
                </a>
              );
            }) : <div className="p-3">Notification Not Available</div>}
          </div>
        </div>
        <div className="dropdown-foot center">
        <Link to={`${process.env.PUBLIC_URL}/inbox`}>
            View All
        </Link>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Notification;
