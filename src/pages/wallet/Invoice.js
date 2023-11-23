import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import LogoDark from "../../images/logo/logo.png";
import InvoiceDark from "../../images/topbg.png";

import {
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  BlockDes,
  BlockHeadContent,
  Block,
  BlockBetween,
} from "../../components/Component";
import { Link, useParams } from "react-router-dom";
import { getInvoiceData } from "../../app/api";
import Moment from "react-moment";
import Loader from "../../app/Loader";
const Invoice = ({ match }) => {
  const { tid } = useParams();
  const invoiceData = "";
  const [data] = useState(invoiceData);
  const [inv, setInv] = useState(null);
  const [loading, setLoading] = useState(false);
  //   const [invoiceData, setInvoiceData] = useState(null);

  const getInvoiceInfo = async (tid) => {
    let uid = localStorage.getItem("uid");
    setLoading(true);
    const res = await getInvoiceData({
      transaction_id: tid,
      uid: uid,
    });
    setInv(res.data);
    setLoading(false);
    // console.log(res.data);
  };
  useEffect(() => {
    getInvoiceInfo(tid);
    // console.log(inv)
  }, []);

  return (
    <React.Fragment>
      <Head title="Invoice Detail"></Head>

      <Content>
        <Loader visible={loading} />
        <BlockHead>
          <BlockBetween className="g-3">
            <BlockHeadContent>
              <BlockTitle>
                Invoice <strong className="text-primary small">#{tid}</strong>
              </BlockTitle>
              <BlockDes className="text-soft">
                <ul className="list-inline">
                  <li>
                    Created at:{" "}
                    <span className="text-base">
                      {" "}
                      {inv !== null && <Moment format="DD MMM YYYY">{inv.created_at}</Moment>}{" "}
                    </span>
                  </li>
                </ul>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <Link to={`${process.env.PUBLIC_URL}/wallet`}>
                <Button color="light" outline className="bg-white d-none d-sm-inline-flex">
                  <Icon name="arrow-left"></Icon>
                  <span>Back</span>
                </Button>
              </Link>
              <Link to={`${process.env.PUBLIC_URL}/invoice-list`}>
                <Button color="light" outline className="btn-icon bg-white d-inline-flex d-sm-none">
                  <Icon name="arrow-left"></Icon>
                </Button>
              </Link>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="invoice wide-md mx-auto text-dark">
            <div className="invoice-action">
              <Link to={`${process.env.PUBLIC_URL}/transaction-print/${tid}`} target="_blank">
                <Button size="md" color="primary" outline className="btn btn-white btn-outline-light">
                  <Icon name="printer-fill"></Icon>
                  <span>Print</span>
                </Button>
              </Link>
            </div>

            <div className="invoice-wrap">
              {/* <div className="invoice-brand text-center">
                <img src={LogoDark} alt="" />
              </div> */}

              <div className="invoice-head mt-5">
                <div className="invoice-contact">
                  <div className="invoice-brand text-left">
                    <img src={LogoDark} alt="" />
                  </div>
                </div>
                <div className="invoice-contact text-right pr-1 text-uppercase text-white d-none d-sm-block" style={{backgroundImage: `url(https://services.7searchppc.com/public/images/mail/topbg.png)`, fontSize:"50px", width:"50%"}}>
                Invoice
                </div>
              </div>

              <div className="invoice-head">
                <div className="invoice-contact">
                  <ul className="list-plain">
                    <li className="">
                      <span class="font-weight-bold"> Payment Mode</span>:
                      <span>
                        {" "}
                        <strong className="text-capitalize c-text-light"> {inv !== null ? inv.payment_mode : "0"} </strong>{" "}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="invoice-contact invoice-no" style={{backgroundImage: `url(https://services.7searchppc.com/public/images/mail/topbg.png)`}}>
                  <ul className="list-plain d-flex">
                    <li className="invoice-id mr-1">
                      <span className="text-white"> INVOICE ID:</span>
                      <span>
                        {" "}
                        <strong className="text-white text-capitalize"> {inv !== null ? inv.transaction_id : "0"} </strong>{" "}
                      </span>
                    </li>
                    <li className="invoice-date pt-0">
                      <span className="text-white">Date:</span>
                      <span className="text-white"> {inv !== null && <Moment format="DD MMM YYYY">{inv.created_at}</Moment>}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="invoice-head">
                <div className="invoice-contact text-right text-md-left w-100" >
                  <span className="overline-title">Invoice To:</span>
                  <div className="invoice-contact-info mt-1">
                    <h6 className="title">{inv !== null ? inv.name : "0"} </h6>
                    <ul className="list-plain">
                      <li className="mb-1 p-0">
                        {/* <Icon name="map-pin-fill"></Icon> */}
                        <span className="c-text-light">
                          {inv !== null ? inv.address_line1 : "0"}
                          <br />
                          {inv !== null ? inv.address_line2 : "0"}
                          {inv !== null ? inv.city : "0"}
                          <br />
                          {inv !== null ? inv.state : "0"}
                          <br />
                          {inv !== null ? inv.country : "0"}
                        </span>
                      </li>
                      <li className="mb-1 p-0">
                        {/* <Icon name="call-fill"></Icon> */}
                        <span className="c-text-light">{inv !== null ? inv.phone : "0"}</span>
                      </li>
                      <li className="mb-1 p-0">
                        {/* <Icon name="mail"></Icon> */}
                        <span className="c-text-light">{inv !== null ? inv.email : "0"}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="invoice-contact text-right">
                  <span className="overline-title">Pay To:</span>
                  <div className="invoice-contact-info  mt-1">
                    <h6 className="title"> 7Search PPC </h6>
                    <ul className="list-plain">
                      <li className="mb-1 p-0">
                        {/* <Icon name="mail"></Icon> */}
                        <span className="c-text-light"> contact@7searchppc.com </span>
                      </li>
                      <li className="mb-1 p-0">
                        <strong className="text-primary small"> TAX ID </strong>
                        <span> : 09AAECL2613D1ZW</span> <br />
                        <strong className="text-primary small">( LOGELITE PRIVATE LIMITED ) </strong>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <div className="invoice-contact">
                  <ul className="list-plain">
                    <li className="invoice-id">
                      <span> INVOICE ID</span>:
                      <span>
                        {" "}
                        <strong> {inv !== null ? inv.transaction_id : "0"} </strong>{" "}
                      </span>
                    </li>
                    <li className="invoice-date">
                      <span>Date</span>:
                      <span> {inv !== null && <Moment format="DD MMM YYYY">{inv.created_at}</Moment>}</span>
                    </li>
                  </ul>
                </div> */}
              </div>

              <div className="invoice-bills">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr className="bg-theme">
                    
                        <th className="w-60  text-white">Description</th>
                        <th className="text-white">SAC</th>
                        <th className="text-white">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                       
                        <td>{inv !== null ? inv.remark : "0"}</td>
                        <td>998365</td>
                        <td>${inv !== null ? inv.amount : "0"}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td ></td>
                        <td>Processing fee</td>
                        <td>${inv !== null ? inv.fee : "0"} </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td><b>Subtotal</b></td>
                        <td><b>${inv !== null ? inv.subtotal : "0"}</b></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>TAX</td>
                        <td>${inv !== null ? (inv.gst) : "0"}</td>
                      </tr>
                      
                      <tr>
                        <td></td>
                        <td className="bg-theme text-white"> Amount Paid (USD) </td>
                        <td className="bg-theme text-white">${inv !== null ? inv.payble_amt : "0"}</td>
                      </tr>
                    </tfoot>
                  </table>
                  <hr />
                  <div className="nk-notes fs-14px">
                    <strong className="text-primary small"> Terms & Conditions </strong>
                  </div>
                  <div className="nk-notes fs-13px ">
                    <strong className="text-primary small">1. </strong> This transaction is governed by the terms and conditions agreed upon by the user at the time of making the payment.
                  </div>
                  <div className="nk-notes fs-13px ">
                    <strong className="text-primary small">2. </strong>The amount, once added, can only be used for running ad campaigns on 7SearchPPC.
                  </div>
                  <div className="nk-notes fs-13px ">
                    <strong className="text-primary small">3. </strong>The amount, once added, cannot be refunded to the user’s bank account or any other personal wallet.
                  </div>
                  <div className="nk-notes fs-13px ">
                    <strong className="text-primary small">4. </strong>	In case some amount of money has been debited from the wallet accidentally without the user’s consent, it will be transferred back to the wallet within a few hours of a claim.
                  </div>
                  <div className="nk-notes fs-13px ">
                    <strong className="text-primary small">4. </strong>Users will never be charged more than the required amount to run the campaign.
                  </div>
                  <div className="nk-notes fs-13px ">
                    <strong className="text-primary small">4. </strong>The amount added to the wallet will be calculated as per the USD.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default Invoice;
