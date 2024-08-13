import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Login from "../screens/Login";
import { selectCurrentUser } from "../redux/user/selector";

const isAuthHOC = (WrappedComponent) => {
  return (props) => {
    if (!props.user) {
      return <Login {...props} />;
    }
    return <WrappedComponent {...props} />;
  };
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default compose(connect(mapStateToProps), isAuthHOC);
