import React, { useState, useEffect, useRef } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {Form, FormGroup, Label, Input, Row, Col,Card, CardHeader, CardFooter, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardLink, Alert } from "reactstrap";
import {
  Block,
  Icon,
  Button
} from "../../components/Component";
import QrImg from '../../images/bit-qrcode.jpg';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { applyCpn, BitcoinQrPayApi, BitcoinQrScreenUpload } from "../../app/api";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../app/Loader";
import { Link } from "react-router-dom";

export default function BtcQrPay ({payData, setPayData}) {
    
    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    const btc_code = '12BXzVjoo6CDqCngCKb8qUnevd4D98HCAk';

    const [imgs, setImgs] = useState(null);

    const [cpn, setCpn] = useState(null);
    const [cpnData, setCpnData] = useState(null);
    const [chk, setChk] = useState(false);

    const [amts, setAmts] = useState({
        sfee: 0.5,
        gst:  (payData.country == 'india') ? 18 : 0,
        pfee:0,
        feeGst:0,
        gst_amt: 0,
        total:0
    });
    
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [fee, setFee] = useState(0);
    const [file, setFile] = useState('');

    let uid = localStorage.getItem('uid');

    const getPercenAmount = () => {
        let amt = parseInt(payData.amt);
        // let sfee = 2;
        let fee = (amt/100)*amts.sfee;
        let feeGst = (fee/100)*amts.gst;
        let gst2 = (amt/100)*amts.gst;

        let total = (gst2+(fee+feeGst)).toFixed(2);
        setFee(total); 
        // let pfee = (fee+feeGst).toFixed(2);
        setAmts({...amts, 
            pfee:fee, 
            feeGst:feeGst,
            gst_amt:gst2, 
            total:(parseFloat(total)+parseFloat(payData.amt))});
    }

    const applyCouponCode = async () => {

        let uid = localStorage.getItem('uid');
        
        let res = await applyCpn({
            uid:uid,
            coupon_code:cpn,
            coupon_amt:payData.amt
        });

        if(res.code == 200) {
            setCpnData(res);
            // console.log(res);
        } else {
            toast.error(res.message, {
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

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        setCopySuccess('Copied!');
        toast.success("Bitcoin Address Copied!", {
            position: "top-center",
            autoClose: true,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
      };


    const paynow = async () => {
        setLoading(true)
        let uid = localStorage.getItem('uid');
        let data = {
            uid:uid,
            fee:amts.pfee,
            fee_tax:amts.feeGst,
            gst:amts.gst_amt,
            amount:payData.amt,
            payble:fee,
        }

        if(cpnData) {
            data['cpn_id'] = cpnData.coupon_id;
            data['cpn_code'] = cpnData.coupon_code;
            data['cpn_amt'] = cpnData.bonus_amount;
        }
        let res = await BitcoinQrPayApi(data);

        if(res.code == 200) {
            setPayData({...payData, tid:res.transaction});
            
        }
        setLoading(false)
    }

    const uploadImage = async (e) => {

        if(file) {
            let ext = file.type.split('/')[1].toLowerCase(); 
            let size = Math.round(file.size/1024);
            let uid = localStorage.getItem('uid');
            
            if(ext == 'jpeg' || ext == 'jpg' || ext == 'png') {
                if(size <= 300) {
                    
                    setLoading(true)
                    let form = new FormData()
                    form.append('screenshot',file, file.name);
                    form.append('uid', uid)
                    form.append('transaction_id', payData.tid)
                    let res  = await BitcoinQrScreenUpload(form)
                    if(res.code == 200) {
                        setSuccess(true);
                    }
                    setLoading(false)
                } else {
                toast.error("Image file size is too large. Maximum file size is 300kb", {
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
                toast.error("You can upload jpg or png file only.", {
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
            toast.error("Please select a file to upload.", {
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

    useEffect(()=> {
        console.log(payData);
        getPercenAmount();

    }, []);

    return (
    <React.Fragment>
        <Head title="My Wallet" />
        <Content page="component">
        <Loader visible={loading} />
        <Block size="lg">
            {!payData.tid ? 
            <Row className="gy-4">
                <Col sm="10">
                    <Alert color="primary">
                    <strong>Note:-</strong> &nbsp;
                    You are required to upload a screenshot of your successful transaction using BITCOIN on next step or you can share at <strong>info@7searchppc.com</strong>. 
                    This screenshot must contain your transaction ID. 
                    Please also mention your mail address registered with 7Search PPC in this email and you can also mention your GSTIN if you want. 
                    Your wallet will be credited once we have received your mail with a proof of payment.

                    </Alert>
                    <Card className="card-bordered">
                    <CardHeader className="border-bottom"> BTC QR Payment </CardHeader>
                    <CardBody className="card-inner">
                        <CardTitle tag="h5">Bitcoin Payment via QR Code</CardTitle>
                        <CardText>
                        Scan the QR Code to make payment.  
                        </CardText>

                        <div className="row mt-4">
                            <div className="col-md-6">
                                <div>

                                    Payment Method: &nbsp; 
                                    <Label htmlFor="default-0" className="form-label">
                                    {(payData.pay_mode == 'cc_pay_us') ? 'Credit/Debit Card' 
                                    :  (payData.pay_mode == 'cc_pay_in') ? 'Credit/Debit Card' 
                                    :  (payData.pay_mode == 'btc_pay_qr') ? 'Bitcoin QR Code'
                                    :  (payData.pay_mode == 'cc_pay_in') ? 'Bitcoin' : '' }
                                    </Label>
                                </div>
                                <div>
                                    Amount: &nbsp;
                                    <Label htmlFor="default-0" className="form-label">
                                     ${payData.amt}
                                    </Label>
                                </div>
                                <div>
                                    Processing Fee: &nbsp;
                                    <Label htmlFor="default-0" className="form-label">
                                     ${amts.pfee.toFixed(2)}
                                    </Label>
                                </div>
                                {(amts.gst > 0) &&
                                <div>
                                <div>
                                    TAX Amount: &nbsp;
                                    <Label htmlFor="default-0" className="form-label">
                                     ${(amts.gst_amt+amts.feeGst).toFixed(2)}
                                    </Label>
                                </div>
                                </div>}

                                <div className="badge badge-danger badge-dim p-1 pl-3 pr-3" style={{fontSize:12, fontWeight:400}}>
                                    <Icon name="info" style={{fontSize:16}} /> &nbsp;Processing Fee ({amts.sfee}%
                                     
                                        {amts.gst > 0 && <span>+{amts.gst}%</span> } );
                                    {amts.gst > 0 && <span>TAX ({amts.gst}%)</span> }
                                </div>
                                <div className="mt-3" >
                                    <Label htmlFor="default-0" className="form-label" style={{fontSize:17, fontWeight:'bold'}}>
                                    Payable: &nbsp;
                                    ${(parseFloat(payData.amt)+parseFloat(fee)).toFixed(2)}
                                    </Label>
                                </div>
                            </div>
                        </div>
                         {(cpnData !== null) ?
                        
                        <div className="row mt-4">
                            <div className="col-md-7">
                                
                                <Alert color="primary" className="p-2 pl-3">Coupon Code&nbsp; <b>{cpnData.coupon_code}</b> &nbsp;Applied!
                                <button type="button" className="close text-primary" aria-label="Close" onClick={()=>{
                                    setCpnData(null);
                                }}>
                                    <span aria-hidden="true">×</span>
                                </button>
                                </Alert>
                            {/* <Badge color="outline-primary">Coupon Code&nbsp; <b>{cpnData.coupon_code}</b> &nbsp;Applied!</Badge> */}
                            </div>
                        </div>
                        :
                        <div className="row mt-4">
                            <div className="col-md-7">
                            <FormGroup>
                            <div className="form-control-wrap">
                                <div className="input-group">
                                    <input type="text" className="form-control" onChange={(e)=>{
                                        setCpn(e.target.value);
                                    }}/>
                                    <div className="input-group-append">
                                        <Button outline color="primary" className="btn-dim" placeholder="Recipients username" onClick={()=>{
                                            applyCouponCode();
                                        }}>
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            </div> 
                            <small className="text-danger"> If you have any code enter here, else leave empty. </small>
                                </FormGroup>
                            </div>
                        </div>
                        }
                        <Row className="mt-4 p-3" >
                            <div className="col-md-12">
                                <img src={QrImg} />
                            </div>
                            <div className="col-md-12 mt-3">
                            <div className="form-control-wrap">
                                <div className="input-group">
                                    <input type="text" ref={textAreaRef} className="form-control" value={btc_code} />
                                    <div className="input-group-append">
                                        <Button outline color="primary" className="btn-dim" placeholder="Recipients username" onClick={copyToClipboard}>
                                            <Icon name="copy" />
                                        </Button>
                                    </div>
                                </div>
                            </div> 
                            </div>
                        </Row>

                        {/* <Row className="mt-4 mb-3 p-3">
                            <Col sm="12 border p-3 bg-light">
                                <p style={{lineHeight:1.25, height:200, overflowY:'scroll'}}>
                                    <small >
                                    
    We consider you primary that is why we insist you to know all the details regarding refund and cancellation policy. When you make any deal on this website, you make the same at your discretion. For almost all the essential things done on our website, you will receive a confirmation mail and for the reason, it is essential that you should provide your valid email account ID, an email ID that is frequently accessed by you.
    <br/>
    <br/>
    The registration fee is non-refundable if paid once. 7Search PPC is a website with the ability to process most bank cards in many other currencies. We currently accept all the major cards available on our website. The payment amount charged to your debit or credit card will be processed in the payment currency displayed on the checkout page. The amount that is paid in your selected currency may be based on a currency exchange rate, which is set at that time of purchase. This amount may vary based on changes in the exchange rate between your selected currency and USD. 7Search PPC is not responsible for any changes on its website after the payment is done or any discrepancy against rates listed by other foreign currency exchange services. If you are unable to pay through one of the payment types available on 7Search PPC, you may contact us. There may be any other payment method available at the time.
    <br />
    <br/>
    <b>In the following cases, you will get refund:</b><br/>
    <ul style={{listStyle:'disc', padding:10}}>
        <li>
            You get refund in case you make electronic transaction for your wallet and the money does not add into your wallet having your transaction completed.
        </li>
        <li>
            When someone uses your electronic transaction card deceivingly for his/her payment and adds money into his/her wallet.
        </li>
    </ul>
    
    <ol style={{padding:10, listStyle:"number"}}>
        <li>
            When it is decided that you will get a refund, it may take some time to refund you entirely depending on the electronic and official work done for the same.
        </li>
        <li>
            You will not get refund in case you make transaction to add money into your wallet and the amount is added into your wallet. Once the amount is added like this into the wallet, it is non-refundable.
        </li>
        <li>
            We also reserve the right to change our refund policy anytime. You are requested to keep visiting the website and acquaint yourself of the refund policy from time to time.
        </li>
        <li>
            We also reserve the right to cancel or postpone any point or detail or anything that is there on the website of 7Search PPC anytime with or without notification.
        </li>
        <li>
            Any loss or injury incurred on or through 7Search PPC is entirely at your own risk. 7Search PPC will be in no way responsible for any loss or damage occurred through any deal done on the website.
        </li>
    </ol>
                                    </small>
                                </p>
                            </Col>
                        </Row> */}

                        <Row className="mt-5">
                            <Col>
                                <div className="text-dark text-bold d-flex align-items-center">
                                    <div className="custom-control custom-control-sm custom-checkbox">
                                        <input type="checkbox" className="custom-control-input form-control" id="customCheck1" 
                                            onClick={(e)=> {
                                                setChk(e.target.checked) 
                                                }} />
                                        <label className="custom-control-label" htmlFor="customCheck1">
                                        <span style={{fontSize:16}}>I agree all the <a href="https://www.7searchppc.com/terms-conditions"  target="_blank">Terms & Conditions</a> and {' '}
                                        <a href="https://www.7searchppc.com/refund-policy"  target="_blank">Refund Policy</a>.</span>
                                        </label>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <div className="card-title mt-4">
                            {(chk) ?
                            <div className="subtitle" >
                                    <Button type="button" className="btn-round btn-danger" onClick={()=>{
                                        setPayData({...payData, pay_mode:null});
                                    }} >
                                        <Icon name="arrow-left" /><span className="pl-1">BACK </span>
                                    </Button>
                                    <Button type="submit" className="btn-round btn-primary float-right" onClick={paynow} >
                                        <Icon name="cc-alt" /> <span>PROCEED TO PAYMENT</span>
                                    </Button>
                            </div>
                            :
                            <div className="subtitle" >
                              <Button type="button" className="btn-round btn-danger" onClick={()=>{
                                    setPayData({...payData, pay_mode:null});
                                }} >
                                    <Icon name="arrow-left" /><span className="pl-1">BACK </span>
                                </Button>
                                <Button type="submit" className="btn-round btn-primary float-right" disabled={true}>
                                    <Icon name="cc-alt" /> <span>PROCEED TO PAYMENT</span>
                                </Button>
                            </div>
                        }
                        </div>
                    </CardBody>
                    </Card>
                </Col>
        
            </Row>
            :
            <Row className="gy-4">
                <Col sm="10">
                    <Card className="card-bordered">
                    <CardHeader className="border-bottom"> BTC QR Payment </CardHeader>
                    {success == false ? 
                    <CardBody className="card-inner">
                        <CardTitle tag="h5">Bitcoin Payment via QR Code</CardTitle>
                        <CardText>
                            Your payment request created please upload payment screenshot to confirm.
                        </CardText>

                        <div className="row mt-4 ">
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="default-4" className="form-label">
                                        Upload Screenshot
                                    </Label>
                                    <div className="form-control-wrap">
                                        <div className="custom-file">
                                        <input
                                            type="file"
                                            multiple
                                            className="custom-file-input form-control"
                                            id="customFile"
                                            onChange={(e) =>{
                                                 setFile(e.target.files[0]); 
                                                }
                                            }
                                            accept="image/*, application/pdf" 
                                        />
                                        <Label className="custom-file-label" htmlFor="customFile">
                                           {file !== '' ? file.name : 'Choose file'}
                                        </Label>
                                        {imgs}
                                        </div>
                                    </div>
                                </FormGroup>     
                            </div>

                            {/* <div className="col-md-4">
                                <Button type="submit" className=" btn-primary" style={{marginTop:30}} onClick={paynow} >
                                    <span>Upload</span>
                                </Button>
                            </div> */}
                        </div>
                        <br/>
                        <br/>
                        <hr/>
                        <div className="card-title mt-4">
                            <div className="subtitle" >
                                    <Button type="button" className="btn-round btn-danger" onClick={()=>{
                                        setPayData({...payData, pay_mode:null});
                                    }} >
                                        <Icon name="arrow-left" /><span className="pl-1">BACK </span>
                                    </Button>
                                    <Button type="submit" className="btn-round btn-primary float-right" onClick={uploadImage} >
                                     <span>Continue</span>
                                    </Button>
                            </div>
                        </div>
                    </CardBody>
                    : 
                    <CardBody className="card-inner text-center">
                        <Icon name="check-circle text-success" style={{fontSize:74}} />
                        <CardTitle tag="h4" className="text-success">Payment Processed Successfully!</CardTitle>
                        <CardText className="pl-5 pr-5" style={{fontSize:16}}>
                            <div> 
                                 We received your payment request and screenshot. We will credit your payment to your wallet once we verify your details.
                            </div>
                            <br/>
                            <Link to={`wallet`} className="btn-round btn-primary pl-3 pr-3 p-2 mt-4 mb-3" >
                                <Icon name="arrow-left" /> <span>BACK TO WALLET</span>
                            </Link>
                            <p>&nbsp;</p>
                        </CardText>
                    </CardBody>
                    } 
                    </Card>
                </Col>
        
            </Row>}
          </Block>
          <ToastContainer />
        </Content>
    </React.Fragment>
    )
}
