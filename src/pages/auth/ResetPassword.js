import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { CardTitle, Form, FormGroup, Spinner } from "reactstrap";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle, Icon, PreviewCard } from "../../components/Component";
import Head from "../../layout/head/Head";
import PageContainer from "../../layout/page-container/PageContainer";
import AuthFooter from "./AuthFooter";
import { updatePasswordApi, validateForgetKey } from "../../app/api";
import { Link } from "react-router-dom";
import Loader from "../../app/Loader";
import { toast, ToastContainer } from "react-toastify";
import loadr from '../../assets/hglass.json';
import Lottie from 'lottie-react';

export default function ResetPassword() {
  const { errors, register, handleSubmit, getValues } = useForm();
  const { uid, key } = useParams();
  const [keyAuth, setKeyAuth] = useState(false);
  const [success, setSuccess] = useState(false);
  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(false);

  const updatePassword = async (data) => {
    // setLoading(true)
    // let authkey = localStorage.getItem('7s_authkey');
    setSave(true)
    let fdata = {
      new_pass: data.pass,
      conf_pass: data.rpass,
      authkey: key
    }
    let res = await updatePasswordApi(fdata);
    setLoading(false)
    setSave(false)

    console.log(res);
    if (res.code == 200) {
      setSuccess(true);
      localStorage.removeItem('7s_authkey', res.data.key_auth);
      localStorage.removeItem('7s_uid', res.data.uid);

    } else if (res.code == 201) {
      toast.error("You can't use your old password.", {
        position: "top-right",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
      });
    } else if (res.code == 101) {
      toast.error("You have already changed your password.", {
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

  const validateAuthKey = async () => {
    let res = await validateForgetKey(uid, key);
    if (res.status == 1) {
      setKeyAuth(1);
    } else if (res.status == 0) {
      setKeyAuth(2);
    }
  }

  useEffect(() => {
    validateAuthKey();

  }, [])

  return (
    <React.Fragment>
      <Head title="Forgot-Password" />
      <PageContainer>
        <Loader visible={loading} />
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          {(keyAuth == 2) ?
            <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
              <div className="text-center">
                <h4>Link has expired!</h4>
                <p>This link has expired. Please go back and genarate new link</p>
              </div>
            </PreviewCard>
            : (success) ?
              <PreviewCard className="card-bordered" bodyClass="card-inner-lg">

                <div className="text-center">
                  <Icon name="check-circle" className="text-primary" style={{ fontSize: 100 }} ></Icon>
                  <h4 className="mt-2">Password Reset Successfully!</h4>
                  <p>Your password updated Successfully. Now you can log in your account</p>
                </div>
                <div className="form-note-s2 text-center pt-4">
                  <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                    <strong>Return to login</strong>
                  </Link>
                </div>
              </PreviewCard>
              : (keyAuth == 1) ?
                <PreviewCard className="card-bordered" bodyClass="card-inner-lg">

                  <BlockHead>
                    <BlockContent>
                      <BlockTitle tag="h5">Reset password</BlockTitle>
                      <BlockDes>
                        <p>If you forgot your password, well, then we’ll email you instructions to reset your password.</p>
                      </BlockDes>
                    </BlockContent>
                  </BlockHead>

                  <Form onSubmit={handleSubmit(updatePassword)}>
                    <FormGroup>
                      <div className="form-label-group">
                        <label className="form-label" >
                          New Password
                        </label>
                      </div>
                      <input
                        className="form-control"
                        type="password"
                        name="pass"
                        ref={register({
                          required: true,
                          minLength: 8,
                          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                        })}
                      />
                      {errors.pass?.type === 'required' && <span className="sm-error">Please enter your new password</span>}
                      {errors.pass?.type === 'minLength' && <span className="sm-error">The password should be of 8 digit or more </span>}
                      {errors.pass?.type === 'pattern' && <span className="sm-error">Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character </span>}

                    </FormGroup>
                    <FormGroup>
                      <div className="form-label-group">
                        <label className="form-label" >
                          Repeat Password
                        </label>
                      </div>
                      <input
                        className="form-control"
                        type="password"
                        name="rpass"
                        ref={register({
                          required: true,
                          validate: (val) => {
                            return val === getValues('pass')
                          }
                        })}
                      />
                      {errors.rpass?.type === 'validate' && <span className="sm-error">Password should be same as above</span>}
                      {errors.rpass?.type === 'required' && <span className="sm-error">Please re-enter new password</span>}

                    </FormGroup>
                    {/* {errors.pass2 && <span className="sm-error">Please enter a ad title</span>} */}
                    <FormGroup>
                      <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={() => {
                        console.log(errors)
                      }}>
                        {(save) ? <span><Spinner size="sm" /> Updating...</span> : 'Update Password'}
                      </button>
                    </FormGroup>
                  </Form>
                </PreviewCard>

                :
                <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                  <div className="row col-md-12 text-center align-items-center align-content-center justify-content-center">
                    <Lottie animationData={loadr} style={{ height: '100px', width: '100px' }} autoPlay={true} loop={true} />
                    <CardTitle tag="h5"  >
                      Processing...
                    </CardTitle>
                  </div>
                </PreviewCard>
          }
        </Block>
        {/* <AuthFooter /> */}
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
        <ToastContainer />
      </PageContainer>
    </React.Fragment>
  )
} 