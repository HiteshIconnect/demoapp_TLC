import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Login from "../screens/Login";
import { sendUserDetails } from "../redux/user/selector";

const roleHoc = (WrappedComponent) => {
  
  return (props) => {
    let roles={
      "TLC Integration  Administrator":['PO','IT','PM','pikup','instdel'],
      "TLC-Warehouse Manager":['PO','IT','PM','WOdet'],
      "TLC-Production Manager":['PM','WOdet'],
      "TLC-Installer":['pikup','instdel','WOdet'],
      "TLC-Security":['captureImg','security','WOdet']
    }
    let userRole= props.userDetails?.currentRole

     if(roles[userRole].includes(props.id)){
      return <WrappedComponent {...props} />;
     }
     return null
  };
};

const mapStateToProps = createStructuredSelector({
  userDetails:sendUserDetails
});


export default compose(connect(mapStateToProps), roleHoc);
