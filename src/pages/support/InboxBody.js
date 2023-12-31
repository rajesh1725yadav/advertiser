import React, { useEffect, useState } from "react";
import InboxBodyHead from "./InboxBodyHead";
import SimpleBar from "simplebar-react";
import InboxMessages from "./InboxMessages";
import { Icon, UserAvatar, TooltipComponent } from "../../components/Component";
import { findUpper } from "../../utils/Utils";
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Spinner, UncontrolledDropdown } from "reactstrap";
import Moment from "react-moment";
import { deleteSupportChat } from "../../app/api";
import swal from 'sweetalert2';

const InboxBody = ({
  data,
  setTabData,
  currentTab,
  setMailId,
  itemPerPage,
  totalItems,
  paginate,
  currentPage,
  loadData
}) => {
  
  const [refresh, setRefresh] = useState(false);

  const [ticket, setTicket] = useState('');
  const [sub, setSub] = useState('');

  const deleteInbox = async (tid) => {
    let uid = localStorage.getItem('uid');
    let res = await deleteSupportChat({
      ticket_no:tid,
      uid:uid
    });
    loadData()
    
  }

  return (
    <div className="nk-ibx-body bg-white" style={{maxWidth:'100%'}} >
    
      {ticket ? 
      
         <InboxMessages
         ticket={ticket}
         setTicket={setTicket}
         subject={sub}
        />
       :
        <React.Fragment>
          <InboxBodyHead
            // data={tabData}
            allData={data}
            setData={setTabData}
            currentTab={currentTab}
            toggleRefresh={false}
            itemPerPage={itemPerPage}
            totalItems={totalItems}
            paginate={paginate}
            currentPage={currentPage}
            loadData={loadData}
          />
         
            <React.Fragment>
              <SimpleBar className="nk-ibx-list">
                {refresh ? (
                  <div className="d-flex flex-row justify-content-center align-items-center mt-5">
                    <Spinner size="lg" type="grow" color="primary"></Spinner>
                  </div>
                ) : data.length > 0 ? (
                  data.map((item) => {
                    // let user = getUser(item.userId);
                    if (
                      // (currentTab === "Trash" && item.message.meta.draft === true) ||
                      // (currentTab === "Archive" && item.message.meta.draft === true)
                      ''
                    ) {
                      return (
                        // <InboxDraftList
                        //   key={item.id}
                        //   item={item}
                        //   data={data}
                        //   setData={setData}
                        //   checkMessage={checkMessage}
                        //   setChecked={setChecked}
                        //   currentTab={currentTab}
                        //   deleteInbox={deleteInbox}
                        //   onArchiveClick={onArchiveClick}
                        //   unArchive={unArchive}
                        //   onFavoriteClick={onFavoriteClick}
                        // />
                        ''
                      );
                    } else
                      return (
                        <div className={`nk-ibx-item`} key={item.id}>
                          <a
                            href="#item"
                            onClick={(ev) => {
                              setTicket(item.ticket_no)
                              setSub(item.subject)
                              // onListClick(ev, item);
                            }}
                            className="nk-ibx-link current"
                          >
                            <span></span>
                          </a>
                      
                          <div className="nk-ibx-item-elem nk-ibx-item-user">
                            {currentTab === "Sent" ? (
                              <p>
                                To :{" "}
                                {/* {getUser(item.message.reply[0].to.user)
                                  ? getUser(item.message.reply[0].to.user).name
                                  : item.message.reply[0].to.mail.split("@")[0]
                                  ? item.message.reply[0].to.mail.split("@")[0]
                                  : item.message.reply[0].to.mail} */}
                              </p>
                            ) : (
                              <div className="user-card">
                                {/* <UserAvatar text={findUpper(user.name)} image={user.img} theme={user.theme} /> */}
                                <div className="user-name">
                                  <div className="lead-text">{item.ticket_no}</div>
                                  {(item.category == 'feedback') ? 
                                  <small className="text-purple">Feedback</small>
                                  : (item.category == 'suggestion') ? 
                                  <small className="text-success">Suggestion</small>
                                  :
                                  <small className="text-primary">Complaint  {(item.sub_category) ? ' - '+ item.sub_category : ''}</small>
                                 }
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="nk-ibx-item-elem nk-ibx-item-fluid">
                            <div className="nk-ibx-context-group">
                                <div className="nk-ibx-context-badges">
                              {(item.status == 1) ?
                                  <Badge color="primary">
                                    Open
                                  </Badge>
                                : (item.status == 2) ? 
                                  <Badge className="bg-purple text-white border-0">
                                    In Progress
                                  </Badge>
                                  
                                : (item.status == 3) ? 
                                <Badge color="warning">
                                  On Hold
                                </Badge>
                                : (item.status == 4) ? 
                                <Badge color="dark">
                                  Customer Action Pending
                                </Badge>
                                : (item.status == 6) ? 
                                <Badge color="info">
                                  ReOpen
                                </Badge>
                                :
                                 <Badge color="success">
                                  Closed
                                </Badge>
                              }
                                </div>
                                
                              <div className="nk-ibx-context">
                                <span className="nk-ibx-context-text c-text-dark">
                                  <span className="heading cmr-2">
                                  <b>{item.subject && item.subject}</b>
                                  </span>{" "}
                                  {item.message.length > 0 && item.message}
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* {item.message.reply[item.message.reply.length - 1].attachment && ( */}
                            {/* <div className="nk-ibx-item-elem nk-ibx-item-attach">
                              <a className="link link-light" href="#link" onClick={(ev) => ev.preventDefault()}>
                                <Icon name="clip-h"></Icon>
                              </a>
                            </div> */}
                          {/* )} */}
                          <div className="nk-ibx-item-elem nk-ibx-item-time w-150px">
                            <div className="sub-text">
                              <Moment date={item.created_at} fromNow />
                              {/* a few second ago */}
                              {/* {item.message.reply[item.message.reply.length - 1].time} */}
                            </div>
                          </div>
                          <div className="nk-ibx-item-elem nk-ibx-item-tools">
                            <div className="ibx-actions">
                             
                              <ul className="ibx-actions-visible gx-2">
                                <li>
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      tag={"a"}
                                      href="#item"
                                      onClick={ (ev) => ev.preventDefault() }
                                      className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                                    >
                                      <Icon name="more-h"></Icon>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                      <ul className="link-list-opt no-bdr">
                                        <li>
                                          <DropdownItem
                                            tag="a"
                                            href="#item"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                              setTicket(item.ticket_no)
                                              setSub(item.subject)
                                            }}
                                          >
                                            <Icon name="eye"></Icon>
                                            <span>View</span>
                                          </DropdownItem>
                                        </li>
                                        <li>
                                          <DropdownItem
                                            tag="a"
                                            href="#item"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                              swal.fire({
                                                title: "Are you sure?",
                                                text: "You won't be able to revert this!",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonText: "Yes, delete it!",
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                  // delCamp(item.campaign_id);
                                                  deleteInbox(item.ticket_no);
                                                }
                                            });
                                            }}
                                          >
                                            <Icon name="trash"></Icon>
                                            <span>Delete</span>
                                          </DropdownItem>
                                        </li>
                                      </ul>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                  })
                ) : (
                  <div className="d-flex justify-content-center align-items-center mt-5">
                    <span className="text-mute">No data available</span>
                  </div>
                )}
              </SimpleBar>
            </React.Fragment>
          
        </React.Fragment>
       }
    </div>
  );
};

export default InboxBody;
