import React, { useContext, useState } from "react";
import LogoDark from "../../images/logo/logo.png";
import BgImg from "../../images/logo/map-dotted.jpg";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";

import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { loginUser } from "../../app/api";
import { useEffect } from "react";
// import AppContext from "../../context/AppContext";

const Login = () => {
  // const apc = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");

  const getBrowserName = () => {
    var nAgt = navigator.userAgent;
    let browserName = "";

    if (nAgt.indexOf("Opera") != -1) {
      browserName = "Opera";
    } else if (nAgt.indexOf("MSIE") != -1) {
      browserName = "Microsoft Internet Explorer";
    } else if (nAgt.indexOf("Edg") != -1) {
      browserName = "Microsoft Edge";
    } else if (nAgt.indexOf("Chrome") != -1) {
      browserName = "Chrome";
    } else if (nAgt.indexOf("Safari") != -1) {
      browserName = "Safari";
    } else if (nAgt.indexOf("Firefox") != -1) {
      browserName = "Firefox";
    } else {
      browserName = "--";
    }

    return browserName;
  };

  const onFormSubmit = async (formData) => {
    setLoading(true);
    let browser = getBrowserName();
    let uname = window.btoa(formData.name);
    let upass = window.btoa(formData.passcode);
    const res = await loginUser(uname, upass, browser);

    if (res.token) {
      localStorage.setItem("accessToken", res.token);
      localStorage.setItem("uid", res.uid);
      localStorage.setItem("fname", res.fname);
      localStorage.setItem("lname", res.lname);
      localStorage.setItem("email", res.email);
      localStorage.setItem("wlt", res.wallet);
      // apc.setState({
      //   username: res.fname+' '+res.lname
      // });
      setTimeout(() => {
        window.history.pushState(
          `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
          "auth-login",
          `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
        );
        window.location.reload();
      }, 2000);
    } else {
      setTimeout(() => {
        setError(res.message);
        setLoading(false);
      }, 2000);
    }
    setLoading(false);
  };

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <a href="https://www.7searchppc.com" target={"_blank"} className="logo-link">
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </a>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h3">Log in as a <span className="text-primary">Advertiser</span></BlockTitle>
                <BlockDes>
                  <p>Advertise your business with us</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  <Icon name="alert-circle" /> {errorVal}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email Address
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="default-01"
                    name="name"
                    ref={register({ required: "This field is required" })}
                    defaultValue=""
                    placeholder="Enter your email address"
                    className="form-control-lg form-control"
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/forget-password`}>
                    Forgot Password?
                  </Link>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="passcode"
                    defaultValue=""
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your password"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {loading ? <Spinner size="sm" color="light" /> : "Log in"}
                </Button>
              </FormGroup>
            </Form>
            <div className="form-note-s2 text-center pt-4">
              {" "}
              New on our platform?{" "}
              <a href="https://www.7searchppc.com/register" target={"_blank"}>
                Create an account
              </a>
            </div>
            <div className="text-center pt-4 pb-3"></div>
          </PreviewCard>
        </Block>
        <footer>
          <div className="container-fluid">
            <div className="row p-3">
              <div className="col-md-4 mb-2">
                <p>Copyright @ 2023 <a href="https://www.7searchppc.com">7Search PPC</a> All Rights Reserved.</p>
              </div>
              <div className="col-md-4 mb-2">
                <ul className="d-flex justify-content-center">
                  <li className="footer-item mr-2 mr-md-4">
                    <a href="https://www.7searchppc.com/faqs" target="_blank">FAQ</a>
                  </li>
                  <li className="footer-item mr-2 mr-md-4">
                    <a href="https://www.7searchppc.com/about" target="_blank">About</a>
                  </li>
                  <li className="footer-item mr-2 mr-md-4">
                    <a href="https://www.7searchppc.com/privacy-policy" target="_blank">Privacy Policy</a>
                  </li>
                  <li className="footer-item mr-2 mr-md-4">
                    <a href="https://www.7searchppc.com/terms-conditions" target="_blank">Terms & Conditions</a>
                  </li>
                  <li className="footer-item mr-2 mr-md-4">
                    <a href="https://www.7searchppc.com/blog" target="_blank">Blog</a>
                  </li>
                  <li className="footer-item mr-2 mr-md-4">
                    <a href="https://www.7searchppc.com/contact" target="_blank">Contact us</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 text-center text-md-right mb-2">
                <div className="social-footer">
                  <a target="_blank" href="https://www.facebook.com/7searchPPCads"><i className="icon ni ni-facebook-fill" style={{ fontSize: "26px" }}></i></a>
                  <a target="_blank" href="https://twitter.com/7searchppc"><i className="icon ni ni-twitter-round" style={{ fontSize: "26px" }}></i></a>
                  <a target="_blank" href="https://www.instagram.com/7searchppc_ads/"><i className="icon ni ni-instagram-round" style={{ fontSize: "26px" }}></i></a>
                  <a target="_blank" href="https://www.linkedin.com/company/7searchppc/"><i className="icon ni ni-linkedin-round" style={{ fontSize: "26px" }}></i></a>
                  <a target="_blank" href="https://www.pinterest.com/7search_ppc_ads/"><i className="icon ni ni-pinterest-round" style={{ fontSize: "26px" }}></i></a>
                  <a target="_blank" href="https://www.youtube.com/@7search_ppc"><i className="icon ni ni-youtube-round" style={{ fontSize: "26px" }}></i></a>
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </PageContainer>
    </React.Fragment>
  );
};
export default Login;
