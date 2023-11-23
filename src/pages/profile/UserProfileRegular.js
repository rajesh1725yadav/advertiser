import React, { useEffect, useState } from "react";
import Head from "../../layout/head/Head";
import DatePicker from "react-datepicker";
import { Modal, ModalBody, FormGroup } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  Button,
  RSelect,
} from "../../components/Component";
import { countryOptions, userData } from "./UserData";
import { getDateStructured } from "../../utils/Utils";
import { getUserInfo } from "../../app/api";

const UserProfileRegularPage = ({ sm, updateSm, userInfo, setModal }) => {
  const [modalTab, setModalTab] = useState("1");
  // const [userInfo, setUserInfo] = useState({});
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    dob: "",
    address: "",
    address2: "",
    state: "",
    country: "",
  });

  // const seUserData = async () => {

  //   const uid = localStorage.getItem('uid');
  //   const uinfo = await getUserInfo(uid);
  //   setProfileName(uinfo.first_name+' '+uinfo.last_name);
  //   setUserInfo(uinfo);
    
  // }

  useEffect(() => {
    console.log(userInfo);
    // seUserData();
    
  }, [formData]);

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.fname]: e.target.value });
  };

  // const submitForm = () => {
  //   let submitData = {
  //     ...formData,
  //   };
  //   setUserInfo(submitData);
  //   setModal(false);
  // };

  return (
    <React.Fragment>
      <Head title="My Profile"></Head>
      <BlockHead size="lg">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h4">Personal Information</BlockTitle>
            <BlockDes>
              <p>Basic info, like your name and address, that you use on Our Platform.</p>
            </BlockDes>
          </BlockHeadContent>
          <BlockHeadContent className="align-self-end ">
          <Button
              className={` btn btn-primary btn-sm btn-icon float-right text-right d-none d-lg-block pl-2 pr-2`}
              onClick={() => { setModal(true)}}
            >
              <Icon name="edit-alt"></Icon> <span className="">Edit Profile &nbsp;</span>
            </Button>
            <Button
              className={`toggle btn btn-icon btn-trigger d-lg-none mt-n1 float-right ${sm ? "active" : ""}`}
              onClick={() => updateSm(!sm)}
            >
              <Icon name="menu-alt-r"></Icon>
            </Button>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>
      <Block>
        <div className="nk-data data-list custom-info">
          <div className="data-head bg-primary">
            <h6 className="overline-title text-white">Basic Information</h6>
          </div>
          <div className="data-item c-p-5" onClick={() => setModal(true)}>
            <div className="data-col">
              <span className="data-label">First Name</span>
              <span className="data-value">{userInfo.first_name}</span>
            </div>
            <div className="data-col data-col-end">
              {/* <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span> */}
            </div>
          </div>
          <div className="data-item c-p-5" onClick={() => setModal(true)}>
            <div className="data-col">
              <span className="data-label">Last Name</span>
              <span className="data-value">{userInfo.last_name}</span>
            </div>
            <div className="data-col data-col-end">
              {/* <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span> */}
            </div>
          </div>
          <div className="data-item c-p-5">
            <div className="data-col">
              <span className="data-label">Email</span>
              <span className="data-value">{userInfo.email}</span>
            </div>
            <div className="data-col data-col-end">
              <span className="data-more disable">
                <Icon name="lock-alt"></Icon>
              </span>
            </div>
          </div>
          <div className="data-item c-p-5" onClick={() => setModal(true)}>
            <div className="data-col">
              <span className="data-label">Mobile Number</span>
              <span className="data-value text-soft">{userInfo.phone}</span>
            </div>
            <div className="data-col data-col-end">
              {/* <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span> */}
            </div>
          </div>
          <div className="data-item c-p-5" >
            <div className="data-col">
              <span className="data-label">Address</span>
              <span className="data-value">
                {userInfo.address_line1 ? userInfo.address_line1+', ' : '' } 
                {userInfo.address_line2 ? userInfo.address_line2+', ' : ''}
                {userInfo.city ? userInfo.city+', ' : ''} {userInfo.state ? userInfo.state+', ' : ''}
              
                {userInfo.country} 
              </span>
            </div>
            <div className="data-col data-col-end">
              {/* <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span> */}
            </div>
          </div>
        </div>
      </Block>
    </React.Fragment>
  );
};
export default UserProfileRegularPage;
