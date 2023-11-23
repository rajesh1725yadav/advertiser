import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {Form, FormGroup, Label, Input, Row, Col,Card, CardHeader, CardFooter, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardLink, Alert } from "reactstrap";
import {
  Block,
  Icon,
  Button
} from "../../components/Component";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { applyCpn } from "../../app/api";

export default function PayUPay ({payData, setPayData}) {
    
     const action = 'https://services.7searchppc.com/payment/payu';
//    const action = 'http://192.168.1.13/7sapp/7searchBackend/public/payment/payu';
    const [cpn, setCpn] = useState(null);
    const [cpnData, setCpnData] = useState(null);
    const [chk, setChk] = useState(false);

    const [amts, setAmts] = useState({
        sfee: 2,
        gst: (payData.country == 'india') ? 18 : 0,
        pfee:0,
        feeGst:0,
        gst_amt: 0,
        total:0
    });

    const [fee, setFee] = useState(0);

    let uid = localStorage.getItem('uid');
    let fname = localStorage.getItem('fname');
    let email = localStorage.getItem('email');

    const getPercenAmount = () => {
        let amt = parseInt(payData.amt);
        // let sfee = 2;
        let fee = (amt/100)*amts.sfee;
        let feeGst = (fee/100)*amts.gst;
        let gst2 = (amt/100)*amts.gst;

        let total = (gst2+(fee+feeGst)).toFixed(2);
        setFee(total);
        setAmts({...amts, 
            pfee:fee+feeGst, 
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
        }

    }


    useEffect(()=> {
        getPercenAmount();

    }, []);

    return (
    <React.Fragment>
        <Head title="My Wallet" />
        <Content page="component">
        <Block size="lg">
            <Row className="gy-4">
                <Col sm="8">
                    <Card className="card-bordered">
                    <CardHeader className="border-bottom"> PayU Payment </CardHeader>
                    <CardBody className="card-inner">
                        <CardTitle tag="h5">PayU Payment</CardTitle>
                        <CardText>
                        Add payment to your wallet.  
                        </CardText>

                        <div className="row mt-4">
                            <div className="col-md-6">
                                <div>

                                    Payment Method: &nbsp; 
                                    <Label htmlFor="default-0" className="form-label">
                                    {(payData.pay_mode == 'cc_pay_us') ? 'Credit/Debit Card' 
                                    : (payData.pay_mode == 'cc_pay_in') ? 'Credit/Debit Card' 
                                    :  (payData.pay_mode == 'cc_pay_in') ? 'Bitcoin'
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
                                </div>
                                }
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
                        {/* <Row className="mt-4 p-3">
                            <Col sm="12 border p-3 bg-light">
                                <p style={{lineHeight:1.25}}>
                                    <small >
                                    We consider you primary that is why we insist you to know all the details regarding refund
                                     and cancellation policy. When you make any deal on this website, you make the same at your discretion. 
                                     For almost all the essential things done on our website, you will receive a confirmation mail and for the reason, 
                                     it is essential that you should provide your valid email account ID, an email ID that is frequently accessed by you.
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
                                        <span style={{fontSize:16}}>I agree all the 
                                        <a href="https://www.7searchppc.com/terms-conditions"  target="_blank">Terms & Conditions</a> and  {' '}
                                        <a href="https://www.7searchppc.com/refund-policy" target="_blank">Refund Policy</a>.</span>
                                        </label>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="card-title mt-4">
                            <div className="subtitle" >
                            {chk ?
                                <form method="post" action={action}>
                                    <input type="hidden" name="amount" value={payData.amt} />
                                    <input type="hidden" name="payble" value={amts.total.toFixed(2)} />
                                    <input type="hidden" name="fee" value={amts.pfee.toFixed(2)} />
                                    <input type="hidden" name="fee_tax" value={amts.feeGst.toFixed(2)} />
                                    <input type="hidden" name="gst" value={amts.gst_amt.toFixed(2)} />
                                    <input type="hidden" name="uid" value={uid} />
                                    <input type="hidden" name="cpn_id" value={(cpnData) ? cpnData.coupon_id : ''} />
                                    <input type="hidden" name="cpn_code" value={(cpnData) ? cpnData.coupon_code : ''} />
                                    <input type="hidden" name="cpn_amt" value={(cpnData) ? cpnData.bonus_amount : 0} />
                                    <Button type="button" className="btn-round btn-danger" onClick={()=>{
                                        setPayData({...payData, pay_mode:null});
                                    }} >
                                        <Icon name="arrow-left" /><span className="pl-1">BACK </span>
                                    </Button>
                                    <Button type="submit" className="btn-round btn-primary float-right" >
                                        <Icon name="cc-alt" /> <span>PROCEED TO PAYMENT</span>
                                    </Button>
                                </form>
                            :
                                <div>
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
                        </div>
                    </CardBody>
                    </Card>
                </Col>
        
            </Row>
          </Block>
        </Content>
    </React.Fragment>
    )
}
