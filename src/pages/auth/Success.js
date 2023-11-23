import React from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle } from "../../components/Component";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <React.Fragment>
      <Head title="Success" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body">
          <div className="brand-logo pb-5">
            <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Thank you for submitting form</BlockTitle>
              <BlockDes className="text-success">
                <p>You can now sign in with your new password</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
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
      </PageContainer>
    </React.Fragment>
  );
};
export default Success;
