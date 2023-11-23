import React from "react";
import Head from "../../layout/head/Head";
import {
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  LoginLogTable,
  Button,
} from "../../components/Component";

const UserProfileActivityPage = ({ sm, updateSm }) => {

  const downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob(['MySampleText'], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = "verify.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
  return (
    <React.Fragment>
      <Head title="User List - Profile"></Head>
      <BlockHead size="lg">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h4">Login Activity</BlockTitle>
            {/* <Button className="btn btn-primary" onClick={()=>{
              downloadFile();
            }}>Download</Button> */}
            <BlockDes>
              <p> Here is your last 10 login activities log. {" "}
                {/* <span className="text-soft">
                  <Icon name="info" />
                </span> */}
              </p>
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
      <LoginLogTable />
    </React.Fragment>
  );
};
export default UserProfileActivityPage;
