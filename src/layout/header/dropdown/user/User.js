import React, { useState, useEffect, useContext } from "react";
import UserAvatar from "../../../../components/user/UserAvatar";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import AppContext from "../../../../context/AppContext";

const User = () => {
  const apc = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const toggle = () => setOpen((prevState) => !prevState);

  const handleSignout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("uid");
    localStorage.removeItem("fname");
    localStorage.removeItem("lname");
    localStorage.removeItem("email");
    localStorage.removeItem("wlt");
  };

  useEffect(()=>{
    const fname = localStorage.getItem('fname');
    const lname = localStorage.getItem('lname');
    const email = localStorage.getItem('email');
    const wlt = localStorage.getItem('wlt');
    console.log(apc.sts);
    if(apc.sts.username == '') {
      apc.dispatch({
        type:'userwlt',
        payload: {
            username : fname+' '+lname,
            email:email,
            wlt : wlt
        }
      })
      // apc.setSts({
      //   username : fname+' '+lname,
      //   wlt : wlt
      // });
    }
    setName(fname+' '+lname);
    // setEmail(email);
  },[])

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="sm" />
          <div className="user-info d-none d-md-block">
            <div className="user-status">Advertiser</div>
            <div className="user-name dropdown-indicator">{apc.sts.username}</div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <span style={{fontSize:22}}>{name.substring(0,1)}</span>
            </div>
            <div className="user-info">
              <span className="lead-text">{apc.sts.username}</span>
              <span className="sub-text">{email}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/profile" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
            <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}>
              Account Setting
            </LinkItem>
            <LinkItem link="/user-profile-activity" icon="activity-alt" onClick={toggle}>
              Login Activity
            </LinkItem>
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a href={`${process.env.PUBLIC_URL}/auth-login`} onClick={handleSignout}>
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
