import React, { useContext, useState, useEffect } from 'react'
import CampaignContext from '../../context/CampaignContext'
import {
    Row,
    Col,
    Tooltip,
    Button,
    FormGroup,
    Form,
    Spinner
  } from "reactstrap";
import { RSelect, Icon } from '../../components/Component';
import { createPopupCampaign, getCategoryList, getCountryList } from '../../app/api';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from "react-toastify";
import popAd from '../../images/popunder-ad1.png';


export default function PopupCampaign ({clkFunc}) {

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
    const [txt, setTxt] = useState({
        website_category:'',
        campaign_name:'',
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
      if(conchk == true) {
        data['countries'] = 'All';
      } else {
        data['countries'] = txt.countries;
      }

      data['device_type'] =  (txt.device_type.length > 0) ? txt.device_type.join(',') : '';
      data['device_os'] =  (txt.device_os.length > 0) ? txt.device_os.join(',') : '';
      
      if(txt.countries != ''  || conchk == true) {
      
        if(txt.device_type.length > 0 && txt.device_os.length > 0) {
          setFsave(true)
          const uid = localStorage.getItem('uid');
          data['uid'] = uid;
          data['campaign_type'] = campState.sts.campaign_type;
          data['ad_type'] = campState.sts.ad_type;
  
          campState.setSts(data);
          const res = await createPopupCampaign(data)
          if(res.code === 200) {
            clkFunc.next();
            showToast(1)
          } else {
            showToast(2)
          }
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
        
      setFsave(false)

    }
    
    const [dtype, setDtype] = useState({});
    const [ostype, setOsType] = useState();

    useEffect(()=>{
      const uid = localStorage.getItem('uid');
      setTxt({ ...campState.sts,
        target_url: (campState.sts.target_url !== "") ? campState.sts.target_url : '',
        device_type: (campState.sts.device_type !== "") ? campState.sts.device_type.split(',') : [],
        device_os: (campState.sts.device_os !== "") ? campState.sts.device_os.split(',') : []
      })

      console.log(campState.sts.countries.length);
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

              <select className="form-control" name="website_category" ref={register({ required: true })}  >
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
                  // (getValues('target_url') === '') ? setTxt({...txt, target_url:stitle }) : setTxt({...txt, target_url:getValues('target_url') })
              }}
              ref={register({ required: true, pattern : /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/ })}
              defaultValue={campState.sts.target_url}
              placeholder="e.g. - https://example.com"
              />
              {errors.target_url && <span className="sm-error">Please enter destination URL</span>}
            </div> 
            {/* <label className="form-label mt-3" htmlFor="fw-token-address">
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
                    setTxt({...txt,
                      conversion_url:e.target.value
                    });
              }}
              ref={register({ required: true, pattern : /\b(https?):\/\/[\-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[\-A-Za-z0-9+&@#\/%=~_|]/ })}
              defaultValue={txt.conversion_url}
              />
              { errors.conversion_url && <span className="sm-error">Please enter conversion url</span>}
            </div>  */}
            <label className="form-label mt-3" htmlFor="fw-token-address">
              Daily Budgets <Icon name="info-fill" id="dbuz" className="text-primary" />  
            </label>
            <Tooltip placement="auto"isOpen={tooltipOpen} target="dbuz" toggle={toggle}>
              Set daily budget for your ad campaign.
            </Tooltip>
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
                defaultValue={txt.daily_budget}
            />
              {errors.daily_budget?.type === 'required' && <span className="sm-error">Please enter daily budget</span>}
                {errors.daily_budget?.type === 'pattern' && <span className="sm-error">Amount should be numeric only</span>}
                {errors.daily_budget?.type === 'min' && <span className="sm-error">Minimum $15 required</span>}
            </div> 
          
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
            <div className="form-control-wrap mb-3">
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
                </div>
              }
              {txt.device_type.includes('Desktop') &&
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
              }
            </div>
          </FormGroup>
        </Col>
        
        <Col md="6">
          <div className='p-2 pt-4'>
            <p>
            <b>Pop-under ads</b> stands are seamless backdrop displays.
              Pop-under traffic is as good an ad format as pop-ups.
              Pop-under helped many websites to increase subscriptions, leads &amp; traffic upto 160%. 
            </p>
            <div className="form-group">
              <img src={popAd} />
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