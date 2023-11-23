import React, { useState, useRef, useReducer, useContext, useEffect } from "react";
import '../../assets/css/smart-ui.css';
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import txtAd from '../../images/text-ad1.png';
import bnrAd from '../../images/banner-ad1.png';
import socialAd from '../../images/social-bar1.png';
import nativeAd from '../../images/native-ad1.png';
import videoAd from '../../images/video-ad1.png';
import popAd from '../../images/popunder-ad1.png';
import success from '../../images/consent.png';
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
  FormGroup,
} from "reactstrap";

import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  Icon,
} from "../../components/Component";

import { toast, ToastContainer } from "react-toastify";

import { useForm } from "react-hook-form";
import { Steps, Step } from "react-step-builder";
import CampaignState from "../../context/CampaignState";
import CampaignContext from "../../context/CampaignContext";
import TextCampaign from "./TextCampaign";
import BannerCampaign from "./BannerCampaign";
import SocialBarCampaign from "./SocialBarCampaign";
import NativeCampaign from "./NativeCampaign";
import PopupCampaign from "./PopupCampaign";
import SuccessCampaign from "./SuccessCampaign";
import { Link } from "react-router-dom";
// import { Row, Col, FormGroup, Button } from "reactstrap";

const CloseButton = () => {
  return (
    <span className="btn-trigger toast-close-button" role="button">
      <Icon name="cross"></Icon>
    </span>
  );
};

const errorToast = () => {
  toast.error("Please select a ad type", {
    position: "top-right",
    autoClose: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: false,
    closeButton: <CloseButton />,
  });
};

const PersonalForm = (props) => {
  const camState = useContext(CampaignContext);

  // const onInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const { errors, handleSubmit, register } = useForm();

  const startCamp = (adfor) => {
    camState.setSts({
      ...camState.sts,
      campaign_type:adfor,
      ad_type:camState.sts.ad_type
    });
    // console.log(camState.sts);
    props.next();
  };

  return (
      <Row className="gy-4 c-campaign">
        <Col md="4">
        <Card className="card-bordered">   
          <CardBody className="card-inner justify-content-center text-center">
            <Icon name="tags-fill" style={{fontSize:'50px'}} />
            <CardTitle tag="h5">Sales</CardTitle>
            <CardText>
            7Search PPC comes upfront to help website vendors to elevate their sales and grow their websites
            </CardText>
            <Button color="primary" onClick={()=> startCamp('sales') }>Start</Button>
          </CardBody>
        </Card>
        
        </Col>
        <Col md="4">
        <Card className="card-bordered">   
          <CardBody className="card-inner text-center">
            <Icon name="user-list-fill" style={{fontSize:'50px'}} />
            <CardTitle tag="h5">Lead</CardTitle>
            <CardText>
            Become proactive, boost your reach, and generate endless possibilities for quality leads.
            </CardText>
            <Button color="primary" onClick={()=> startCamp('lead') }>Start</Button>
          </CardBody>
        </Card>
        </Col>
        
        <Col md="4">
        <Card className="card-bordered">   
          <CardBody className="card-inner text-center">
            <Icon name="globe" style={{fontSize:'50px'}} />
            <CardTitle tag="h5">Website Traffic</CardTitle>
            <CardText>
            Invest in PPC advertising to expand your operations and amplify real-world web traffic.
            </CardText>
            <Button color="primary" onClick={()=> startCamp('web') }>Start</Button>
          </CardBody>
        </Card>
        </Col>

        <Col md="4">
          <Card className="card-bordered">   
            <CardBody className="card-inner text-center">
              <Icon name="layers-fill" style={{fontSize:'50px'}} />
              <CardTitle tag="h5">Brand Awareness and Reach</CardTitle>
              <CardText>
              Stand out from your competitors and increase brand awareness through search ads.
              </CardText>
              <Button color="primary" onClick={()=> startCamp('branding') } >Start</Button>
            </CardBody>
          </Card>
        </Col>
        
        
        <Col md="4">
          <Card className="card-bordered">   
            <CardBody className="card-inner text-center">
              <Icon name="android" style={{fontSize:'50px'}} />
              <CardTitle tag="h5">App Promotion</CardTitle>
              <CardText>
              Increase your app download with organic installation and appeal to your target audience.
              </CardText>
              {/* <Button color="primary" onClick={()=> startCamp('app') }>Start</Button> */}
              <span className="text-primary">Coming Soon</span>
            </CardBody>
          </Card>
        </Col>
 
        <Col md="4">
          <Card className="card-bordered">   
            <CardBody className="card-inner text-center">
              <Icon name="setting-fill" style={{fontSize:'50px'}} />
              <CardTitle tag="h5" className="pl-1">Create Campaign without a goal's</CardTitle>
              <CardText>
              Promote your websites based on advertising objectives and brand strategy through a search ad campaign.
              </CardText>
              <Button color="primary" onClick={()=> startCamp('nogoal') }>Start</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
  );
};


const UserSettings = (props) => {
  
  const camState = useContext(CampaignContext);
  const [adtype, setAdtype] = useState('');
  const [radio, setRadio] = useState("text");
  const chkDiv = {
    border:'1px solid #6D7FFC',
    height:'24px',
    width:'24px',
    borderRadius:'3px',
    cursor:'pointer',
    position:'absolute',
    background:'white',
    top:"3px", left:'3px'
  }

  const chkDivfill = {
    border:'1px solid #6D7FFC',
    height:'24px',
    width:'24px',
    borderRadius:'3px',
    cursor:'pointer',
    color:'white',
    background:'#6D7FFC',
    position:'absolute',
    top:"3px", left:'3px'
  }
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { errors, handleSubmit, register, watch } = useForm();

  const submitForm = (e) => {
    e.preventDefault()
    if(camState.sts.ad_type !== '') {
      // camState.setSts({
      //   adType: adtype
      // })
      props.next();
      // console.log(camState);
    } else {
      errorToast();
    }

  };

  const password = useRef();
  password.current = watch("password");

  return (
    <form className="content clearfix" onSubmit={submitForm}>
      <div>
        <Row className="gy-4">
        {/* <Col md="4" lg="3">
          <Card className="card-bordered">   
            <CardBody className="card-inner text-center">
              {(camState.sts.ad_type == 'text') ? (
              <div style={chkDivfill} >
                  <Icon name="check-thick"/>
              </div>
              ) : (
              <div style={chkDiv} onClick={() => camState.setSts({ ...camState.sts, ad_type:'text'})}>
              </div>
              )}

                <img src={txtAd} alt="" style={{"width":"100%"}} />

              <CardTitle tag="h5">Text Ads</CardTitle>
              <CardText>
              Trends affecting the PPC industry. 60% of marketers are planning to spend more on text ads.
              </CardText>
            </CardBody>
          </Card>
        </Col> */}
        <Col md="1" lg="1"></Col>
        <Col md="4" lg="2">  
          <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked">
              <input type="checkbox" className="custom-control-input" id="text" value="Text"
                onClick={(e) => {
                  camState.setSts({...camState.sts, ad_type:'text'})
                }}
                checked={(camState.sts.ad_type == 'text') ? true : false}
              />
              <label className="custom-control-label" htmlFor="text" style={{'display':'block', padding:20, 'textAlign':'center'}} >
                <div>
                <img src={txtAd} alt="" style={{"width":"100%"}} />
                </div>
                
                <div>
                  <br/>
                  <CardTitle tag="h5">Text Ads</CardTitle>
                  <CardText>
                  Trends affecting the PPC industry. 60% of marketers are planning to spend more on text ads. 
                  </CardText>
                </div>
                
              </label>
              <br/>
          </div>
        </Col>

        {/* <Col md="4" lg="3">
          <Card className="card-bordered">   
            <CardBody className="card-inner text-center">
              {(camState.sts.ad_type == 'banner') ? (
              <div style={chkDivfill} >
                  <Icon name="check-thick"/>
              </div>
              ) : (
              <div style={chkDiv} onClick={() => camState.setSts({...camState.sts, ad_type:'banner'})}>
              </div>
              )}
              <img src={bnrAd} alt="" style={{"width":"100%"}} />
              <CardTitle tag="h5">Banner Ads</CardTitle>
              <CardText>
              Capture your viewer's attention through display banner ads to drive traffic of 47% to the advertiser’s site.
              </CardText>
            </CardBody>
          </Card>
        </Col> */}
        <Col md="4" lg="2">  
          <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked">
              <input type="checkbox" className="custom-control-input" id="banner" value="Banner"
                onClick={(e) => {
                  camState.setSts({...camState.sts, ad_type:'banner'})
                }}
                checked={(camState.sts.ad_type == 'banner') ? true : false}
              />
              <label className="custom-control-label" htmlFor="banner" style={{'display':'block', padding:20, 'textAlign':'center'}} >
                <div>
                <img src={bnrAd} alt="" style={{"width":"100%"}} />
                </div>
                
                <div>
                  <br/>
                  <CardTitle tag="h5">Banner Ads</CardTitle>
                  <CardText>
                    Capture your viewer's attention through display banner ads to drive traffic of 47% to the advertiser’s site.
                  </CardText>
                </div>
                
              </label>
              <br/>
          </div>
        </Col>
        {/* <Col md="4" lg="2">
          <Card className="card-bordered">   
            <CardBody className="card-inner text-center">
              {(camState.sts.ad_type == 'video') ? (
              <div style={chkDivfill} >
                  <Icon name="check-thick"/>
              </div>
              ) : (
              <div style={chkDiv} onClick={() => camState.setSts({...camState.sts, ad_type:'video'})}>
              </div>
              )}
              <img src={videoAd} alt="" style={{"width":"100%"}} />
              <CardTitle tag="h5">Video Ads</CardTitle>
              <CardText>
              Video ads are rising since they are clicked on 73% more than display banners.
              </CardText>
            </CardBody>
          </Card>
        </Col> */}
        {/* <Col md="4" lg="3"> 
          <Card className="card-bordered">   
            <CardBody className="card-inner text-center">
            {(camState.sts.ad_type == 'social') ? (
              <div style={chkDivfill} >
                  <Icon name="check-thick"/>
              </div>
              ) : (
              <div style={chkDiv} onClick={() => camState.setSts({ ...camState.sts, ad_type:'social'})}>
              </div>
              )}
              <img src={socialAd} alt="" style={{"width":"100%"}} />
              <CardTitle tag="h5">Social Bar Ads</CardTitle>
              <CardText>
              PPC industry is rapidly adopting social bar advertising. 49% of traffickers are planning to spend more on it.
              </CardText>
            </CardBody>
          </Card>
        </Col> */}
        
        <Col md="4" lg="2">  
          <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked">
              <input type="checkbox" className="custom-control-input" id="social" value="Social"
                onClick={(e) => {
                  camState.setSts({...camState.sts, ad_type:'social'})
                }}
                checked={(camState.sts.ad_type == 'social') ? true : false}
              />
              <label className="custom-control-label" htmlFor="social" style={{'display':'block', padding:20, 'textAlign':'center'}} >
                <div>
                <img src={socialAd} alt="" style={{"width":"100%"}} />
                </div>
                
                <div>
                  <br/>
                  <CardTitle tag="h5">Social Bar Ads</CardTitle>
                  <CardText>
                    PPC industry is rapidly adopting social bar advertising. 49% of traffickers are planning to spend more on it.
                  </CardText>
                </div>
                
              </label>
              <br/>
          </div>
        </Col>

        <Col md="4" lg="2">  
          <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked">
              <input type="checkbox" className="custom-control-input" id="native" value="Native"
                onClick={(e) => {
                  camState.setSts({...camState.sts, ad_type:'native'})
                }}
                checked={(camState.sts.ad_type == 'native') ? true : false}
              />
              <label className="custom-control-label" htmlFor="native" style={{'display':'block', padding:20, 'textAlign':'center'}} >
                <div>
                <img src={nativeAd} alt="" style={{"width":"100%"}} />
                </div>
                
                <div>
                  <br/>
                  <CardTitle tag="h5">Native Ads</CardTitle>
                  <CardText>
                  Customise your native widgets for advanced monetization. 53% of eCommerce clients are significantly switching to it.
                  </CardText>
                </div>
                
              </label>
              <br/>
          </div>
        </Col>

        {/* <Col md="4" lg="3">
          <Card className="card-bordered">   
            <CardBody className="card-inner text-center">
            {(camState.sts.ad_type == 'native') ? (
              <div style={chkDivfill} >
                  <Icon name="check-thick"/>
              </div>
              ) : (
              <div style={chkDiv} onClick={() => camState.setSts({...camState.sts, ad_type:'native'})}>
              </div>
              )}
              <img src={nativeAd} alt="" style={{"width":"100%"}} />
              <CardTitle tag="h5">Native Ads</CardTitle>
              <CardText>
              Customise your native widgets for advanced monetization. 53% of eCommerce clients are significantly switching to it.
              </CardText>
            </CardBody>
          </Card>
        </Col> */}
        {/* <Col md="4" lg="3">
          <Card className="card-bordered">   
            <CardBody className="card-inner text-center">
            {(camState.sts.ad_type == 'popup') ? (
              <div style={chkDivfill} >
                  <Icon name="check-thick"/>
              </div>
              ) : (
              <div style={chkDiv} onClick={() => camState.setSts({...camState.sts, ad_type:'popup'})}>
              </div>
              )}
              <img src={popAd} alt="" style={{"width":"100%"}} />
              <CardTitle tag="h5">Popunder Ads</CardTitle>
              <CardText>
              Customise your native widgets for advanced monetization. 53% of eCommerce clients are significantly switching to it.
              </CardText>
            </CardBody>
          </Card>
        </Col> */}
        <Col md="4" lg="2">  
          <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked">
              <input type="checkbox" className="custom-control-input" id="tablet" value="Tablet"
                onClick={(e) => {
                  camState.setSts({...camState.sts, ad_type:'popup'})
                }}
                checked={(camState.sts.ad_type == 'popup') ? true : false}
              />
              <label className="custom-control-label" htmlFor="tablet" style={{'display':'block', padding:15, 'textAlign':'center'}} >
                <div>
                  <img src={popAd} alt="" />
                </div>
                
                <div>
                  <br/>
                  <CardTitle tag="h5">Popunder Ads</CardTitle>
                  <CardText>
                  Customise your native widgets for advanced monetization. 53% of eCommerce clients are significantly switching to it.
                  </CardText>
                </div>
                
              </label>
              <br/>
          </div>
        </Col>
          <Col md="12">
            <hr />
          </Col>
        </Row>
        <div className="actions clearfix">
          <ul className="pt-0">
            <li>
              <Button color="primary" type="submit"  >
                Next
              </Button>
            </li>
            <li>
              <Button color="primary" onClick={props.prev}>
                Previous
              </Button>
            </li>
          </ul>
        </div>
        </div>
     </form>
  );
};

const AdSetup = (props) => {

  const camState = useContext(CampaignContext);

  const [formData, setFormData] = useState({
    tokenAddress: "",
    contribute: "",
    telegram: "",
  });

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { errors, handleSubmit, register } = useForm();

  const submitForm = (data) => {
    console.log(camState.sts);
    //window.location.reload();
    // props.next();
  };

  let renderView;

  if(camState.sts.ad_type === 'text') {
    renderView = <TextCampaign clkFunc={props} />
  } else if(camState.sts.ad_type === 'banner') {
    renderView = <BannerCampaign clkFunc={props} />
  } else if(camState.sts.ad_type === 'social') {
    renderView = <SocialBarCampaign clkFunc={props} />
  } else if(camState.sts.ad_type === 'native') {
    renderView = <NativeCampaign clkFunc={props} />
  } else if(camState.sts.ad_type === 'popup') {
    renderView = <PopupCampaign clkFunc={props} />
  } else {
    renderView = camState.sts.ad_type;
  }

  return (
    <>
    {renderView}
    </>
  );
}

const Header = (props) => {
  return (
    <div className="steps clearfix">
      <ul>
        <li className={props.current >= 1 ? "first done" : "first"}>
          <a href="#wizard-01-h-0" onClick={(ev) => ev.preventDefault()}>
             <h5>Campaign Setting</h5>
          </a>
        </li>
        <li className={props.current >= 2 ? "done" : ""}>
          <a href="#wizard-01-h-1" onClick={(ev) => ev.preventDefault()}>
            {/* <span className="number">02</span>  */}
            <h5>Ad Type</h5>
          </a>
        </li>
        <li className={props.current >= 3 ? "done" : ""}>
          <a href="#wizard-01-h-2" onClick={(ev) => ev.preventDefault()}>
            <span className="current-info audible">current step: </span>
            {/* <span className="number">03</span>  */}
            <h5>Create Ad</h5>
          </a>
        </li>
        <li className={props.current === 4 ? "last done" : "last"}>
          <a href="#wizard-01-h-2" onClick={(ev) => ev.preventDefault()}>
            <span className="current-info audible">current step: </span>
            <h5>Completed</h5>
          </a>
        </li> 
      </ul>
    </div>
  );
};

const Success = (props) => {
  return (
    <div className="d-flex justify-content-center align-items-center p-3">
      <BlockTitle tag="h6" className="text-center">
      <Row className="gy-3 mb-5">
            <Col md="8"  className='text-center offset-md-2 pb-5' >
                  <FormGroup className='pl-5 pr-5'>
      
                      <Icon name="check-circle" className="text-primary" style={{ fontSize: '120px'}} />
                      {/* <img src={success} style={{width:'160px'}} /> */}
                      <h4 className='text-primary mt-3 mb-3' >
                        Congratulation! Campaign Created.
                      </h4>
                      <p style={{fontSize:'16px'}}>Campaign created successfully and is currently under review.  Your campaign will be live as soon as our moderators verify it. You can edit or update your campaign anytime.</p>
                      <br />
                      <Link to={`${process.env.PUBLIC_URL}/campaigns`} className="mt-5">Back to Campaign</Link>
                      <br />
                  </FormGroup>
            </Col>
        </Row>
      </BlockTitle>
    </div>
  );
};

const config = {
  before: Header,
};

const CampActivity = () => {

  const cmp = useContext(CampaignContext);
  
  return (
    <React.Fragment>  
    <Head title="Create Campaign" />
    {(cmp.sts.success == true) ? 
      <Content >
        <SuccessCampaign className="mt-5" />
      </Content>
     :  
    <Content >
      <BlockHead size="lg" wide="sm">
        <BlockHeadContent>
          <BackTo link="/campaigns" icon="arrow-left">
            Campaign
          </BackTo>
          <BlockTitle page>
            Create Campaign
          </BlockTitle>
          <BlockDes className="text-soft">
              Here you can create a new campaign for your website.
          </BlockDes>
        </BlockHeadContent>
      </BlockHead>


      <Block size="lg">
        <PreviewCard>
          <div className="nk-wizard nk-wizard-simple is-alter wizard clearfix">
            <Steps config={config}>
              <Step component={PersonalForm} udata="Help" />
              <Step component={UserSettings} />
              <Step component={AdSetup} />
              <Step component={Success} />
            </Steps>
          </div>
        </PreviewCard>
      </Block>

      {/* <Block size="lg">
        <BlockHead>
        <BlockHeadContent>
        <BlockTitle tag="h5">Wizard Form - Vertical</BlockTitle>
        <p>A basic demonstration of wizard form in a vertical format.</p>
        </BlockHeadContent>
        </BlockHead>
        <PreviewCard>
        <div className="nk-wizard nk-wizard-simple is-vertical is-alter wizard clearfix">
        <Steps config={config}>
        <Step component={PersonalForm} />
        <Step component={UserSettings} />
              <Step component={PaymentInfo} />
              <Step component={Success} />
            </Steps>
          </div>
        </PreviewCard>
      </Block> */}
    </Content>
      }

    <ToastContainer />
  </React.Fragment>
  )
}
const CreateCampaign = () => {
  
  // const [success, setSuccess] = useState(true);
  
  return (
    <CampaignState>
      <CampActivity />
    </CampaignState>
  );
};

export default CreateCampaign;
