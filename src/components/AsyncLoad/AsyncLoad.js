import React from "react";
import Spinner from "../spinner"

class AsyncComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Component: null,
    };
  }

  componentDidMount() {
    this.props.loader().then((Component) => {
      var Component = Component.default
      this.setState({ Component });
    });
  }

  render() {
    
    const { Component } = this.state;
    
    const { renderPlaceholder } = this.props;
    if (Component) {
      return <Component {...this.props} />;
    }

    return renderPlaceholder ?
      renderPlaceholder() :
      <Spinner />;
  }
}

export default AsyncComponent