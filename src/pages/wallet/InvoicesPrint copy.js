import React, { useState, useEffect} from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import LogoDark from "../../images/logo/logo.png";
import { toast, ToastContainer } from "react-toastify";
import {
   Icon,
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
} from "../../components/Component";
import { getInvoiceData} from "../../app/api";
import { useParams } from "react-router-dom";
import Moment from "react-moment";


const InvoicesPrint = () => {
  const { transactionid } = useParams();
  const [inv, setInv] = useState(null);


  const getInvoiceInfo = async (transactionid) => {
    let uid = localStorage.getItem('uid');
    const res = await getInvoiceData({
      transaction_id:transactionid,
      uid:uid
    });
    setInv(res.data);
     console.log(res.data);
  }


    useEffect(() => {
      getInvoiceInfo(transactionid);
      setTimeout(() => window.print(), 2000);
    }, []);
  return (
    <body className="bg-white">
       <Head title="Invoice Print"></Head>
    
<Content>
      

        <Block>
          <div className="invoice wide-md mx-auto text-dark">
            <div className="invoice-action">
              {/* <Link to={`${process.env.PUBLIC_URL}/transaction-print/${tid}`} target="_blank">
                <Button size="md" color="primary" outline className="btn btn-white btn-outline-light">
                  <Icon name="printer-fill"></Icon>
                  <span>Print</span>
                </Button>
              </Link> */}
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
                <div className="invoice-contact text-right pr-1 text-uppercase text-white d-none d-sm-block" style={{backgroundImage: `url(https://invoice.lucknowparamedical.com/public/img/topbg.png)`, fontSize:"50px", width:"50%"}}>
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
                <div className="invoice-contact invoice-no" style={{backgroundImage: `url(https://invoice.lucknowparamedical.com/public/img/topbg.png)`}}>
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
                        <td>Subtotal</td>
                        <td>${inv !== null ? inv.amount : "0"}</td>
                      </tr>
                      <tr>
                        <td ></td>
                        <td>Processing fee</td>
                        <td>${inv !== null ? inv.fee : "0"} </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>TAX</td>
                        <td>${inv !== null ? inv.gst : "0"}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Grand Total</td>
                        <td>${inv !== null ? inv.payble_amt : "0"}</td>
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
     </body>
  );
};

export default InvoicesPrint;
