import React, { useState } from "react";
import Head from "../../layout/head/Head";
import { Card, FormGroup, Spinner } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  InputSwitch,
  Button,
} from "../../components/Component";
import { useForm } from "react-hook-form";
import { changePassword } from "../../app/api";

import { toast, ToastContainer } from "react-toastify";

const UserProfileSettingPage = ({ sm, updateSm }) => {
  
  const { errors, handleSubmit, register, getValues } = useForm();
  const [fsave, setFsave] = useState(false);

  const updatePass = async (data) => {
    setFsave(true)
    let uid = localStorage.getItem('uid');
    console.log(data);
    let res = await changePassword({
      user_id: uid,
      current_password: data.cur_pass,
      new_password: data.new_pass,
      confirm_password: data.rep_pass
    });

    if(res.code == 200) {
      toast.success("Password updated successfully", {
        position: "top-right",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        // closeButton: <CloseButton />,
      });
    } else {
      toast.error( res.message, {
        position: "top-right",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        // closeButton: <CloseButton />,
      }); 
    }
    setFsave(false)
  
  }

  return (
    <React.Fragment>
      <Head title="User List - Profile"></Head>

      <BlockHead size="lg">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h4">Change Password</BlockTitle>
            <BlockDes>
              <p>Set a unique password to protect your account.</p>
            </BlockDes>
          </BlockHeadContent>
          <BlockHeadContent className="align-self-start d-lg-none">
            <Button
              className={`toggle btn btn-icon btn-trigger mt-n1 ${sm ? "active" : ""}`}
              onClick={() => updateSm(!sm)}
            >
              <Icon name="menu-alt-r"></Icon>
            </Button>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>

      <Block>
        <Card className="card-bordered">
          <div className="card-inner-group">
            <div className="card-inner">
              {/* <div className="between-center flex-wrap g-3"> */}
                <div className="row">
                  <div className="col-md-6">
                  <form method="post" onSubmit={handleSubmit(updatePass)}>
                    <FormGroup>
                      <h6>Current Password</h6>
                      <input type="password" className="form-control" name="cur_pass" ref={register({ required: true })} placeholder="Enter your current password" />
                      {errors.cur_pass && <span className="sm-error">Please enter your current password.</span>}
                    </FormGroup>
                    <FormGroup>
                      <h6>New Password</h6>
                      <input type="password" className="form-control" name="new_pass" ref={register({ required: true })}  placeholder="Enter your new password" />
                      {errors.new_pass && <span className="sm-error">Please enter your new password.</span>}
                    </FormGroup>
                    <FormGroup>
                      <h6>Repeat Password</h6>
                      <input type="password" className="form-control" name="rep_pass" ref={register({ required: true, validate: (val)=> val === getValues("new_pass") })}  placeholder="Repeat your new password" />
                      {errors.rep_pass && <span className="sm-error">Please re-enter your new password.</span>}
                    </FormGroup>
                    <FormGroup>
                      <Button type="submit" color="primary" disabled={fsave}>
                        {(fsave == true) ? <span><Spinner size="sm" /> &nbsp; Updating</span> : 'Update Password'}
                      </Button>
                    </FormGroup>
                  </form>
                  </div>
                </div>
                {/* <div className="nk-block-actions flex-shrink-sm-0">
                  <ul className="align-center flex-wrap flex-sm-nowrap gx-3 gy-2">
                    <li className="order-md-last">
                      <Button color="primary">Change Password</Button>
                    </li>
                    <li>
                      <em className="text-soft text-date fs-12px">
                        Last changed: <span>Oct 2, 2019</span>
                      </em>
                    </li>
                  </ul>
                </div> */}
              {/* </div> */}
            </div>
          </div>
        </Card>
      </Block>
    </React.Fragment>
  );
};
export default UserProfileSettingPage;
