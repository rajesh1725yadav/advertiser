import React, { useEffect, useState } from "react";
import { Badge, CardBody, CardTitle } from "reactstrap";
import Moment from "react-moment";
import Loader from "../../app/Loader";
import { Icon } from "../../components/Component";
import { updateNotification } from "../../app/api";

const NotiDetail = ({ appState }) => {
  const [recentUser, setRecentUser] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getNoti = async () => {
    setLoading(true);
    // let res = await getNotification();

    if (res.code === 200) {
      setData(res.data);
    }
    // console.log(res.data);
    setLoading(false);
  };
  const readNotification = async () => {
    let res = await updateNotification(appState.sts.nid);
    // console.log(nid)
  };
  useEffect(() => {
    readNotification();
  }, []);

  return (
    <React.Fragment>
      <Loader visible={loading} />
      <div className="card-inner border-bottom">
        <div className="card-title-group">
          <CardTitle>
            <h6 className="title">
              <a
                href="#"
                className="btn btn-icon btn-trigger nk-ibx-hide"
                onClick={() => {
                  // let sts = appSts.sts;
                  // console.log(sts);
                  // sts['ntitle'] = '';
                  appState.dispatch({
                    type: "notiup",
                    ntitle: "",
                  });
                  // setNtitle('')
                }}
              >
                <Icon name="arrow-left" style={{ fontSize: 20 }} />{" "}
              </a>
              &nbsp;<span>{appState.sts.ntitle.length ? appState.sts.ntitle : ""}</span>
            </h6>
          </CardTitle>
        </div>
      </div>
      <CardBody className="pl-5">
        <div className="pl-3">{appState.sts.ndesc.length ? appState.sts.ndesc : ""}</div>
        <div className="pl-3">
          <a href={appState.sts.durl ? appState.sts.durl : ""} target="_blank">
            {appState.sts.durl ? appState.sts.durl : ""}
          </a>
        </div>
      </CardBody>
    </React.Fragment>
  );
};
export default NotiDetail;
