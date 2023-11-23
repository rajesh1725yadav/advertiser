import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {Form, FormGroup, Label, Input, Row, Col,Card, CardHeader, CardFooter, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardLink } from "reactstrap";
import {
  Block,
  Icon,
  Button
} from "../../components/Component";
import * as bolt from 'https://checkout-static.citruspay.com/bolt/run/bolt.min.js';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

export default function PayUPay ({payData, setPayData}) {
    

    const action = 'https://secure.payu.in/_payment';
    const sha512 = require('js-sha512');
    const sha512_256 = require('js-sha512').sha512_256;
    
    const mkey = 'wTDbEv8C';
    const salt = '4H8ahh9Tll';
    
    let fname = localStorage.getItem('fname');
    let email = localStorage.getItem('email');
    let amt = (parseInt(payData.amt)*100);
    
    const dt = new Date();
    let tm = dt.getTime().toString();
    let txid = sha512_256(tm);
    // setTxid(tid);
    
    const uhash = sha512( mkey+'|'+txid+'|'+amt+'|AddToWallet|'+fname+'|'+email+'|||||||||||'+salt );

    
    const launchPayuBolt = () => {
        // bolt.launch({
        //     key: mkey,
        //     txnid: txid,
        //     hash: uhash,
        //     amount: amt,
        //     firstname: fname,
        //     email: email,
        //     phone: 98765432410,
        //     productinfo: 'Test',
        //     surl: 'http://localhost:3000/demo1/payment',
        //     furl: 'http://localhost:3000/demo1/payment',
        //     pm_type: 'credit-debit-card',
        //     mode: 'dropout'
        //   }, {
        //     responseHandler: function(BOLT) {
        //       if (BOLT.response.txnStatus !== 'CANCEL') {

        //       }
        //     },
        //     catchException: function(BOLT) {
        //       alert(BOLT.message);
        //     }
        //   });
    }
    useEffect(()=> {
        const script = document.createElement('script');

        script.src = 'https://checkout-static.citruspay.com/bolt/run/bolt.min.js';
        script.async = true;
        script.id = "bolt";
        script.boltColor="1a222f"; 
        script.boltLogo="https://www.7searchppc.com/dist/img/logo.png"
        document.body.appendChild(script);
    

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
                    <div id="bolt" bolt-color="1a222f" bolt-logo="https://www.7searchppc.com/dist/img/logo.png"></div>
                        <CardTitle tag="h5">PayU Payment</CardTitle>
                        <CardText>
                            Add payment in your wallet using available payment method. 
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
                                <p style={{lineHeight:1.25}}>
                                    <small >
                                    We consider you primary that is why we insist you to know all the details regarding refund
                                     and cancellation policy. When you make any deal on this website, you make the same at your discretion. 
                                     For almost all the essential things done on our website, you will receive a confirmation mail and for the reason, 
                                     it is essential that you should provide your valid email account ID, an email ID that is frequently accessed by you.
                                    </small>
                                </p>
                            </Col>
                        </Row>
                        <div className="card-title mt-4">
                            <div className="subtitle" >
                                    <Button type="button" className="btn-round btn-danger" onClick={()=>{
                                        setPayData({...payData, pay_mode:null});
                                    }} >
                                        <Icon name="arrow-left" /><span className="pl-1">BACK </span>
                                    </Button>
                                    <Button type="submit" className="btn-round btn-primary float-right" onClick={()=>{
                                         bolt.launch({
                                            key: mkey,
                                            txnid: txid,
                                            hash: uhash,
                                            amount: amt,
                                            firstname: fname,
                                            email: email,
                                            phone: 98765432410,
                                            productinfo: 'Test',
                                            surl: 'http://localhost:3000/demo1/payment',
                                            furl: 'http://localhost:3000/demo1/payment',
                                            pm_type: 'credit-debit-card',
                                            mode: 'dropout'
                                          }, {
                                            responseHandler: function(BOLT) {
                                              if (BOLT.response.txnStatus !== 'CANCEL') {
                                
                                              }
                                            },
                                            catchException: function(BOLT) {
                                              alert(BOLT.message);
                                            }
                                          });
                                    }} >
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
        </Content>
    </React.Fragment>
    )
}
