import React, { useContext, useState } from "react";
import LogoDark from "../../images/logo/logo.png";
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
import { Link, useHistory } from "react-router-dom";
import { forgetPasswordApi, loginUser } from "../../app/api";
import { useEffect } from "react";
// import AppContext from "../../context/AppContext";

const ForgotPassword = () => {
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const [fsave, setFsave] = useState(false);
  const [email, setEmail] = useState("");
  const [errorVal, setError] = useState("");

  const forgetPass = async (data) => {
    setFsave(true);
    setEmail(data.email);
    let res = await forgetPasswordApi(data);
    if (res.code == 200) {
      // console.log(res.data.key_auth)
      localStorage.setItem("7s_authkey", res.data.key_auth);
      localStorage.setItem("7s_uid", res.data.uid);
      setSuccess(true);
      history.push('/forget-password-process')
    } else {
      setError("Please enter valid email !");
      setFsave(false);
      setSuccess(false);
    }
  };
  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Reset Password</BlockTitle>
                <BlockDes>
                  <p>If you forgot your password, well, then we’ll email you instructions to reset your password.</p>
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
            <Form className="is-alter" onSubmit={handleSubmit(forgetPass)}>
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
                    name="email"
                    readOnly={fsave ? true : false}
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Please enter a valid email !",
                      },
                    })}
                    defaultValue=""
                    placeholder="Enter your email address"
                    className="form-control-lg form-control"
                  />
                  {errors.email?.type === "required" && (
                    <span className="sm-error">Please enter your registered email</span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="sm-error">Please enter a valid email address</span>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {fsave == true ? (
                    <span>
                      <Spinner size="sm" /> &nbsp; Sending...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </FormGroup>
            </Form>
            <div className="form-note-s2 text-center pt-4">
              {" "}
              {/* New on our platform? <Link to={`${process.env.PUBLIC_URL}/auth-register`}>Create an account</Link> */}
            </div>
            <div className="text-center pt-4 pb-3">

            </div>

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

export default ForgotPassword;
