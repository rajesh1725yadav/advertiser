import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {Form, FormGroup, Label, Input, Row, Col,Card, CardHeader, CardFooter, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardLink, Alert, Badge } from "reactstrap";
import {
  Block,
  Icon,
  Button
} from "../../components/Component";

import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { applyCpn, stripePayApi } from "../../app/api";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";



export default function Failed () {
  const {trn} = useParams();

  const prms = atob(trn).split('|');
    useEffect(()=> {

    //  getPercenAmount();
    },[]);


    return (
        <React.Fragment>
        <Head title="My Wallet" />
        <Content page="component">
        <Block size="lg">
            <Row className="gy-4">
                <Col sm="8">
                    <Card className="card-bordered">
                    {/* <CardHeader className="border-bottom"> 
                    Stripe Payment 
                    </CardHeader> */}
                    <CardBody className="card-inner text-center">
                        <Icon name="cross-circle" style={{fontSize:106}} className="text-danger" />
                        <CardTitle tag="h5" className="text-danger">Payment Failed!</CardTitle>
                        <CardText>
                            Your payment was failed. Please try again. 
                        </CardText>

                        <div className="row mt-4">
                            <div className="col-md-12 text-center pl-5 pr-5 pt-2">
                                <div className="row">
                                <div className="col-md-6 pl-5 text-left">
                                    Payment Method:
                                </div> 
                                    <div className="col-md-6 pr-5 text-right">
                                        <Label htmlFor="default-0" className="form-label">
                                        {prms[0]}
                                        </Label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 pl-5 text-left">Email:</div>
                                    <div className="col-md-6 pr-5 text-right">
                                        <Label htmlFor="default-0" className="form-label">
                                        {prms[1]}
                                        </Label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 pl-5 text-left">Payment Status:</div>
                                    <div className="col-md-6 pr-5 text-right">
                                        <Label htmlFor="default-0" className="form-label">
                                        {prms[2]}
                                        </Label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 pl-5 text-left">Transaction ID:</div>
                                    <div className="col-md-6 pr-5 text-right">
                                        <Label htmlFor="default-0" className="form-label">
                                        {prms[3]}
                                        </Label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 pl-5 text-left" style={{fontWeight:'bold', fontSize:16}}>Amount Paid:</div>
                                    <div className="col-md-6 pr-5 text-right">
                                        <Label htmlFor="default-0" className="form-label" style={{fontWeight:'bold', color:'black', fontSize:16}}>
                                        {(prms[5]=='usd') ? '$' : 'Rs.'}{prms[4]}
                                        </Label>
                                    </div>
                                </div>
                                {/* <div>
                                    Fee &amp; Taxes: &nbsp;
                                    <Label htmlFor="default-0" className="form-label">
                                     $34
                                    </Label>
                                </div>
                                <div className="mt-3" >
                                    <Label htmlFor="default-0" className="form-label" style={{fontSize:17, fontWeight:'bold'}}>
                                    Payble: &nbsp;
                                     $34
                                    </Label>
                                </div> */}
                            </div>
                        </div>
                      
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
                        <div className="card-title mt-5">
                            <div className="subtitle" >
                            <Link to={`${process.env.PUBLIC_URL}/wallet`}>
                            <Button type="submit" className="btn-round btn-danger" onClick={()=>{
                                // history.goBack();
                                // setPayData({...payData,pay_mode:null})
                            }} >
                                    <Icon name="arrow-left" /><span className="pl-1">BACK TO WALLET </span>
                                </Button>
                            </Link>
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
