import React from "react";
import { connect } from "react-redux";

export const Home = (props) => {
  return <div>Hello</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
