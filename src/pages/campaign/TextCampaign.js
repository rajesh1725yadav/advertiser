import React, { useContext, useState, useEffect } from 'react'
import CampaignContext from '../../context/CampaignContext'
import {
    Row,
    Col,
    Tooltip,
    Button,
    FormGroup,
    Form,
    Spinner,
    Popover,
    PopoverBody,
    PopoverHeader, 
    Alert
  } from "reactstrap";
import { RSelect, Icon } from '../../components/Component';
import { createCampaign, getCategoryList, getCountryList, getCPCInfo } from '../../app/api';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from "react-toastify";

export default function TextCampaign ({clkFunc}) {

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

    const stitle = 'Your amazing ad title here';
    const dtitle = 'Start Building Awesome Ads. Impress Your Clients with Screenshots of Great Ads. Highlight Features of Your Service/Product.';
    const durl = 'https://www.7searchppc.com';
    const [txt, setTxt] = useState({
        website_category:'',
        campaign_name:'',
        ad_title:stitle,
        ad_description:dtitle,
        target_url:durl,
        conversion_url:'',
        daily_budget:'',
        device_type:[],
        device_os:[]
    });

    const [os, setOs] = useState({
      android:0,
      windows:0,
      apple:0
    })
    
    const [conchk, setConChk] = useState(true);
    const [cntry, setCntry] = useState(false);
    const campState = useContext(CampaignContext);

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

    const [popoverOpen , setPopoverOpen] = useState(false);
    // const popToggle = () => { setPopoverOpen(!popoverOpen) };

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
    
    const submitAd = async (data) => {

      var testUrl = dsUrl.split('://');
      var testUrl2 = testUrl[1].split('/');
      var url = testUrl2[0];
      
      if(conchk == true) {
        data['countries'] = 'All';
      } else {
        data['countries'] = txt.countries;
      }

      data['device_type'] =  (txt.device_type.length > 0) ? txt.device_type.join(',') : '';
      data['device_os'] =  (txt.device_os.length > 0) ? txt.device_os.join(',') : '';
      
    if(csUrl.length == 0 || csUrl.indexOf(url) >= 0) {
     
      if(txt.countries != ''  || conchk == true) { 

        if(txt.device_type.length > 0 && txt.device_os.length > 0) {

          if((data.pricing_model === 'CPC' && parseFloat(data.cpc_amt) >= parseFloat(cpcost)) || data.pricing_model === 'CPM') {

            setFsave(true)
            const uid = localStorage.getItem('uid');
            data['uid'] = uid;
            data['campaign_type'] = campState.sts.campaign_type;
            data['ad_type'] = campState.sts.ad_type;
    
            campState.setSts(data);

            const res = await createCampaign(data);
            if(res.code === 200) {
              showToast(1)
              clkFunc.next()
            } else {
              showToast(2)
            }
          
          } else {
            toast.error("Error! Invalid Bidding Amount.", {
              position: "top-right",
              autoClose: true,
              closeOnClick: true,
              hideProgressBar: true,
            });
          }

          // clkFunc.next()
        } else {
          toast.error("Please fill all required fields.", {
            position: "top-right",
            autoClose: true,
            closeOnClick: true,
            hideProgressBar: true,
          });
        
        }
      } else {
        setCntry(true);
      }
         
    } else {
      setDsUrlErr(true);
    }
      setFsave(false)
      // console.log(data.pricing_model);

    }
    
    const [dsUrl, setDsUrl] = useState('');
    const [csUrl, setCsUrl] = useState('');

    const [dsUrlErr, setDsUrlErr] = useState(false);

    const [webcat, setWebCat] = useState(null);
    const [cpinp, setCpinp] = useState(null);

    const [cpcost, setCPCost] = useState(0);
    const [cphcost, setCPHCost] = useState(0);
    const [bidvl, setBidvl] = useState(0);
    const [wcount, setWcount] = useState('');
    const [wcount2, setWcount2] = useState('');

    const getCmpCost = async(type, cat) => {
      let res = await getCPCInfo(type, cat);
      if(res) {
        // console.log(res.amount);
        setCPCost(res.base_amt);
        setCPHCost(res.high_amt);
        // setBidvl(res.high_amt);
        setBidvl(res.base_amt);
      } else {
        setCPCost(0);
        setCPHCost(0);
      }

    }



    useEffect(() => {
      // console.log(webcat);
      const uid = localStorage.getItem('uid');
      setTxt({ ...campState.sts,
        // uid:uid,
        ad_title: (campState.sts.ad_title !== "") ? campState.sts.ad_title : stitle,
        ad_description: (campState.sts.ad_description !== "") ? campState.sts.ad_description : dtitle,
        target_url: (campState.sts.target_url !== "") ? campState.sts.target_url : durl,
        device_type: (campState.sts.device_type !== "") ? campState.sts.device_type.split(',') : [],
        device_os: (campState.sts.device_os !== "") ? campState.sts.device_os.split(',') : []
      })
      
      // setConChk(false)
      // if(campState.sts.countries.length > 0) {
      // } else {
        // setConChk(true)
      // }

      // console.log(campState.sts.countries.length);
      getAllCountries()
      getAllCats()
    },[])

    return (<Form onSubmit={handleSubmit(submitAd)}>
      <Row className="gy-3">
        <Col md="6">
          <FormGroup>

            <label className="form-label" htmlFor="fw-token-address">
              Campaign Category
            </label>
            <div className="form-control-wrap mb-3">

              <select className="form-control" name="website_category" ref={register({ required: true })} onChange={(e) => {
                var index = e.target.selectedIndex;
                if(e.target[index].text == 'Select Category') {
                  setWebCat(null);
                } else {
                  setWebCat(e.target[index].text);
                }

              }}  >
                <option value="" key={0}>Select Category</option>
                {(cats !== null) ? cats.map((item)=> {
                  let sel = (txt.website_category == item.label) ? true : false;
                  return <option key={item.value} defaultValue={sel} value={item.value}>{item.label}</option>
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

            <div className="form-control-wrap">
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
            <label className="form-label mt-3" htmlFor="fw-token-address">
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
                maxLength="60"
                onChange={(e)=> 
                  {
                    
                    if(getValues('ad_title') === '') {
                      setTxt({...txt, ad_title:stitle }) 
                    } else {
                      setTxt({...txt, ad_title:getValues('ad_title') })
                    }
                    
                    setWcount(getValues('ad_title'))
                  }
                }
                ref={register({ required: true })}
                defaultValue={campState.sts.ad_title}
              />
              {errors.ad_title && <span className="sm-error">Please enter a ad title</span>}
              <div className='text-dark'>Remaining Characters : {txt && (60-wcount.length) }</div>
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
                maxLength="150"
                onChange={( e )=> 
                  {(getValues('ad_description') === '') ? setTxt({...txt, ad_description:stitle }) : setTxt({...txt, ad_description:getValues('ad_description') })
                  setWcount2(getValues('ad_description'));
                }}
              ref={register({ required: true })}
              defaultValue={campState.sts.ad_description}
              />
              {errors.ad_description && <span className="sm-error">Please enter ad description</span>}
              <div className='text-dark'>Remaining Characters : {txt && (150-wcount2.length) }</div>
            </div>

            <label className="form-label mt-3" htmlFor="fw-token-address">
            Destination URL <Icon name="info-fill" id="adurl" className="text-primary" /> 
            </label>
            <Tooltip placement="auto"isOpen={tooltipOpen4} target="adurl" toggle={toggle4}>
              Your website, blog or page URL.
            </Tooltip>
            <div className="form-control-wrap">
            <input
                type="text"
                className="form-control"
                name="target_url"
                onChange={( e )=> {
                  (getValues('target_url') === '') ? setTxt({...txt, target_url:stitle }) : setTxt({...txt, target_url:getValues('target_url') })
                  setDsUrl(e.target.value);
                }}
              ref={register({ required: true, pattern : /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/ }) }
              defaultValue={campState.sts.target_url}
              placeholder="e.g. - https://example.com"
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
                    setTxt({...txt,
                      conversion_url:e.target.value
                    });
                    setDsUrlErr(false);
                  }}
                  ref={register({ pattern : /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/ })}
                  defaultValue={txt.conversion_url}
                  placeholder="e.g. - https://example.com"
              />
              { errors.conversion_url && <span className="sm-error">Please enter a conversion URL</span>}
              { dsUrlErr && <span className="sm-error">Conversion URL should be same as destination URL.</span>}
            </div>
           
          <div className='row'>
            <div className='col-4'>
            <label className="form-label mt-3" htmlFor="fw-token-address">
              Pricing Model 
            </label>
              <div className="form-control-wrap">
                <select className="form-control" name="pricing_model" disabled={webcat == null ? true : false} 
                    ref={register({ required: true })} style={{width:200}} onChange={(e) => {
                      getCmpCost(e.target.value, webcat);
                      setCpinp(e.target.value);
                    }} >
                    <option value="" key={0} >Select Option</option>
                    <option key={1}>CPM</option>
                    <option key={2}>CPC</option>
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
                      {/* <div className="input-group-append">
                        <div className='input-group-text'>
                          <div className='pl-1 pr-1'>
                            <div className='p-0' style={{height:'15px'}}>
                              <Icon name="caret-up-fill" onClick={() =>{ 
                                  if(webcat != null) {
                                    setCPHCost(cphcost+1)
                                  }
                                }} />
                            </div>
                            <div className='p-0' style={{height:'15px'}}>
                              <Icon name="caret-down-fill" onClick={() => { 
                                if(webcat != null) {
                                  if(cphcost >= 1) {
                                    setCPHCost(cphcost-1)
                                  }
                                }
                              }} />
                            </div>
                          </div>
                        </div>
                      </div> */}
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
                      console.log(errors.daily_budget)
                    }}
                    ref={register({ 
                      required: true, 
                      valueAsNumber:true, 
                      // setValueAs: v => parseInt(v), 
                      min:15, 
                      pattern:{
                        value: /^(0|[1-9]\d*)(\.\d+)?$/
                      } 
                    })}
                    // value={cpcost} 
                    // disabled={true}
                    style={{width:200}}
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
            {/* <label className="form-label mt-3" htmlFor="fw-token-address">
              Daily Budgets <Icon name="info-fill" id="dbuz" className="text-primary" />  
            </label>
            <Tooltip placement="auto"isOpen={tooltipOpen} target="dbuz" toggle={toggle}>
              Set daily budget for your ad campaign.
            </Tooltip> */}
            {/* <div className="form-control-wrap">
            <input
                type="number"
                className="form-control"
                name="daily_budget"
                onChange={( e )=> {
                }}
                ref={register({ required: true, valueAsNumber:true, setValueAs: v => parseInt(v), min:3 })}
                defaultValue={txt.daily_budget}
            />
              {errors.daily_budget?.type === 'required' && <span className="sm-error">Please enter daily budget</span>}
              
              
            </div>  */}
              
            
          </FormGroup>
        </Col>
        
        <Col md="6">
          <div>
          <div className="form-group">
              <label className="form-label" htmlFor="fw-telegram-username">
                Ad Preview
              </label>
              <div className="form-control-wrap">
                  <div className='sm-adbox'>
                    <p className='adp-url'><b>Ad.</b> <span>{txt.target_url}</span></p>
                      <h4 className='adp-title'>{txt.ad_title}</h4>
                      <p className='adp-desc'>{txt.ad_description}</p>
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
                    }} 
                    name="country"
                    options={country}
                    value={(txt.countries !== 'All' && txt.countries !== '') ? JSON.parse(txt.countries) : ''}
                    ref={register({ required: true })}
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
                      setOs({...os, 
                        windows:1,
                        apple:1
                        })
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
            {(txt.device_type.includes('Mobile') || txt.device_type.includes('Tablet')) &&
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
              }
              {(txt.device_type.includes('Desktop') || txt.device_type.includes('Mobile') || txt.device_type.includes('Tablet')) &&
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
              }
              {txt.device_type.includes('Desktop') &&
                <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked ml-2">
                    <input type="checkbox" className="custom-control-input" id="windows" value="windows"
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
                      checked={txt.device_os.includes('windows')}
                    />
                    <label className="custom-control-label" htmlFor="windows">
                    <Icon name="windows"></Icon> &nbsp;
                    </label>
                    {/* {txt.device_os.length === 0 && <span className="invalid"  id="fv-com-error"> Please select a device OS</span>} */}
                </div>
              }
              {txt.device_type.includes('Desktop') &&
                <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked ml-2">
                    <input type="checkbox" className="custom-control-input" id="linux" value="linux"
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
                      checked={txt.device_os.includes('linux')}
                    />
                    <label className="custom-control-label" htmlFor="linux">
                    <Icon name="linux"></Icon> &nbsp;
                    </label>
                    {txt.device_os.length === 0 && <span className="invalid"  id="fv-com-error"> Please select a device OS</span>}
                </div>
              }
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
            <Button color="primary" onClick={clkFunc.prev} disabled={fsave}>
              Previous
            </Button>
          </li>
        </ul>
      </div>
      </Form>)
}