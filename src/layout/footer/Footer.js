import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../components/Component";

const Footer = () => {
  return (
    <div className="nk-footer">
      <div className="container-fluid">
        <div className="nk-footer-wrap">
          <div className="nk-footer-copyright txt-dark">
            {" "}
            &copy; 2023 7Search PPC. All Rights Reserved
          </div>
          <div className="nk-footer-links">
          <ul className="nav nav-sm mr-5">
            
             
            <li className="nav-item">
              <Link to={{pathname: 'https://www.7searchppc.com/faqs'}} target="_blank" className="nav-link">
                FAQ
              </Link>
            </li>
            <li className="nav-item">
              <Link to={{pathname: 'https://www.7searchppc.com/about'}} target="_blank" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to={{pathname: 'https://www.7searchppc.com/contact'}} target="_blank" className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to={{pathname: 'https://www.7searchppc.com/privacy-policy'}} target="_blank" className="nav-link">
                Privacy Policy
              </Link>
            </li>
            <li className="nav-item">
              <Link to={{pathname: 'https://www.7searchppc.com/terms-conditions'}} target="_blank" className="nav-link">
              Terms &amp; Conditions
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">
              &nbsp; | &nbsp;
              </Link>
            </li>
            <li className="nav-item">
            <Link  to={{pathname:'https://www.facebook.com/7searchPPCads'}} target="_blank" className="nav-link pr-1 pl-1">
              <Icon name="facebook-fill" style={{fontSize:26}}></Icon>
            </Link>
            <Link to={{pathname:'https://twitter.com/7searchppc'}} target="_blank" className="nav-link pr-1 pl-1">
              <Icon name="twitter-round" style={{fontSize:26}}> </Icon>
              </Link>
            <Link to={{pathname:'https://www.instagram.com/7searchppc_ads/'}} target="_blank" className="nav-link pr-1 pl-1">
              <Icon name="instagram-round" style={{fontSize:26}}></Icon>
            </Link>
            <Link to={{pathname:'https://www.linkedin.com/company/7searchppc/'}} target="_blank" className="nav-link pl-1 pr-1">
              <Icon name="linkedin-round" style={{fontSize:26}}></Icon>
            </Link>
            <Link to={{pathname:'https://www.pinterest.com/7search_ppc_ads/'}} target="_blank" className="nav-link pl-1 pr-1">
              <Icon name="pinterest-round" style={{fontSize:26}}></Icon>
            </Link>
            <Link to={{pathname:'https://www.youtube.com/@7search_ppc'}} target="_blank" className="nav-link pl-1 pr-1">
              <Icon name="youtube-round" style={{fontSize:26}}></Icon>
            </Link>

            </li>
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
