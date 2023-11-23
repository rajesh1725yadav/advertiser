import React, { useState, useEffect, useContext } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {Label, Row, Col,Card, CardText, CardBody, CardTitle } from "reactstrap";
import {
  Block,
  Icon,
  Button
} from "../../components/Component";

import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";


export default function BtcSuccess () {

  const apc = useContext(AppContext);


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
                        <Icon name="info" style={{fontSize:106}} className="text-warning" />
                        <CardTitle tag="h5" className="text-warning">Payment Under Process!</CardTitle>
                        <CardText className="pl-5 pr-5">
                            Your payment is under process. Please check your email (entered at the time of making payment) to know the status of your payment. 
                        </CardText>
                        <CardText className="pl-5 pr-5">
                            If your payment is not added to your account in the next 24 hours. Please contact our Support Team.
                        </CardText>
                       
                        <div className="card-title mt-5 mb-3">
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
