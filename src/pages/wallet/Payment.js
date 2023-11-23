import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import img1 from '../../images/before.png';
import img2 from '../../images/after.png';
import phonepeImg from '../../images/phonepe.png';
import airpayImg from '../../images/airpay.png';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
} from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  CodeBlock,
  OverlineTitle,
  OutlinedInput,
  Icon,
  Button,
} from "../../components/Component";

import { useForm } from "react-hook-form";
import { Data } from "@react-google-maps/api";
import { useHistory } from "react-router";
import PayUPay from "./PayUPay";
import StripePay from "./StripePay";
import BtcQrPay from "./BtcQrPay";
import CoinPay from "./CoinPay";
import { getUserCountry, getUserInfo } from "../../app/api";
import CopyToClipboard from "react-copy-to-clipboard";
import Phonepe from "./Phonepe";
import AirPay from "./AirPay";

export default function Payment() {
  const [payData, setPayData] = useState({
    pay_mode: null,
    amt: 0,
    country:'US'
  });

  const [cty, setCty] = useState();
  const getUserCountryInfo = async () => {
    let uid = localStorage.getItem('uid');
    const res = await getUserInfo(uid);
    let country = res.country.toLowerCase();
    setCty(country);
  }

  useEffect(()=>{

    getUserCountryInfo();
  },[])

  return (
    <React.Fragment>
      <Head title="My Wallet" />
      <Content >
        {payData.pay_mode === "cc_pay_us" ? (
          <StripePay payData={payData} setPayData={setPayData} />
        ) : payData.pay_mode === "cc_pay_in" ? (
          <PayUPay payData={payData} setPayData={setPayData} />
        ) : payData.pay_mode === "btc_pay_qr" ? (
          <BtcQrPay payData={payData} setPayData={setPayData} />
        ) : payData.pay_mode === "btc_pay_us" ? (
          <CoinPay payData={payData} setPayData={setPayData} />
        ) : payData.pay_mode === "phonepe" ? (
          <Phonepe payData={payData} setPayData={setPayData} />
        ) : payData.pay_mode === "airpay" ? (
          <AirPay payData={payData} setPayData={setPayData} />
        ) : (
          <PayForm payData={payData} setPayData={setPayData} country={cty} />
        )}
      </Content>
    </React.Fragment>
  );
}

function PayForm({ payData, setPayData, country }) {
  const [pmod, setPmod] = useState("cc_pay_us");
  const { errors, register, handleSubmit, getValues } = useForm();

  const submitAd = (data) => {
    setPayData({payData,
      pay_mode: pmod,
      amt: data.amount,
      country: country
    });
  };

  const [uamt, setUAmt] = useState(1000);

  // const [copyText] = useState(props.children);
  const [copyState, setCopyState] = useState(false);
  const onCopyClick = (code) => {
    setCopyState(code);
    // setTimeout(() => setCopyState(false), 2000);
  };

  useEffect(() => {}, []);

  return (
    <Block size="lg">
      <Form onSubmit={handleSubmit(submitAd)}>
        <Row className="">
        <Col md="6" className="order-md-2">
            <Card className="card-bordered mb-3 p-3">
              <CardTitle tag="h5" className="text-primary"> Cashback &amp; Offers</CardTitle>
              <p className="lead fw-bold mb-1"> 
                Get upto 10% extra in your wallet on deposit of <span style={{color: "#bf4343"}}>$100</span> or above. Use this
              </p>
              <p className="lead fw-bold mt-0"> coupon code &nbsp;
              <CopyToClipboard text="WIN10" onCopy={() => onCopyClick('WIN10')}>
                <a href="#">
                {copyState =='WIN10' ?
                <>
                <span style={{border: "2px dashed #3DAF25",borderRight:0,padding: "4px 10px",background: "#fcf3f4",color: "#3DAF25"}}>WIN10</span>
                <span style={{border: "2px solid #3DAF25",padding: "4px 10px",background: "#3DAF25",color: "#fff"}}>Copied</span>
                </>
                :
                <>
                <span style={{border: "2px dashed #bf4343",borderRight:0,padding: "4px 10px",background: "#fcf3f4",color: "#bf4343"}}>WIN10</span>
                <span style={{border: "2px solid #bf4343",padding: "4px 10px",background: "#bf4343",color: "#fff"}}>Copy</span>
                </>
                }
                </a>
                </CopyToClipboard>
              </p>
              <p className="lead fw-bold mb-1"> Get flat 10% extra in your wallet on deposit of <span style={{color: "#bf4343"}}>$500</span> or above. Use this</p>
              <p className="lead fw-bold mb-2"> coupon code &nbsp;
              <CopyToClipboard text="GET10" onCopy={() => onCopyClick('GET10')}>
                <a href="#">
                {copyState =='GET10' ?
                <>
                <span style={{border: "2px dashed #3DAF25",borderRight:0,padding: "4px 10px",background: "#fcf3f4",color: "#3DAF25"}}>GET10</span>
                <span style={{border: "2px solid #3DAF25",padding: "4px 10px",background: "#3DAF25",color: "#fff"}}>Copied</span>
                </>
                :
                <>
                <span style={{border: "2px dashed #bf4343",borderRight:0,padding: "4px 10px",background: "#fcf3f4",color: "#bf4343"}}>GET10</span>
                <span style={{border: "2px solid #bf4343",padding: "4px 10px",background: "#bf4343",color: "#fff"}}>Copy</span>
                </>
                }
                </a>
              </CopyToClipboard>
              
              </p>
              </Card>
                {(uamt >= 500) ?
                  <img src={img2} class="d-none d-md-block"/>
                  :
                  <img src={img1} class="d-none d-md-block"/>
                }
          </Col>
          <Col sm="5" className="mb-4">
            <Card className="card-bordered">
              <CardHeader className="border-bottom"> Wallet Payment </CardHeader>
              <CardBody className="card-inner">
                <CardTitle tag="h5">Add Payment</CardTitle>
                <CardText>Add payment to your wallet using the available payment methods.</CardText>

                <div className="row mt-4">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label htmlFor="default-0" className="form-label">
                        Enter Amount ($)
                      </Label>
                      <div className="form-control-wrap">
                        <input
                          className="form-control"
                          type="number"
                          name="amount"
                          ref={register({
                            required: true,
                            valueAsNumber: true,
                            min: 50,
                            pattern: {
                              value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            },
                          })}
                          placeholder="$50 Minimum"
                          value={uamt}
                          onChange={(e)=> setUAmt(e.target.value)}
                        />
                        {errors.amount?.type === "pattern" && (
                          <span className="sm-error">Amount should be numeric only</span>
                        )}
                        {errors.amount?.type === "min" && <span className="sm-error">Minimum $50 required</span>}
                        {errors.amount?.type === "required" && <span className="sm-error">Please enter amount</span>}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label htmlFor="default-0" className="form-label">
                        Tax ID (Optional)
                      </Label>
                      <div className="form-control-wrap">
                        <input className="form-control" type="text" name="gst_no" id="default-0" placeholder="Tax ID" />
                      </div>
                    </FormGroup>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-12">
                  <div className="form-control-wrap mb-4">
                    <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked">
                          <input type="checkbox" className="custom-control-input" value="test" id="test"  checked={(uamt === 500) ? true : false} 
                          onClick={()=> {
                            setUAmt(500)
                          }} />
                          <label className="custom-control-label" htmlFor="test">
                          &nbsp; <b className="pl-1 pr-1">$500</b> &nbsp;
                          </label>
                      </div>

                      
                      <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked pl-1 flex-column">
                          
                          <input type="checkbox" className="custom-control-input" value="android" id="d10"  checked={(uamt === 1000) ? true : false} 
                          onClick={()=> {
                            setUAmt(1000)
                          }} />
                          <label className="custom-control-label" htmlFor="d10">
                          &nbsp; <b className="pl-1 pr-1">$1000</b> &nbsp;
                          </label>
                          <div class="btn-primary text-center fw-bold text-white" style={{borderRadius: "0 0 5px 5px",fontSize: "11px", marginTop:"-3px"}}>Popular!</div>
                      </div>
                      <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked pl-1">
                          <input type="checkbox" className="custom-control-input" value="android" id="d15"   checked={(uamt === 1500) ? true : false} 
                          onClick={()=> {
                            setUAmt(1500)
                          }}
                          />
                          <label className="custom-control-label" htmlFor="d15">
                          &nbsp; <b className="pl-1 pr-1">$1500</b> &nbsp;
                          </label>
                      </div>
                      <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked pl-1">
                          <input type="checkbox" className="custom-control-input" value="android" id="d20"   checked={(uamt === 2000) ? true : false} 
                          onClick={()=> {
                            setUAmt(2000)
                          }}
                           />
                          <label className="custom-control-label" htmlFor="d20">
                          &nbsp; <b className="pl-1 pr-1">$2000</b> &nbsp;
                          </label>
                      </div>
                      <div className="custom-control custom-checkbox custom-control-pro custom-control-pro-icon no-control checked pl-1">
                          <input type="checkbox" className="custom-control-input" value="android" id="d50"  checked={(uamt === 5000) ? true : false}  onClick={()=> {
                            setUAmt(5000)
                          }} />
                          <label className="custom-control-label" htmlFor="d50">
                          &nbsp; <b className="pl-1 pr-1">$5000</b> &nbsp;
                          </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <blockquote className="blockquote text-center">
                      <footer className="blockquote-footer text-primary"> Available Payment Option </footer>
                    </blockquote>
                    <ul className="custom-control-group custom-control-vertical w-100">
                      <li>
                        <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                          <input
                            type="radio"
                            className="custom-control-input"
                            name="paymentCheck"
                            id="paymentCheck1"
                            onClick={() => {
                              setPmod("cc_pay_us");
                            }}
                            defaultChecked={pmod == "cc_pay_us" ? true : false}
                          />
                          <label className="custom-control-label" htmlFor="paymentCheck1">
                            <span>
                              Credit/Debit Card <span className="text-danger">(International)</span>
                            </span>
                            <Icon className="icon-lg  d-none d-lg-block" name="american-express"></Icon>
                            <Icon className="icon-lg  d-none d-lg-block" name="cc-mc"></Icon>
                            <Icon className="icon-lg  d-none d-lg-block" name="cc-visa"></Icon>
                            <Icon className="icon-lg  d-none d-lg-block" name="cc-discover"></Icon>
                          </label>
                        </div>
                      </li>
                      
                      <li>
                        <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                          <input
                            type="radio"
                            className="custom-control-input"
                            name="paymentCheck"
                            id="paymentCheck2"
                            onClick={() => {
                              setPmod("cc_pay_in");
                            }}
                            defaultChecked={pmod == "cc_pay_in" ? true : false}
                          />
                          <label className="custom-control-label" htmlFor="paymentCheck2">
                            <span>
                              Credit/Debit Card/Wallet/UPI <span className="text-danger">(India Only)</span>
                            </span>
                            <Icon className="icon-lg  d-none d-lg-block" size="lg" name="cc-mc"></Icon>
                            <Icon className="icon-lg  d-none d-lg-block" name="cc-visa"></Icon>
                            <Icon className="icon-lg  d-none d-lg-block" name="google-pay-fill"></Icon>
                            <Icon className="icon-lg  d-none d-lg-block" name="amazon-pay-fill"></Icon>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                          <input
                            type="radio"
                            className="custom-control-input"
                            name="paymentCheck"
                            id="paymentCheck6"
                            onClick={() => {
                              setPmod("airpay");
                            }}
                            defaultChecked={pmod == "airpay" ? true : false}
                          />
                          <label className="custom-control-label" htmlFor="paymentCheck6">
                            <span>
                              AirPay <span className="text-danger">(India Only)</span>
                            </span>
                            <img src={airpayImg} style={{marginLeft:20, height:25, width:75}} />
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                          <input
                            type="radio"
                            className="custom-control-input"
                            name="paymentCheck"
                            id="paymentCheck5"
                            onClick={() => {
                              setPmod("phonepe");
                            }}
                            defaultChecked={pmod == "btc_pay_qr" ? true : false}
                          />
                          <label className="custom-control-label" htmlFor="paymentCheck5">
                            <span>
                              Phonepe <span className="text-danger">(India Only)</span>
                            </span>
                            <img src={phonepeImg} style={{marginLeft:20, height:25, width:25}} />
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                          <input
                            type="radio"
                            className="custom-control-input"
                            name="paymentCheck"
                            id="paymentCheck3"
                            onClick={() => {
                              setPmod("btc_pay_qr");
                            }}
                            defaultChecked={pmod == "btc_pay_qr" ? true : false}
                          />
                          <label className="custom-control-label" htmlFor="paymentCheck3">
                            <span>
                              Bitcoin <span className="text-danger">(via QR Code)</span>
                            </span>
                            <Icon className="icon-lg d-none d-lg-block" name="bitcoin"></Icon>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                          <input
                            type="radio"
                            className="custom-control-input"
                            name="paymentCheck"
                            id="paymentCheck4"
                            onClick={() => {
                              setPmod("btc_pay_us");
                            }}
                            defaultChecked={pmod == "btc_pay_us" ? true : false}
                          />
                          <label className="custom-control-label" htmlFor="paymentCheck4">
                            <span>
                              Crypto <span className="text-danger">(International)</span>
                            </span>
                            {/* <img src={btc_img} style={{height:20, width:20, marginRight:2}} />
                            <img src={thr_img} style={{height:20, width:20, marginRight:2}} />
                            <img src={eth_img} style={{height:20, width:20, marginRight:2}} />
                            <img src={das_img} style={{height:20, width:20, marginRight:2}} />
                            <img src={dog_img} style={{height:20, width:20, marginRight:2}} />
                            <img src={ltc_img} style={{height:20, width:20, marginRight:2}} />
                            <img src={bnc_img} style={{height:20, width:20}} /> */}
                            <Icon className="icon-lg  d-none d-lg-block" name="bitcoin"></Icon>
                            <Icon className="icon-lg  d-none d-lg-block" name="sign-ltc" style={{fontSize:24}}></Icon>
                            <Icon className="icon-lg  d-none d-lg-block" name="ethereum"></Icon>
                            <Icon className="icon-lg  d-none d-lg-block" name="binance"></Icon>
                            <Icon className="icon-lg  d-none d-lg-block" name="ripple"></Icon>
                            <Icon className="icon-lg  d-none d-lg-block" name="eos"></Icon>
                            <Icon className="icon-lg  d-none d-lg-block" name="tether"></Icon>
                            <Icon className="icon-lg  d-none d-lg-block" name="monero"></Icon>
                          </label>
                        </div>
                      </li>
                      
                    </ul>
                  </div>
                </div>
                <div className="card-title mt-4">
                  <div className="subtitle">
                    <Button type="submit" className="btn-round btn-primary">
                      <Icon name="cc-alt" />
                      <span>PROCEED TO PAYMENT</span>
                    </Button>
                  </div>
                </div>
                {/* <Button color="primary">Go somewhere</Button> */}
              </CardBody>
              {/* <CardFooter className="border-top">2 days ago</CardFooter> */}
            </Card>
          </Col>
          
        </Row>
      </Form>
    </Block>
  );
}

function PayStripe({ payData, setPayData }) {
  // const [pmod, setPmod] = useState('cc_pay_us');
  const { errors, register, handleSubmit, getValues } = useForm();
  let history = useHistory();
  // const submitAd = ( data ) => {
  //     console.log(data);
  //     setPayData({
  //         pay_mode: pmod,
  //         amt: data.amount
  //     });
  // }

  useEffect(() => {}, []);

  return (
    <Block size="lg">
      <Row className="gy-4">
        <Col sm="8">
          <Card className="card-bordered">
            <CardHeader className="border-bottom"> Wallet Payment </CardHeader>
            <CardBody className="card-inner">
              <CardTitle tag="h5">Stripe Payment</CardTitle>
              <CardText>Add payment to your wallet</CardText>

              <div className="row mt-4">
                <div className="col-md-6">
                  <div>
                    Payment Method: &nbsp;
                    <Label htmlFor="default-0" className="form-label">
                      {payData.pay_mode == "cc_pay_us"
                        ? "Credit/Debit Card"
                        : payData.pay_mode == "cc_pay_in"
                        ? "Credit/Debit Card"
                        : payData.pay_mode == "cc_pay_in"
                        ? "Bitcoin"
                        : payData.pay_mode == "cc_pay_in"
                        ? "Bitcoin"
                        : ""}
                    </Label>
                  </div>
                  <div>
                    Amount: &nbsp;
                    <Label htmlFor="default-0" className="form-label">
                      ${payData.amt}
                    </Label>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-7">
                  <FormGroup>
                    <div className="form-control-wrap">
                      <div className="input-group">
                        <input type="text" className="form-control" />
                        <div className="input-group-append">
                          <Button outline color="primary" className="btn-dim" placeholder="Recipients username">
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                    <small className="text-danger"> If you have any code enter here, else leave empty. </small>
                  </FormGroup>
                </div>
              </div>
              <Row className="mt-4 p-3">
                <Col sm="12 border p-3 bg-light">
                  <p style={{ lineHeight: 1.25 }}>
                    <small>
                      We consider you primary that is why we insist you to know all the details regarding refund and
                      cancellation policy. When you make any deal on this website, you make the same at your discretion.
                      For almost all the essential things done on our website, you will receive a confirmation mail and
                      for the reason, it is essential that you should provide your valid email account ID, an email ID
                      that is frequently accessed by you.
                    </small>
                  </p>
                </Col>
              </Row>
              <div className="card-title mt-4">
                <div className="subtitle">
                  <Button
                    type="submit"
                    className="btn-round btn-danger"
                    onClick={() => {
                      // history.goBack();
                      setPayData({ ...payData, pay_mode: null });
                    }}
                  >
                    <Icon name="arrow-left" />
                    <span className="pl-1">BACK </span>
                  </Button>
                  <Button type="submit" className="btn-round btn-primary float-right">
                    <Icon name="cc-alt" /> <span>PROCEED TO PAYMENT</span>
                  </Button>
                </div>
              </div>
              {/* <Button color="primary">Go somewhere</Button> */}
            </CardBody>
            {/* <CardFooter className="border-top">2 days ago</CardFooter> */}
          </Card>
        </Col>
      </Row>
    </Block>
  );
}
