import React, {useState, useContext} from "react";
import classNames from "classnames";
import Toggle from "../sidebar/Toggle";
import Logo from "../logo/Logo";
import News from "../news/News";
import User from "./dropdown/user/User";
import Notification from "./dropdown/notification/Notification";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
import { Alert, Badge } from "reactstrap";
import { Icon } from "../../components/Component";

const Header = ({ fixed, theme, className, setVisibility, ...props }) => {
  const apc = useContext(AppContext);
  const headerClass = classNames({
    "nk-header": true,
    "nk-header-fixed": fixed,
    [`is-light`]: theme === "white",
    [`is-${theme}`]: theme !== "white" && theme !== "light",
    [`${className}`]: className,
  });

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {setIsOpen(!isOpen)};

  return (
    <>
    <div className={headerClass}>
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ml-n1">
            <Toggle
              className="nk-nav-toggle nk-quick-nav-icon d-xl-none ml-n1"
              icon="menu"
              click={props.sidebarToggle}
            />
          </div>
          <div className="nk-header-brand d-xl-none">
            <Logo />
          </div>
          <div className="nk-header-news d-none d-xl-block">
            <News />
          </div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
                {/* <Badge color="danger" pill>Low Balance</Badge> */}
            <li style={{lineHeight:1.2, fontSize:12, textAlign:'left'}}>
                Balance<br/>
                <b className="text-primary fs-18" style={{fontSize:19}}>${apc.sts.wlt}</b>
              </li>
              <li style={{marginRight:50}}>
                <Link className="btn btn-primary btn-sm" to={`${process.env.PUBLIC_URL}/payment`}>Add Fund</Link>
              </li>
              <li className="notification-dropdown mr-n1"  onClick={() => {
                // setVisibility(false)
                }
              }>
                <Notification toggle={toggle}  isOpen={isOpen} setIsOpen={setIsOpen} />
              </li>
              <li className="user-dropdown"  onClick={() => setVisibility(false)}>
                <User />
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
      {/* <div className="row p-4 mt-3">
        <div className="col-md-12">
        <Alert className="alert-icon mt-5" color="danger">
          <Icon name="alert-circle" />
          Your <strong>wallet balance</strong> is low. Please &nbsp; 
          <Link to="payment" className="alert-link">
            Add Fund
          </Link>{" "} 
          in your wallet.
        </Alert>
        </div>
      </div> */}
    </>
  );
};
export default Header;
