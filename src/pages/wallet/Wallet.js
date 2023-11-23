import React, { useState, useEffect, useContext } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import makeAnimated from "react-select/animated";
import { FormGroup, Label, Input, Row, Col, Card, CardHeader, CardBody, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
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
  PaginationComponent
} from "../../components/Component";
import { getWalletAmount, paymentHistory } from "../../app/api";
import { Link } from "react-router-dom";
import Loader from "../../app/Loader";
import Moment from "react-moment";
import AppContext from "../../context/AppContext";

export default function Wallet() {

    const [loading, setLoading] = useState(false);
    const [wlt, setWlt] = useState(0);
    const [tdate, setTdate] = useState(null);
    const apc = useContext(AppContext);
    const [wlog, setWlog] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(20);
    const [pgs, setPgs] = useState(0);

    const getWltAmount = async () => {
      setLoading(true)
      const uid = localStorage.getItem('uid');
      const res = await getWalletAmount(uid);
      setWlt(res.wallet);
      // let sts = apc.sts;
      // sts['wlt'] = res.wallet;
      
      // console.log(sts)
      apc.dispatch({
        type:'wlt',
        wlt: res.wallet
      });
      localStorage.setItem("wlt", res.wallet);
      setTdate(res.transaction.date);
     
      setLoading(false)
    }

    const getPaymentLog = async (pg = 1) => {
      setLoading(true)
      let uid = localStorage.getItem('uid');
      let res = await paymentHistory({
        uid:uid,
        page:pg,
        lim:itemPerPage
      });
      if(res) {
        setWlog(res.data);
        setPgs(res.row);
        // console.log(res);
      }
      setLoading(false)
    }
    const [mhover, seMhover] = useState(false);
    const handleHover = () => { seMhover(!mhover) }

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      if(currentPage !== pageNumber) {
        getPaymentLog(pageNumber)
      }
    }

    useEffect(()=>{
      getWltAmount();
      getPaymentLog();
    },[]);

    return (
        <React.Fragment>
        <Head title="My Wallet" />
        <Content page="component">
          <Block size="lg">
          <Loader visible={loading} />
            <PreviewCard>
              <Row className="gy-4">
                <Col sm="6">
                <div className="card-amount">
                  <span className="amount">
                    Your Balance
                  </span>
                  
                </div>
                <div className="card-title">
                    <div className="subtitle">Your wallet amount will be debited automatically for your campaign. 
                    If you find low wallet balance, add funds immediately; otherwise, your campaign will be stopped.</div>
                  </div>
                  {/* <div className="card-title">
                    <h6 className="subtitle">Your wallet will be debit automatically for your campaign. 
                    If you found low balance add balance immediate otherwise your campaign will be stop.</h6>
                  </div> */}
                <div className="invest-data">
                  <div className="invest-data-amount g-2">
                    <div className="invest-data-history">
                    <div className="card-title">
                      <div className="subtitle">
                        {tdate !== null && <span><Icon name="calendar-fill" style={{fontSize:'16px', marginTop:'15px'}} /> Your last payment was on {tdate}</span>}
                        
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
                </Col>
                <Col sm="6" >
                {/* <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h6 className="subtitle align-right">This Month Report</h6>
                  </div>
                  <div className="card-tools">
                
                  </div>
                </div> */}
                <div className="card-amount" style={{justifyContent:'flex-end'}}>
                  <span className="amount" style={{fontSize:28}}>
                    ${(wlt) ? wlt : 0 }
                  </span>
                    {/* <Button className="btn-round btn-primary">
                        <Icon name="setting" />
                        <span>Button Left Icon</span>
                    </Button> */}
                </div>
                <div className="card-title float-right mt-4">
                    <div className="subtitle" >
                      <Link to={`${process.env.PUBLIC_URL}/payment`}>
                        <Button className="btn-round btn-primary">
                        <Icon name="cc-alt" />
                        <span>MAKE A PAYMENT</span>
                        </Button>
                      </Link>
                    
                    </div>
                  </div>
                </Col>
              </Row>
            </PreviewCard>
          </Block>

          <Block size="lg">
            <Row className="gy-4">
                <Col sm="12">

                <Card className="card-bordered card-stretch">
            <div className="card-inner-group">
              <div className="card-inner">
                <div className="card-title-group">
                  <div className="card-title">
                    <h5 className="title">Wallet Transaction History</h5>
                    <div className="subtitle">
                         {/* <span>Last 10 payment record</span> */}
                        
                      </div>
                  </div>
                  <div className="card-tools mr-n1">
                    
                  </div>
                </div>
              </div>
              <div className="card-inner p-0">
                <table className="table table-tranx">
                  <thead>
                    <tr className="tb-tnx-head">
                      {/* <th className="tb-tnx-id">
                        <span className="">#</span>
                      </th> */}
                      <th className="tb-tnx-info">
                        <span className="tb-tnx-desc d-none d-sm-inline-block">
                          <span>Transaction Date</span>
                        </span>
                        <span className="tb-tnx-date d-md-inline-block d-none">
                          <span className="d-md-none">Date</span>
                          <span className="d-none d-md-block">
                            <span>Description</span>
                          </span>
                        </span>
                      </th>
                      <th className="tb-tnx-amount is-alt">
                        <span className="tb-tnx-total">Amount</span>
                        <span className="tb-tnx-status d-none d-md-inline-block">Status</span>
                      </th>
                      <th className="tb-tnx-action">
                        <span>&nbsp;</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wlog != null
                      ? wlog.map((item) => {
                          return (
                            
                            <tr key={item.id} className="tb-tnx-item wl-row">
                              {/* <td className="tb-tnx-id">
                                <a
                                  href="#ref"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                  }}
                                >
                                  <span>{item.ref}</span>
                                </a>
                              </td> */}
                              <td className="tb-tnx-info">
                                <div className="tb-tnx-desc">
                                  <span className="title">
                                    <Moment format="DD MMM YYYY">
                                      {item.date}

                                    </Moment>
                                    </span>
                                </div>
                                <div className="tb-tnx-date">
                                  {/* <span className="date">{(item.payment_mode) ? item.payment_mode.charAt(0).toUpperCase() + item.payment_mode.slice(1) :  
                                      item.status == 2 ? 'Payment failed' : 'Payment is pending'}</span> */}
                                    <span className="date">{(item.remark) ? item.remark : item.payment_mode.charAt(0).toUpperCase() + item.payment_mode.slice(1)} </span>
                                </div>
                              </td>
                              <td className="tb-tnx-amount is-alt">
                                <div className="tb-tnx-total">
                                  <span className="amount">${item.amount}</span>
                                </div>
                                <div className="tb-tnx-status">
                                  <span
                                    className={`badge badge-dot badge-${
                                      item.status == 1 ? "success" : item.status == 2 ?  "danger" : 'warning'
                                    }`}
                                  >
                                    {item.status == 1 ? 'SUCCESS' :  item.status == 2 ? 'FAILED' : 'PENDING'}
                                  </span>
                                </div>
                              </td>
                              <td className="tb-tnx-action">
                                {(item.status == 1 && item.cpn_typ == 0 ) ? 
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    tag="a"
                                    className="text-soft dropdown-toggle btn btn-icon btn-trigger"
                                  >
                                    <Icon name="more-h"></Icon>
                                  </DropdownToggle>
                                  <DropdownMenu right>
                                    <ul className="link-list-plain">
                                      <li
                                        onClick={() => {
                                          loadDetail(item.id);
                                          setViewModal(true);
                                        }}
                                      >
                                        <Link to={`${process.env.PUBLIC_URL}/invoice/${item.transaction_id}`}>
                                          <Icon name="eye"></Icon> 
                                            View
                                        </Link>
                                      </li>
                                      <li>
                                        <Link to={`${process.env.PUBLIC_URL}/transaction-print/${item.transaction_id}`} target="_blank">
                                          <Icon name="printer-fill"></Icon> 
                                          <span>Print</span>
                                        </Link>
                                      </li>
                                      
                                    </ul>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                                : '' }
                              </td>
                            </tr>
                          );
                        })
                      : null}
                      <div className="card-inner" style={{display:'flex'}}>
                        <div style={{alignSelf:'self-start', width:'97%'}}>
                          
                        {wlog ? (
                          <PaginationComponent
                          itemPerPage={itemPerPage}
                          totalItems={pgs}
                          paginate={paginate}
                            currentPage={currentPage}
                          />
                        ) : (
                          <div className="text-center">
                            <span className="text-silent">No transaction found</span>
                          </div>
                        )}
                        </div>
                      </div>
                  </tbody>

                </table>
              </div>
             
            </div>
          </Card>

                  {/* <Card className="card-bordered">
                    <CardHeader className="border-bottom"></CardHeader>
                    <CardBody className="card-inner">
                    <table className="table table-borderless">  
                     
                        <tbody>   
                          {wlog !== null ? 
                            wlog.map((item)=>{
                             return <tr>          
                                  <td>{item.date}</td>      
                                  <td className="text-right">${item.amount}</td>      
                              </tr>  
                            })  
                            : '' }
                           
                        </tbody>
                    </table>

                    </CardBody>
                  </Card> */}
                    {/* <PreviewCard>
                    </PreviewCard> */}
                </Col>
            </Row>
          </Block>
        </Content>
      </React.Fragment>
    )
}