import React, {useContext, useEffect, useState } from "react";
import UserAvatar from "../../../user/UserAvatar";
import { activityData } from "./ActivityData";
import { Badge, CardTitle } from "reactstrap";
import { getNotification } from "../../../../app/api";
import Loader from "../../../../app/Loader";
import { Icon } from "../../../Component";
import Moment from "react-moment";
import AppContext from "../../../../context/AppContext";

const RecentActivity = ({setModal, appState}) => {

  const [recentUser, setRecentUser] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const ctx = useContext(AppContext);
  const getNoti = async () => {
    
    setLoading(true);
    let res = await getNotification();
    
    if(res.code === 200) {
      setData(res.data);
      ctx.dispatch({
        type:'wlt',
        wlt: res.wallet
      });
    }
    // console.log(res.data);
    setLoading(false);
  }
  
  useEffect(()=> {
    getNoti();
  }, []);
  
  return (
    <React.Fragment>
      <Loader visible={loading} />
      <div className="card-inner border-bottom">
        <div className="card-title-group">
          <CardTitle>
            <h6 className="title">Recent Notifications <Icon name="fa fa-user" /></h6>
          </CardTitle>
        </div> 
      </div>
      <ul className="nk-activity">
        {data !== null 
          ? data.map((item, key) => {
            let cls = (item.view == 1) ? 'nk-activity-item sm-bg-light' : 'nk-activity-item';
            let tag = (item.view == 0) ? <Badge pill color="danger">New</Badge> : '';
              return ( 
                <a href="javascript:;" key={key} onClick={() => {
                  appState.dispatch({
                    type:'notiup',
                    ntitle:item.title,
                    ndesc:item.noti_desc,
                    durl:item.display_url,
                    nid:item.notifuser_id
                  })
                }}>
                <li className={cls} style={{borderBottom:'1px solid #eee'}} >
                  {item.noti_type == 1 ? 
                  <UserAvatar
                    className="nk-activity-media"
                    theme="primary"
                    image={item.img}
                    text={item.initial}
                  >
                  <Icon name="bell" style={{fontSize:20}} />
                  </UserAvatar>
                  :
                  <UserAvatar
                      className="nk-activity-media" 
                      theme="warning" 
                      image={item.img} 
                      text={item.initial} 
                    >
                    <Icon name="percent" style={{fontSize:20}} />
                  </UserAvatar>
                }
                  <div className="nk-activity-data">
                    <div className="label" style={{fontSize:14}}><b>{item.title}</b> &nbsp; {tag}</div>
                    <div style={{fontSize:14, color:"#555"}}>{item.noti_desc.length > 150 ? item.noti_desc.substr(0,140)+'...' : item.noti_desc }</div>
                    <span className="time"><Moment fromNow >{item.created_at}</Moment></span>
                  </div>
                </li>
                </a>
              );
            })
          : <div className="text-center p-3">You  don't have any notification.</div>}
      </ul>
    </React.Fragment>
  );
};
export default RecentActivity;
