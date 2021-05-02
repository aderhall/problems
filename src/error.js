import React from "react";
import "./error.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: null, errorInfo: null};
  }
  //static getDerivedStateFromError(_error) {
  //  return {hasError: true};
  //}
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({error: error, errorInfo: errorInfo});
  }
  render() {
    if (this.state.error !== null) {
      return this.props.onError(this.state.error, this.state.errorInfo);
    }
    return this.props.children;
  }
}

function SetError({children}) {
  return <ErrorBoundary onError={(error, errorInfo) =>
    <div className="SetError">
      <h2>Something went wrong.</h2>
      <p>There was an error creating or displaying the problems you requested. This is almost certainly my fault, and if you email me at <a href="mailto://muzioclavecin@gmail.com">muzioclavecin@gmail.com</a> I'll try to fix it as soon as possible. Please include the following text:</p>
      <p>URL: {window.location.href}, Error: {error.toString()} – {JSON.stringify(errorInfo)}</p>
    </div>
  }>{children}</ErrorBoundary>
}

export {SetError};