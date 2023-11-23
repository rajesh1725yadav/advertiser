import React, { useContext, useState, useEffect } from 'react'
import CampaignContext from '../../context/CampaignContext'
import {
    Row,
    Col,
    Tooltip,
    Button,
    FormGroup,
    Card, CardHeader, CardFooter, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardLink
  } from "reactstrap";
import { RSelect, Icon, Block } from '../../components/Component';
import { Link } from 'react-router-dom';

export default function SuccessCampaign ({clkFunc}) {



    useEffect(() => {

    },[])

    return (
      <>
      <Block size="lg">
        <Row className="gy-3 mt-5">
            <Col md="8"  className='text-center offset-md-2 mt-5 ' >
              <Card className="card-bordered p-3 pl-5 pr-5 justify-content-center" style={{height:'450px'}}>
                    <FormGroup className='pl-5 pr-5'>
                      <Icon name="check-circle" className="text-success" style={{ fontSize: '120px'}} />
                      <h4 className='text-success mt-3 mb-3' >
                        Congratulations! Campaign Created Successfully
                      </h4>
                      <p style={{fontSize:'16px'}}>Campaign created successfully and is currently under review.  Your campaign will be live as soon as our moderators verify it. You can edit or update your campaign anytime.</p>
                      <br />
                      <Link to={`${process.env.PUBLIC_URL}/campaigns`} className="mt-5">Back to Campaign</Link>
                    </FormGroup>
                </Card>
            </Col>
            
          </Row>
          { /* <div className="actions clearfix">
            <ul>
              <li>
                <Button color="primary" >
                  Previous
                </Button>
              </li>
            </ul>
          </div> */ }
      </Block>
      </>)
}