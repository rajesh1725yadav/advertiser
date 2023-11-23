import React, { useContext, useState, useEffect, useCallback } from 'react'
import CampaignContext from '../../context/CampaignContext'
import {
    Row,
    Col,
    Tooltip,
    Button,
    FormGroup,
    Form,
    Spinner,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Popover,
    PopoverBody,
    PopoverHeader, 
    Alert
  } from "reactstrap";
import { RSelect, Icon, BlockTitle } from '../../components/Component';
import { getCampaignInfo, getCategoryList, getCountryList, getCPCInfo, updateSocialCampaign, uploadImage } from '../../app/api';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from "react-toastify";
import Cropper from 'react-easy-crop';

import AdView1 from '../../images/social.jpg';
import Loader from '../../app/Loader';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';

export default function EditSocialBarCampaign ({clkFunc}) {

  const { cid } = useParams();

  const [cropping, setCropping] = useState(false);
  const [isOpen , setIsOpen] = useState(false);
  const [imgs, setImgs] = useState(null);
  const modal = () => { setIsOpen(!isOpen) };
  const [crop, onCropChange] = useState({ x: 0, y: 0 })
  const [cropData, setCropData] = useState();
  const [loading , setLoading] = useState(false);

  const ImageCrop = () => {
    // console.log(cropData)
    let image = new Image();
    image.src = imgs;
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    //  data = '';
    canvas.width = cropData.width;
    canvas.height = cropData.height
    ctx.drawImage(image,cropData.x,cropData.y,cropData.width,cropData.height,0,0,cropData.width,cropData.height)
    
    image.onload = function() {  };
    const data = canvas.toDataURL();
    setUrlResImg({...urlResImg, ad1:data});
    // setUrlResImg({ad1:dataURL})
    setIsOpen(false);
      
  }

  const getImgData = (e) => {
    let file = e.target.files[0];
    const img = new FileReader();
    let size = Math.round(file.size/1024);
    if(ext == 'png' || ext == 'jpeg' || ext == 'webp') {
      if(size <= 100) {
        img.onload = function(){
          var dataURL = img.result;
          setImgs(dataURL)
          setCropping(true);
          setIsOpen(true);
        };
        img.readAsDataURL(file)
      } else {
        toast.error("Image file size is too large. Maximum file size is 100kb", {
          position: "top-right",
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: false,
        });
      }
    } else {
      toast.error("Image file should be jpeg, png or webp only.", {
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

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCropData(croppedAreaPixels)

  }, []);

    // useCallback
    const saveImg2Server = async ( ) => {
      cropData.img_data = imgs;
      ImageCrop();
      // uploadImage(cropData) 
    }
  const showToast = (type) => {

    if(type == 1) {
      toast.success("Campaign saved successfully", {
        position: "top-right",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        // closeButton: <CloseButton />,
      });
    } else {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        // closeButton: <CloseButton />,
      });
      
    }
  };

  const { errors, register, handleSubmit, getValues } = useForm();

    const [fsave, setFsave] = useState(false);

    const stitle = 'Ad Title';
    const dtitle = 'Ad Description';
    const durl = 'https://www.7searchppc.com';
    const [txt, setTxt] = useState({
        website_category:'',
        campaign_name:'',
        ad_title:stitle,
        ad_description:dtitle,
        target_url:durl,
        conversion_url:'',
        daily_budget:'',
        social_ad_type:'',
        device_type:[],
        device_os:[],
        countries:''
    });

    const [os, setOs] = useState({
      android:0,
      windows:0,
      apple:0
    })
    
    const [conchk, setConChk] = useState(true);
    const [cntry, setCntry] = useState(false);
    const campState = useContext(CampaignContext);
    const appState = useContext(AppContext);
    const [tooltipOpen , setOpen] = useState(false);
    const toggle = () => { setOpen(!tooltipOpen) };

    const [tooltipOpen2 , setOpen2] = useState(false);
    const toggle2 = () => { setOpen2(!tooltipOpen2) };

    const [tooltipOpen3 , setOpen3] = useState(false);
    const toggle3 = () => { setOpen3(!tooltipOpen3) };

    const [tooltipOpen4 , setOpen4] = useState(false);
    const toggle4 = () => { setOpen4(!tooltipOpen4) };

    const [tooltipOpen5 , setOpen5] = useState(false);
    const toggle5 = () => { setOpen5(!tooltipOpen5) };

    const [country, setCountry] = useState();
    
    const getAllCountries = async () => {
      const res = await getCountryList();
      setCountry(res);
    }

    const [cats, setCats] = useState(null);

    const getAllCats = async () => {
      const res = await getCategoryList();
      console.log(res);
      setCats(res)
    }
    

    const [resImg, setResImg] = useState({ ad1:'' });
    
    
    // const [imgRatio, setImgRatio] = useState(0);
    // const [imgType, setImgType] = useState(0);

  const [dsUrl, setDsUrl] = useState('');
  const [csUrl, setCsUrl] = useState('');
  const [updated, setUpdated] = useState(false);

  const [dsUrlErr, setDsUrlErr] = useState(false);

  const submitAd = async (data) => {

    if(urlResImg.ad1 !== '' && imgs !== null) { 
      const img1 = await uploadImage(urlResImg.ad1);
      data.images = [{
        img:img1.image_path,
        type:4
      }];
    }

      if(conchk == true) {
        data['countries'] = 'All';
      } else {
        data['countries'] = txt.countries;
      }

      data['device_type'] =  (txt.device_type.length > 0) ? txt.device_type.join(',') : '';
      data['device_os'] =  (txt.device_os.length > 0) ? txt.device_os.join(',') : '';
      
      var testUrl = dsUrl.split('://');
      var testUrl2 = testUrl[1].split('/');
      var url = testUrl2[0];
      // console.log(txt) 
      if(csUrl.length == 0 || csUrl.indexOf(url) >= 0) {
        if(txt.countries != ''  || conchk == true) { 
          if(txt.device_type.length > 0 && txt.device_os.length > 0) {
            
            if((data.pricing_model === 'CPC' && parseFloat(data.cpc_amt) >= parseFloat(cpcost)) || data.pricing_model === 'CPM') {
              
              setLoading(true);
              setFsave(true)
              const uid = localStorage.getItem('uid');
              data['uid'] = uid;
              data['cid'] = cid;
              // data['campaign_type'] = campState.sts.campaign_type;
              // data['ad_type'] = campState.sts.ad_type;

              campState.setSts(data);
              setDsUrlErr(false);
              const res = await updateSocialCampaign(data)
              if(res.code === 200) {
                // showToast(1);
                setUpdated(true)
              } else {
                showToast(2);
              }
            } else {
              toast.error("Error! Invalid Bidding Amount.", {
                position: "top-right",
                autoClose: true,
                closeOnClick: true,
                hideProgressBar: true,
              });
            }
          } else {
            toast.error("Please fill all required fields.", {
              position: "top-right", autoClose: true,  closeOnClick: true, hideProgressBar: true,
            });
          }
        } else {
          setCntry(true);
        }
      } else {
        setDsUrlErr(true);
      }

      setFsave(false)
    

    setLoading(false);
    
  }
    
    // const [dtype, setDtype] = useState({});
    // const [ostype, setOsType] = useState();

    const [urlResImg, setUrlResImg] = useState({
      ad1:'',
    });
    
    const getCampInfo = async ( ) => { 
      setLoading(true);
      let uid = localStorage.getItem('uid');
      let res = await getCampaignInfo(uid, cid);
      
      if(res.code === 200) {
        let data = res.data;
        
        if(data.countries == 'All') {
          setConChk(true);
        }
        data.device_type = (data.device_type.length > 0) ? data.device_type.split(',') : [];
        data.device_os = (data.device_os.length > 0) ? data.device_os.split(',') : [];
        setUrlResImg(res.images);
        setTxt(data);
        setDsUrl(data.target_url);
        setCsUrl((data.conversion_url) ? data.conversion_url : '');
        setWebCat(data.cat_name);
        setCpinp(data.pricing_model);
        getCmpCost(data.pricing_model, data.cat_name)
        setBidvl(data.cpc_amt)
      }
      setLoading(false);
    } 


    const [popoverOpen , setPopoverOpen] = useState(false);

    const [webcat, setWebCat] = useState(null);
    const [cpinp, setCpinp] = useState(null);

    const [cpcost, setCPCost] = useState(0);
    const [cphcost, setCPHCost] = useState(0);
    const [bidvl, setBidvl] = useState(0);

    const getCmpCost = async(type, cat, tp=0) => {
      
      let res = await getCPCInfo(type, cat);
      if(res) {
        // console.log(res.amount);
        setCPCost(res.base_amt);
        setCPHCost(res.high_amt);

        if(tp == 1) {
          // setBidvl(res.high_amt);
          setBidvl(res.base_amt);
        }

      } else {
        setCPCost(0);
        setCPHCost(0);
      }

    }

    useEffect(()=>{
      const uid = localStorage.getItem('uid');
      console.log(appState);
      // setTxt({ ...campState.sts,
      //   // uid:uid,
      //   ad_title: (campState.sts.ad_title !== "") ? campState.sts.ad_title : stitle,
      //   ad_description: (campState.sts.ad_description !== "") ? campState.sts.ad_description : dtitle,
      //   target_url: (campState.sts.target_url !== "") ? campState.sts.target_url : durl,
      //   device_type: (campState.sts.device_type !== "") ? campState.sts.device_type.split(',') : [],
      //   device_os: (campState.sts.device_os !== "") ? campState.sts.device_os.split(',') : []
      // })
      getCampInfo();
      setConChk(false)
      getAllCountries()
      getAllCats()
    },[])
    return (
    <div>
      {(updated) ?
      <div className="d-flex justify-content-center align-items-center p-3">
      <BlockTitle tag="h6" className="text-center">
      <Row className="gy-3 mb-5 mt-5">
            <Col md="8"  className='text-center offset-md-2 pb-5 mt-5 mb-5' >
                  <FormGroup className='pl-5 pr-5'>
                      <Icon name="check-circle" className="text-primary" style={{ fontSize: '120px'}} />
                      {/* <img src={success} style={{width:'160px'}} /> */}
                      <h4 className='text-primary mt-3 mb-3' >
                        Campaign Updated Successfully!  
                      </h4>
                      <p style={{fontSize:'16px'}}>Campaign updated successfully and is currently under review.  Your campaign will be live as soon as our moderators verify it. You can edit or update your campaign anytime.</p>
                      <br />
                      <Link to={`${process.env.PUBLIC_URL}/campaigns`} className="mt-5">Back to Campaign</Link>
                      <br />
                  </FormGroup>
            </Col>
        </Row>
      </BlockTitle>
    </div>
      
      :
      <Form onSubmit={handleSubmit(submitAd)}>
        <Loader visible={loading} />
        <Row className="gy-3">
          <Col md="6">
            <FormGroup>

              <label className="form-label" htmlFor="fw-token-address">
                Campaign Category
              </label>
              <div className="form-control-wrap mb-3">

                <select className="form-control" name="website_category" ref={register({ required: true })} 
                onChange={(e)=> {
                  var index = e.target.selectedIndex;
                  if(e.target[index].text == 'Select Category') {
                    setWebCat(null);
                  } else {
                    setWebCat(e.target[index].text);
                    getCmpCost(cpinp, e.target[index].text)
                  }
                  }} >
                  <option value="" key={0}>Select Category</option>
                  {(cats !== null) ? cats.map((item)=> {
                    let sel = (parseInt(txt.website_category) == parseInt(item.value)) ? true : false;
                    return <option key={item.value} selected={sel} value={item.value}>{item.label}</option>
                  }
                    // <option key={key} {txt.website_category === item.label && 'selected'}></option>
                    // <option key={key}>{item.label}</option>
                  ) : ''}
                </select>
                {errors.website_category && <span className="sm-error">Please select a website category</span>}
              </div>
              
              <label className="form-label" htmlFor="fw-token-address">
                Campaign Name
              </label>

              <div className="form-control-wrap mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="fw-token-address"
                  name="campaign_name"
                  onChange={( e )=> {
                      // setTxt({...txt, campaign_name:e.target.value})
                  }}
                  ref={register({ required: true, pattern : /^[a-zA-Z0-9\. ]*$/ })}
                  defaultValue={txt.campaign_name}
                />
                {errors.campaign_name && <span className="sm-error">Please enter a campaign name</span>}
              </div>

              <label className="form-label" htmlFor="fw-token-address"> Social Ad Type </label>
              <div className="form-control-wrap mb-3">

                <select className="form-control" name="social_ad_type" ref={register({ required: true })}
                  onChange={(e)=>{
                    console.log(txt.social_ad_type);
                    setTxt({...txt, social_ad_type:e.target.value })
                  }}  >
                  <option value="" key={0} >Select Ad Type</option>
                  <option value="1" key={1} selected={(parseInt(txt.social_ad_type) === 1) ? true : false}>Classic</option>
                  <option value="2" key={2} selected={(parseInt(txt.social_ad_type) === 2) ? true : false}>Social</option> 
                </select>
                {errors.social_ad_type && <span className="sm-error">Please select a option</span>}
              </div>

              <div className='form-group'> 
                  <div className="mt-2 sm-drop-social-img ">
                    <img src={(urlResImg.ad1 != '') ? urlResImg.ad1 : AdView1} />
                  </div>
                  <a href='javascript:;' className='btn btn-primary mt-2'>
                    <input type="file" className='sm-input' onChange={(e) => {
                      // setImgRatio(1/1);
                      // setImgType(3);
                      getImgData(e);
                    }} />
                    Upload Image
                  </a>
                </div>

              <label className="form-label" htmlFor="fw-token-address">
              Ad Title <Icon name="info-fill" id="adtitle" className="text-primary" /> 
              </label>
              <div className="form-control-wrap">
              <Tooltip placement="auto"isOpen={tooltipOpen2} target="adtitle" toggle={toggle2}>
              Ad title should be short, punchy, and to catch the attention of your potential customers.
              </Tooltip>
                <input
                  type="text"
                  className="form-control"
                  id="fw-token-address"
                  name="ad_title"
                  onChange={(e)=> 
                    {
                      (getValues('ad_title') === '') ? setTxt({...txt, ad_title:stitle }) : setTxt({...txt, ad_title:getValues('ad_title') })
                    }
                  }
                  ref={register({ required: true })}
                  value={txt.ad_title}
                />
                {errors.ad_title && <span className="sm-error">Please enter a ad title</span>}
              </div>
                  
              <label className="form-label mt-3" htmlFor="fw-token-address">
              Ad Description <Icon name="info-fill" id="addesc" className="text-primary" />  
              </label>
              <Tooltip placement="auto"isOpen={tooltipOpen3} target="addesc" toggle={toggle3}>
              Describe your product/Service in few words.
              </Tooltip>
              <div className="form-control-wrap">
              <input
                  type="text"
                  className="form-control"
                  name="ad_description"
                  onChange={( e )=> 
                    {(getValues('ad_description') === '') ? setTxt({...txt, ad_description:stitle }) : setTxt({...txt, ad_description:getValues('ad_description') })
                  }}
                ref={register({ required: true })}
                value={txt.ad_description}
                />
                {errors.ad_description && <span className="sm-error">Please enter ad description</span>}
              </div>
              {(appState.sts.cmp_copy) ? '' : 
              <div className='alert alert-warning' style={{padding:10, paddingLeft:15, marginTop:25, marginBottom:0}}>
                <Icon name="info" />&nbsp;
                Destination URL can not be change.
              </div>  
              }
              <label className="form-label mt-3" htmlFor="fw-token-address">
              Destination URL <Icon name="info-fill" id="adurl" className="text-primary" /> 
              </label>
              <Tooltip placement="auto"isOpen={tooltipOpen4} target="adurl" toggle={toggle4}>
                Your website, blog or page url.
              </Tooltip>
              <div className="form-control-wrap">
              <input
                  type="text"
                  className="form-control"
                  name="target_url"
                  onChange={( e )=> {
                    // (getValues('target_url') === '') ? setTxt({...txt, target_url:stitle }) : setTxt({...txt, target_url:getValues('target_url') })
                }}
                ref={register({ required: true, pattern : /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/ })}
                value={txt.target_url}
                placeholder="e.g. - https://example.com"
                disabled={(appState.sts.cmp_copy) ? false : true}
                />
                {errors.target_url && <span className="sm-error">Please enter destination URL</span>}
              </div> 
              <label className="form-label mt-3" htmlFor="fw-token-address">
                Conversion URL <Icon name="info-fill" id="adcon" className="text-primary" />  
              </label>
              <Tooltip placement="auto"isOpen={tooltipOpen5} target="adcon" toggle={toggle5}>
                The URL will help us to track your Conversion. Place it on order/enquiry success page.
              </Tooltip>
              <div className="form-control-wrap">
              <input
                  type="text"
                  className="form-control"
                  id="fw-token-address"
                  name="conversion_url"
                  onChange={( e )=> {
                    setCsUrl(e.target.value);
                  }}
                  ref={register({ pattern : /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/})}
                  defaultValue={txt.conversion_url}
                  placeholder="e.g. - https://example.com"
                />
                {errors.conversion_url && <span className="sm-error">Please enter conversion URL</span>}
                { dsUrlErr && <span className="sm-error">Conversion URL domain should be same as destination URL.</span>}
              </div> 
                        
          <div className='row'>
              <div className='col-4'>
              <label className="form-label mt-3" htmlFor="fw-token-address">
                Pricing Model 
              </label>
                <div className="form-control-wrap">
                  <select className="form-control" name="pricing_model" disabled={webcat == null ? true : false} 
                      ref={register({ required: true })} style={{width:200}} onChange={(e) => {
                        getCmpCost(e.target.value, webcat, 1);
                        setCpinp(e.target.value);
                        if(e.target.value == '') {
                          setBidvl(0);
                        }
                      }} >
                      <option value="" key={0} selected={webcat == null ? true : false}  >Select Option</option>
                      <option key={1} selected={cpinp == 'CPM' ? true : false}>CPM</option>
                      <option key={2} selected={cpinp == 'CPC' ? true : false}>CPC</option>
                  </select>
                  {errors.pricing_model?.type === 'required' && <span className="sm-error">Please select pricing model</span>}
                
                </div> 
              </div>
              <div className='col-4' style={{display: (cpinp == 'CPM' ) ? 'none' : 'block'}}>
              <label className="form-label mt-3" htmlFor="fw-token-address"> Bidding Price </label>
                <div className="form-control-wrap">
                  <div className="input-group">
                  <input
                      type="number"
                      className="form-control"
                      name="cpc_amt"
                      onChange={( e )=> { 
                        // let ptrn = '^[0-9]*$';
                        // const val = ptrn.test(e.target.value);
                        // console.log(val)
                        setBidvl(e.target.value)  
                      }}
                      disabled={webcat == null || cpinp == 'CPM' ? true : false} 
                      // readOnly={cpinp == 'CPM' ? true : false}
                      onBlur={() => setPopoverOpen(false)}
                      onFocus={() => setPopoverOpen(true)}
                      ref={register({ valueAsNumber:true, setValueAs: v => parseInt(v) })}
                      value={bidvl} 
                      // disabled={true}
                      // style={{width:200}}
                      id="Popover1"
                  />
                </div>



                  {errors.cpc_price?.type === 'required' && <span className="sm-error">Please enter your bid amount</span>}
                  <Popover isOpen={popoverOpen} target="Popover1" >
                  <PopoverHeader>Optimal Rates</PopoverHeader>
                  <PopoverBody>
                    <ul>
                      <li>
                        <small>Recommended - &nbsp; <span className='text-success'>${cpcost}</span></small>
                      </li>
                      <li>
                        <small>Highest Bid - <span className='text-info float-right'>${cphcost}</span></small>
                      </li>
                    </ul>
                  </PopoverBody>
                </Popover>
                </div> 
              </div>

              <div className='col-4'>
              <label className="form-label mt-3" htmlFor="fw-token-address"> Daily Budget </label>

                <div className="form-control-wrap">
                  <input
                      type="number"
                      className="form-control"
                      name="daily_budget"
                      onChange={( e )=> {

                      }}
                      ref={register({ 
                        required: true, 
                        valueAsNumber:true, 
                        setValueAs: v => parseInt(v), 
                        min:15, 
                        pattern: {
                          value: /^(0|[1-9]\d*)(\.\d+)?$/
                        }  
                      })}
                      // value={cpcost} 
                      // disabled={true}
                      style={{width:200}}
                      defaultValue={txt.daily_budget}
                  />
                  {errors.daily_budget?.type === 'required' && <span className="sm-error">Please enter daily budget</span>}
                  {errors.daily_budget?.type === 'pattern' && <span className="sm-error">Amount should be numeric only</span>}
                  {errors.daily_budget?.type === 'min' && <span className="sm-error">Minimum $15 required</span>}
                </div> 
              </div>

            </div>
            <div className="row mt-4">
              <div className='col-md-12'>
              <Alert color='info' className='p-2 pl-3'>
                <div className='d-flex align-items-center' >

                  <Icon name="info" style={{fontSize:20, marginRight:15}} />
                  <small style={{paddingLeft:12, borderLeft:"1px solid #08A3BA"}}><b>CPC</b> : Cost Per Click <br/><b>CPM</b> : Cost Per Mille (mille = 1000 Impressions) </small>
                </div>
              </Alert>
              </div>
            </div>
              <div className="form-control-wrap mt-2" style={{ borderBottom: "1px solid #ddd"}} >&nbsp;</div>
                <div className="form-control-wrap mt-5">
                  <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input form-control" value={1} id="customSwitch2"
                      checked={conchk}
                      onChange={(e) => {
                          setConChk(!conchk)
                          if(e.target.checked) {
                            setTxt({...txt,
                              countries: 'All'
                            }) 
                          } else {
                            setTxt({...txt,
                              countries: ''
                            }) 
                          }
                        } 
                      }
                    />
                    <label className="custom-control-label" htmlFor="customSwitch2"> All Countries </label>
                  </div>
                </div>
                {(conchk == false) ? (
                  <div>
                    <label className="form-label mt-3" htmlFor="fw-token-address">
                      Countries
                    </label>
                    <div className="form-control-wrap">
                      <RSelect isMulti onChange={(val) => { 
                        if(val.length > 0) {
                          setTxt({...txt,
                            countries: JSON.stringify(val)
                          })
                        } else {
                          setTxt({...txt,
                            countries: ''
                          })
                        }
                      
                      setCntry(false);
                      }} options={country}
                      value={(txt.countries !== 'All' && txt.countries !== '') ? JSON.parse(txt.countries) : ''}
                      />
                      {cntry && <span className="sm-error">Please select atleast 1 country.</span>}

                    </div> 
                  </div>
                ) : (
                  <div></div>
                )}

              <label className="form-label mt-3" htmlFor="fw-token-address">
                Device Type
              </label>
              <div className="form-control-wrap">
                  <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked">
                    <input type="checkbox" className="custom-control-input" id="desktop" value="Desktop" 
                    onChange={(e)=> {

                      let dtype = txt.device_type;
                      if(e.target.checked == true) {

                        dtype.push(e.target.value)
                        console.log(dtype)
                        setTxt({ ...txt, device_type: dtype })
                        // setOs({...os, 
                        //   windows:1,
                        //   apple:1
                        //   })
                        } else {
                          let data = dtype.filter(item => item !== e.target.value)
                          setTxt({ ...txt, device_type: data })
                          console.log(data)
                        }
                      }} 
                      checked={txt.device_type.includes('Desktop')}
                    />
                    <label className="custom-control-label" htmlFor="desktop">
                    <Icon name="monitor"></Icon> Desktop &nbsp; 
                    </label>
                </div>

                <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked ml-2">
                    <input type="checkbox" className="custom-control-input" id="tablet" value="Tablet"
                      onClick={(e) => {
                        let dtype = txt.device_type;
                        if(e.target.checked == true) {
    
                          dtype.push(e.target.value)
                          console.log(dtype)
                          setTxt({ ...txt, device_type: dtype })
                          
                        } else {
                          let data = dtype.filter(item => item !== e.target.value)
                          setTxt({ ...txt, device_type: data })
                          console.log(data)
                        }
                      }}
                      checked={txt.device_type.includes('Tablet')}
                    />
                    <label className="custom-control-label" htmlFor="tablet">
                    <Icon name="tablet"></Icon> Tablet &nbsp; 
                    </label>
                </div>

                <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked ml-2">
                    <input type="checkbox" className="custom-control-input" id="mobile" value="Mobile"
                      onClick={(e) => {
                        let dtype = txt.device_type;
                        if(e.target.checked == true) {
    
                          dtype.push(e.target.value)
                          console.log(dtype)
                          setTxt({ ...txt, device_type: dtype })
                          
                        } else {
                          let data = dtype.filter(item => item !== e.target.value)
                          setTxt({ ...txt, device_type: data })
                          console.log(data)
                        }
                      }}
                      checked={txt.device_type.includes('Mobile')}
                    />
                    <label className="custom-control-label" htmlFor="mobile">
                    <Icon name="mobile"></Icon> Mobile &nbsp;
                    </label>
                {txt.device_type.length === 0 && <span className="invalid"  id="fv-com-error"> Please select a device type</span>}
                </div>
                <br/>
              </div>

              <label className="form-label mt-3" htmlFor="fw-token-address">
                Device OS
              </label>
              <div className="form-control-wrap">
                <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked">
                      <input type="checkbox" className="custom-control-input" value="android" id="android" 

                          onClick={(e) => {
                          let dos = txt.device_os;
                          if(e.target.checked == true) {
      
                            dos.push(e.target.value)
                            console.log(dos)
                            setTxt({ ...txt, device_os: dos })
                            
                          } else {
                            let data = dos.filter(item => item !== e.target.value)
                            setTxt({ ...txt, device_os: data })
                            console.log(data)
                          }
                        }}
                        checked={txt.device_os.includes('android')}
                      />
                      <label className="custom-control-label" htmlFor="android">
                      <Icon name="android"></Icon> &nbsp;
                      </label>
                  </div>

                  <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked ml-2">
                      <input type="checkbox" className="custom-control-input" id="apple" value="apple"
                        onClick={(e) => {
                          let dos = txt.device_os;
                          if(e.target.checked == true) {
      
                            dos.push(e.target.value)
                            console.log(dos)
                            setTxt({ ...txt, device_os: dos })
                            
                          } else {
                            let data = dos.filter(item => item !== e.target.value)
                            setTxt({ ...txt, device_os: data })
                          }
                        }}
                        checked={txt.device_os.includes('apple')}
                      />
                      <label className="custom-control-label" htmlFor="apple">
                      <Icon name="apple"></Icon> &nbsp;
                      </label>
                  </div>

                  <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked ml-2">
                      <input type="checkbox" className="custom-control-input" id="windows" value="windows"
                        onClick={(e) => {
                          let dos = txt.device_os;
                          if(e.target.checked == true) {
      
                            dos.push(e.target.value)
                            // console.log(dos)
                            setTxt({ ...txt, device_os: dos })
                            
                          } else {
                            let data = dos.filter(item => item !== e.target.value)
                            setTxt({ ...txt, device_os: data })
                            // console.log(data)
                          }
                        }} 
                        checked={txt.device_os.includes('windows')}
                      />
                      <label className="custom-control-label" htmlFor="windows">
                      <Icon name="windows"></Icon> &nbsp;
                      </label>
                      {/* {txt.device_os.length === 0 && <span className="invalid"  id="fv-com-error"> Please select a device OS</span>} */}
                  </div>
                  <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked ml-2">
                      <input type="checkbox" className="custom-control-input" id="linux" value="linux"
                        onClick={(e) => {
                          let dos = txt.device_os;
                          if(e.target.checked == true) {
                            dos.push(e.target.value)
                            setTxt({ ...txt, device_os: dos })
                          } else {
                            let data = dos.filter(item => item !== e.target.value)
                            setTxt({ ...txt, device_os: data })
                          }
                        }} 
                        checked={txt.device_os.includes('linux')}
                      />
                      <label className="custom-control-label" htmlFor="linux">
                      <Icon name="linux"></Icon> &nbsp;
                      </label>
                      {txt.device_os.length === 0 && <span className="invalid"  id="fv-com-error"> Please select a device OS</span>}
                  </div>
              </div>
            </FormGroup>
          </Col>
          <Col md="1"></Col>
          <Col md="5">
            <div>
            <div className="form-group">
                <label className="form-label" htmlFor="fw-telegram-username">
                  Ad Preview
                </label>
                <div className="form-control-wrap">
                        {(parseInt(txt.social_ad_type) === 1) ? <div className='row sm-social1'>
                          <div className='col-md-3 p-2' >
                            <img src={(urlResImg.ad1 !== '') ? urlResImg.ad1 : 'https://i.pinimg.com/originals/19/cf/78/19cf789a8e216dc898043489c16cec00.jpg'} className='pro-img' />
                          </div>
                          <div className='col-md-9 pl-0 pt-2 pr-2'>
                            <h4 className='sm-soc-title p-0'>{txt.ad_title}</h4>
                            <p className='sm-soc-desc'>{txt.ad_description}</p>
                          </div>
                        </div> : 
                        <div className='row sm-social2'>
                          <div className='col-md-9 pro2-msg'>
                            <h4 className='sm-soc-title p-0'>{txt.ad_title}</h4>
                            <p className='sm-soc-desc'>{txt.ad_description}</p>
                          </div>
                          <div className='col-md-3 p-2' >
                            <div className='img-outer float-right'>
                              <img src={(urlResImg.ad1 !== '') ? urlResImg.ad1 : 'https://i.pinimg.com/originals/19/cf/78/19cf789a8e216dc898043489c16cec00.jpg'} className='pro2-img ' />
                            </div>
                          </div>
                        </div>
                        }
            

                    
                          {/* <div md>asd</div> */}

                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div className="actions clearfix">
          <ul>
            <li>
              <Button color="primary" type='subit' disabled={fsave}>
              {(fsave == true) ? <span><Spinner size="sm" /> &nbsp; Saving</span> : 'Submit'}
              </Button>
            </li>
            <li>
              <Link to={`${process.env.PUBLIC_URL}/campaigns`} className='btn btn-lg btn-primary' onClick={clkFunc.prev} disabled={fsave}>
                Back
              </Link>
            </li>
          </ul>
        </div>

        <Modal size='md' isOpen={isOpen} toggle={modal} backdrop="static">
          <ModalHeader
            toggle={modal}
            close={
              <button className="close" onClick={modal}>
                <Icon name="cross" />
              </button>
            }
          >
          CROP IMAGE
          </ModalHeader>
          <ModalBody>
            <div className='p-5' style={{height:'320px'}}>
              <Cropper
                image={imgs}
                crop={crop}
                aspect={1/1}
                onCropChange={onCropChange}
                onCropComplete={onCropComplete}
                showGrid={false}
                style={{width:'100%', marginTop:'20px'}}
              />
            </div>
          </ModalBody>
          <ModalFooter className="bg-light">
            <a href='#' color='danger' onClick={modal}><Icon name="cross" /> CANCEL</a>
            &nbsp; &nbsp; &nbsp;
            <a href='#' color='danger' onClick={saveImg2Server}><Icon name="crop" /> CROP IMAGE</a>
          </ModalFooter>
        </Modal>

      </Form>
       }
    </div>
      )
}