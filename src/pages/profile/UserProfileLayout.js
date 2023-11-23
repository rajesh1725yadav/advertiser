import React, { useState, useEffect, useContext } from "react";
import Content from "../../layout/content/Content";
import UserProfileRegularPage from "./UserProfileRegular";
import UserProfileSettingPage from "./UserProfileSetting";
import UserProfileNotificationPage from "./UserProfileNotification";
import UserProfileActivityPage from "./UserProfileActivity";
import { Route, Switch, Link } from "react-router-dom";
import { Icon, UserAvatar, Row, Col, Button, RSelect } from "../../components/Component";
import { findUpper, getDateStructured } from "../../utils/Utils";
import { Card, DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle, Modal, ModalBody, FormGroup, Form } from "reactstrap";
import { getCountryList, getUserInfo, getWalletAmount, saveUserInfo } from "../../app/api";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import AppContext from "../../context/AppContext";
import { useForm } from "react-hook-form";

const UserProfileLayout = () => {

  const apc = useContext(AppContext);

  const [sm, updateSm] = useState(false);
  const [mobileView , setMobileView] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [wlt, setWlt] = useState(0);
  const [email, setEmail] = useState('');
  const [countries, setCountries] = useState(null);

  const [modal, setModal] = useState(false);
  const [modalTab, setModalTab] = useState("1");
  const [formData, setFormData] = useState({
    first_name:'',
    last_name:'',
    phone:'',
    address_line1:'',
    address_line2:'',
    city:'',
    state:'',
    country:'',

  });
  const [valid, setValid] = useState({});
  // function to change the design view under 990 px
  const viewChange = () => {
    if (window.innerWidth < 990) {
      setMobileView(true);
    } else {
      setMobileView(false);
      updateSm(false);
    }
  };

  const { errors, register, handleSubmit, getValues } = useForm();

  const infoToast = () => {
    toast.success("Profile Updated Successfully!", {
      position: "top-right",
      autoClose: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
    });
  };

  const setuserInfo = ( data ) => {
    // console.log(data);
    if(data) {
      localStorage.setItem('fname', data.first_name);
      localStorage.setItem('lname', data.last_name);
      
      const email = localStorage.getItem('email');
      setProfileName(data.first_name+' '+data.last_name);
      let sts = apc.sts;

      // sts['first_name'] 
      apc.dispatch( {
        type:'userinfo',
        payload: {
          username: data.first_name+' '+data.last_name,
          email:email,
        }
      });
      // console.log(apc.sts.username+'test');
      setEmail(email)
    }
   
  }
  

  const setUserData = async () => {

    const uid = localStorage.getItem('uid');
    const uinfo = await getUserInfo(uid);
    // setProfileName(uinfo.first_name+' '+uinfo.last_name);
    setFormData(uinfo);
    setWlt(uinfo.wallet);
    setuserInfo(uinfo);
    apc.dispatch( {
      type:'wlt',
      wlt:uinfo.wallet,
      
    });
  }

  const submitForm = async (data) => { 
    // console.log(data);
    const uid = localStorage.getItem('uid');
    const res = await saveUserInfo(uid, data);
    // console.log(res);
    if(res.code == 200) {
      infoToast();
      setModal(false);
      setuserInfo(res)
      data['email'] = res.email;
      setFormData(data);
      // setFormData({...formData, email:res.email});
    } 
  }

  const setCountryData = async () => {
    let conts = await getCountryList();
    setCountries(conts);
  }
  
  useEffect(() => {

    viewChange();
    setUserData();
    setCountryData();

    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    document.getElementsByClassName("nk-header")[0].addEventListener("click", function () {
      updateSm(false);
    });
    // setuserInfo();
    return () => {
      window.removeEventListener("resize", viewChange);
      window.removeEventListener("load", viewChange);
    };
  }, []);
  
  return (
    <React.Fragment>
      <Content>
        <Card className="card-bordered">
          <div className="card-aside-wrap">
            <div
              className={`card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg ${
                sm ? "content-active" : ""
              }`}
            >
              <div className="card-inner-group">
                <div className="card-inner">
                  <div className="user-card">
                    <UserAvatar text={findUpper(profileName)} theme="primary" />
                    <div className="user-info">
                      <span className="lead-text">{profileName}</span>
                      <span className="sub-text">{email}</span>
                    </div>
                    <div className="user-action">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-icon btn-trigger mr-n2">
                          <Icon name="more-v"></Icon>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            {/* <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <Icon name="camera-fill"></Icon>
                                <span>Change Photo</span>
                              </DropdownItem>
                            </li> */}
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setModal(true);
                                }}
                              >
                                <Icon name="edit-fill"></Icon>
                                <span>Update Profile</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </div>
                <div className="card-inner">
                  <div className="user-account-info py-0">
                    <h6 className="overline-title-alt"> Wallet Balance</h6>
                    <div className="user-balance">
                      ${wlt}
                    </div>
                    {/* <div className="user-balance-sub">
                      Locked{" "}
                      <span>
                        0.344939 <span className="currency currency-btc">BTC</span>
                      </span>
                    </div> */}
                  </div>
                </div>
                <div className="card-inner p-0">
                  <ul className="link-list-menu">
                    <li onClick={() => updateSm(false)}>
                      <Link
                        to={`${process.env.PUBLIC_URL}/profile`}
                        className={
                          window.location.pathname === `${process.env.PUBLIC_URL}/profile` ? "active" : ""
                        }
                      >
                        <Icon name="user-fill-c"></Icon>
                        <span>Personal Information</span>
                      </Link>
                    </li>
                    {/* <li onClick={() => updateSm(false)}>
                      <Link
                        to={`${process.env.PUBLIC_URL}/user-profile-notification`}
                        className={
                          window.location.pathname === `${process.env.PUBLIC_URL}/user-profile-notification`
                            ? "active"
                            : ""
                        }
                      >
                        <Icon name="bell-fill"></Icon>
                        <span>Notification</span>
                      </Link>
                    </li> */}
                    <li onClick={() => updateSm(false)}>
                      <Link
                        to={`${process.env.PUBLIC_URL}/user-profile-activity`}
                        className={
                          window.location.pathname === `${process.env.PUBLIC_URL}/user-profile-activity` ? "active" : ""
                        }
                      >
                        <Icon name="activity-round-fill"></Icon>
                        <span>Account Activity</span>
                      </Link>
                    </li>
                    <li onClick={() => updateSm(false)}>
                      <Link
                        to={`${process.env.PUBLIC_URL}/user-profile-setting`}
                        className={
                          window.location.pathname === `${process.env.PUBLIC_URL}/user-profile-setting` ? "active" : ""
                        }
                      >
                      <Icon name="lock-alt-fill"></Icon>
                      <span>Change Password</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-inner card-inner-lg">
              {sm && mobileView && <div className="toggle-overlay" onClick={() => updateSm(!sm)}></div>}
              <Switch>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/profile`}
                  render={() => <UserProfileRegularPage updateSm={updateSm} setModal={setModal} sm={sm} userInfo={formData} />}
                ></Route>
                {/* <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/user-profile-notification`}
                  render={() => <UserProfileNotificationPage updateSm={updateSm} sm={sm} />}
                ></Route> */}
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/user-profile-activity`}
                  render={() => <UserProfileActivityPage updateSm={updateSm} sm={sm} />}
                ></Route>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/user-profile-setting`}
                  render={() => <UserProfileSettingPage updateSm={updateSm} sm={sm} />}
                ></Route>
              </Switch>
            </div>
          </div>
        </Card>
   
        <ToastContainer />
      </Content>
      <Modal isOpen={modal} className="modal-dialog-centered" size="lg" toggle={() => setModal(false)}>
        <ModalBody>
          <a
            href="#dropdownitem"
            onClick={(ev) => {
              ev.preventDefault();
              setModal(false);
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">Update Profile</h5>
            <ul className="nk-nav nav nav-tabs mb-4">
              <li className="nav-item">
                <a
                  className={`nav-link ${modalTab === "1" && "active"}`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModalTab("1");
                  }}
                  href="#personal"
                >
                  Personal
                </a>
              </li>
              {/* <li className="nav-item">
                <a
                  className={`nav-link ${modalTab === "2" && "active"}`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModalTab("2");
                  }}
                  href="#address"
                >
                  Address
                </a>
              </li> */}
            </ul>
            
            
          <Form onSubmit={handleSubmit(submitForm)}>

            <div className="tab-content">
              <div className={`tab-pane ${modalTab === "1" ? "active" : ""}`} id="personal">
                <Row className="gy-4">
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="full-name">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="full-name"
                        className="form-control"
                        name="first_name"
                        maxLength={15}
                        onChange={(e) =>  {
                          
                          if(e.target.value.trim() !== '') {
                            // setFormData({ ...formData, first_name:e.target.value})
                            setValid({ ...valid, first_name:''})
                          } else {
                            setValid({ ...valid, first_name:'Please enter your first name'})
                          }
                          // console.log(errors.name);
                         }}
                        defaultValue={formData.first_name}
                        placeholder="Enter First Name"
                        ref={register({ 
                          required: 'Please enter first name.', 
                          pattern : {
                            value : /^[a-zA-Z0-9\.]*$/,
                            message:'Please do not use special characters'
                          }
                        })}
                      />
                      {errors.first_name && <span className="sm-error">{errors.first_name.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="display-name">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        className="form-control"
                        name="last_name"
                        maxLength={15}
                        onChange={(e) => {
                          if(e.target.value.trim() !== '') {
                            // setFormData({ ...formData, last_name:e.target.value})
                            setValid({ ...valid, last_name:''})
                          } else {
                            setValid({ ...valid, last_name:'Please enter your last name'})
                          }
                        }}
                        defaultValue={formData.last_name}
                        placeholder="Enter Last Name"
                        ref={register({ 
                          required: 'Please enter last name.', 
                          pattern : {
                            value : /^[a-zA-Z0-9\.]*$/,
                            message:'Please do not use special characters'
                          }
                        })}
                      />
                      {errors.last_name && <span className="sm-error">{errors.last_name.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="phone-no">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        id="phone-no"
                        className="form-control"
                        name="phone"
                        onChange={(e) => {
                          
                            setFormData({ ...formData, phone:e.target.value})
                            
                            if(e.target.value.trim() !== '') {
                              if(e.target.value.length <= 10) {
                                setValid({ ...valid, phone:''})
                              } else {
                                setValid({ ...valid, phone:'Mobile number should be 10 digit'})
                              }
                            } else {
                              setValid({ ...valid, phone:'Please enter your mobile number'})
                            }

                          }
                        }

                        value={formData.phone}
                        placeholder="Mobile Number"
                        maxLength={10}
                        ref={register({ 
                          required: 'Please enter mobile number.', 
                          pattern : {
                            value : /^[0-9]*$/,
                            message:'Mobile Number should be numeric only.'
                          },
                          maxLength:{
                            value:15,
                            message:'Mobile Number maximum length should be 15 digit.'
                          },
                          minLength: {
                            value:10,
                            message:'Mobile Number minimum length should be 10 digit.'
                          }
                        })}
                      />
                      {errors.phone && <span className="sm-error">{errors.phone.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-l1">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        id="address1"
                        name="address_line1"
                        onChange={(e) => {
                          // setFormData({ ...formData, address_line1:e.target.value})
                        }}
                        defaultValue={formData.address_line1}
                        className="form-control"
                        ref={register({ 
                          required: 'Please enter your address.'
                        })}
                      />
                      {errors.address_line1 && <span className="sm-error">{errors.address_line1.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-l2">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        id="address-l2"
                        name="address_line2"
                        onChange={(e) => {
                          // setFormData({ ...formData, address_line2:e.target.value})
                        }}
                        defaultValue={formData.address_line2}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-st">
                        City
                      </label>
                      <input
                        type="text"
                        id="address-st"
                        name="city"
                        onChange={(e) => {
                          // setFormData({ ...formData, city:e.target.value})
                        }}
                        defaultValue={formData.city}
                        className="form-control"
                        ref={register({ 
                          required: 'Please enter your city.'
                        })}
                        
                      />
                      {errors.city && <span className="sm-error">{errors.city.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-st">
                        State
                      </label>
                      <input
                        type="text"
                        id="address-st"
                        name="state"
                        onChange={(e) =>{ 
                          // setFormData({ ...formData, state:e.target.value})
                        }}
                        defaultValue={formData.state}
                        className="form-control"
                        ref={register({ 
                          required: 'Please enter your state name.'
                        })}
                      />
                       {errors.state && <span className="sm-error">{errors.state.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-st">
                        Country
                      </label>
                      {/* <input
                        type="text"
                        id="address-st"
                        defaultValue={formData.country}
                        className="form-control"
                        /> */}
                      <select className="form-control"
                        name="country"
                        ref={register({ 
                          required: 'Please enter your country name.'
                        })}
                        >
                        {(countries != null) ? 
                        countries.map((row, key)=>{
                          return <option key={key} selected={( formData && row.label.toLowerCase() == formData.country.toLowerCase()) ? true : false}>{row.label}</option>
                        }) : ''}
                        
                      </select>
                      {errors.country && <span className="sm-error">{errors.country.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button
                          color="primary"
                          size="lg"
                          onClick={(ev) => {
                            // ev.preventDefault();
                            // submitForm();
                          }}
                        >
                          Update Profile
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setModal(false);
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </div>
            
          </Form>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default UserProfileLayout;
