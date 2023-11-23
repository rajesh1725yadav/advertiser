import React, { useEffect, useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import InvestOverview from "../../components/partials/invest/invest-overview/InvestOverview";
import InvestPlan from "../../components/partials/invest/invest-plan/InvestPlan";
import RecentInvest from "../../components/partials/invest/recent-investment/RecentInvest";
import RecentActivity from "../../components/partials/default/recent-activity/Activity";
import Notifications from "../../components/partials/default/notification/Notification";
import { DropdownToggle, DropdownMenu, Card, UncontrolledDropdown, DropdownItem, Badge, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup } from "reactstrap";
import {
  Block,
  BlockDes,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  PreviewAltCard,
  TooltipComponent,
  PaginationComponent,
} from "../../components/Component";
import { BalanceBarChart, DepositBarChart, WithdrawBarChart } from "../../components/partials/charts/invest/InvestChart";
import { useForm } from "react-hook-form";
import { getIpList, submitIpRequest } from "../../app/api";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../app/Loader";
import Moment from "react-moment";

const BlockIP = () => {

  
  const showToast = (type) => {

    if(type == 1) {
      toast.success("Request Submitted Successfully", {
        position: "top-right",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
      });
    } else {
      toast.error("Something went wrong", {
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


const [pgs, setPgs] = useState(0);
const [currentPage, setCurrentPage] = useState(1);
const [itemPerPage] = useState(10);

const [sm, updateSm] = useState(false);
const [modal, setModal] = useState(false);
const [loading, setLoading] = useState(false);

const [iplist, setIpList] = useState('');

const onFormCancel = () => {
    setModal(false);
    // resetForm();
};

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if(currentPage !== pageNumber) {
      loadIPData( pageNumber)
    }
  }

  const { errors, register, handleSubmit } = useForm();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    lead: "",
    tasks: 0,
    team: [],
    totalTask: 0,
    date: new Date(),
  });


  const onFormSubmit = async (data) => {
    
    setLoading(true);

    let uid = localStorage.getItem('uid');
    data['uid'] = uid;
    let res = await submitIpRequest(data);

    if(res.code === 200) {
      setModal(false);
      showToast(1)
    } else {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
      });
    }

    setLoading(false);
    loadIPData();
  }


const loadIPData = async (pg =1) => {

    setLoading(true)
    let res = await getIpList(itemPerPage, pg);

     console.log(res.data); 
    if(res.data) {
      setPgs(res.row);  
      setIpList(res.data);
    }

    setLoading(false)

}


useEffect(() => {
  loadIPData();
},[])

  return (
    <>
    <React.Fragment>
      <Head title="Blocked IPs" />
      <Content>
        <Loader visible={loading} />
        <BlockHead size="xl">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>IP Block Request</BlockTitle>
              <BlockDes className="text-soft">
                <p>Here you can find all IP block requests</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
                    <Button color="primary" onClick={()=>{ setModal(true)}}>
                        <Icon name="plus"></Icon>
                        <span>New Request</span>
                    </Button>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col md="12" xxl="12">
              <Card className="card-bordered card-full">
                {/* <RecentActivity /> */}
                <table className="table table-ulogs">
                  <thead className="bg-primary">
                    <tr>
                      {/* <th className="tb-col-os">
                        <span className="overline-title">
                          Browser <span className="d-sm-none">/ IP</span>
                        </span>
                      </th> */}
                     
                      <th className="tb-col-time">
                        <span className="overline-title text-white">Date</span>
                      </th>
                      <th className="tb-col-ip">
                        <span className="overline-title text-white">IP Address</span>
                      </th>
                      <th className="tb-col-time">
                        <span className="overline-title text-white">Comment</span>
                      </th>
                      <th className="tb-col-action">
                        <span className="overline-title text-white">Status</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(iplist || iplist.length) ? 
                      iplist.map((item)=>{
                        return (
                          <tr className="wl-row custom-strip">
                            {/* <td className="tb-col-os">Chrome</td> */}
                            <td className="tb-col-time">
                              <span className="sub-text">
                                {/* <Moment format="DD MMM YYYY - hh:mm A"> */}
                                <Moment format="DD MMM YYYY">
                                  {item.created_at}
                                </Moment>
                              </span>
                            </td>
                            <td className="tb-col-ip">
                              <span className="sub-text">{item.ip}</span>
                            </td>
                           
                            <td className="tb-col-time">
                              <span className="sub-text">
                               {item.desc}
                              </span>
                            </td>
                            <td className="tb-col-action">
                              {(item.status === 1) ? 
                                <Badge className="badge-dim" color="success">Approved</Badge> 
                                :      
                                <Badge className="badge-dim" color="warning">Pending</Badge>       
                              }     
                            </td>
                          </tr>)
                        }) : <tr><td colSpan={4} className="text-center">No Record Found</td></tr> }
                  </tbody>
                  
                  <div className="card-inner">
                    {iplist.length ? (
                      <PaginationComponent
                        itemPerPage={itemPerPage}
                        totalItems={pgs}
                        paginate={paginate}
                        currentPage={currentPage}
                      />
                    ) : (
                      <div className="text-center">
                        {/* <span className="text-silent">No record  found</span> */}
                      </div>
                    )}
                  </div>
                </table>
              </Card>
            </Col>
          </Row>
        </Block>
      </Content>
      
      <Modal isOpen={modal} toggle={() => setModal(!modal)} className="modal-dialog-centered" size="sm">
        <ModalHeader className="sm-title">Block IP Request
                <a href="#cancel" onClick={(ev) => {  ev.preventDefault();  onFormCancel();  }} className="close" > <Icon name="cross-sm"></Icon> </a>
        </ModalHeader>
          <ModalBody>
            <div className="">
              <div >
                <Form className="row gy-4" onSubmit={handleSubmit(onFormSubmit)}>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">IP Address</label>
                      <input
                        type="text"
                        name="ip_address"
                        defaultValue={formData.ip_address}
                        placeholder="Enter IP Address"
                        className="form-control"
                        ref={ register({ required: "Please enter IP Address" }) }
                      />
                      {errors.ip_address && <span className="invalid">{errors.ip_address.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <FormGroup>
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        defaultValue={formData.description}
                        placeholder="Your description"
                        // onChange={(e) => onInputChange(e)}
                        className="form-control-xl form-control no-resize"
                        ref={register({ required: "Please enter description" })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>
                  
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit"> Submit Request </Button>
                      </li>
                      <li>
                        <Button
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </Button>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>
    </React.Fragment>
    <ToastContainer />
    </>
  );
};

export default BlockIP;
