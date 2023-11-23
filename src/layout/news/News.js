import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/icon/Icon";
import AppContext from "../../context/AppContext";
import Lottie from 'lottie-react';
import loder from '../../assets/alerte.json'

const News = () => {
  const app = useContext(AppContext);
  return (
    <div className="nk-news-list">
          {(app.sts.wlt <= 15) ? 
      <div className="nk-news-item" >
        <div className="nk-news-icon">
        <Lottie animationData={loder}  style={{height:'50px', width:'50px'}} autoPlay={true} loop={true} />
          {/* <Icon name="alert-fill" /> */}
        </div>
        <div className="nk-news-text text-primary">
          &nbsp;Your wallet Balance is Low. Please &nbsp;<Link to="payment" style={{textDecoration:'underline'}}><b> Add Fund </b></Link>&nbsp; in your wallet.
          {/* <p>
            Your wallet balance is low 
            <span> &nbsp; &nbsp; &nbsp; &nbsp; </span>
            </p>
          <Icon name="external" /> */}
        </div>
      </div>
          : ''}
    </div>
  );
};

export default News;
