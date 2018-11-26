import * as Sentry from "@sentry/browser";
import React, { Component } from "react";
import ReactDOM from "react-dom";

Sentry.init({
  dsn: "https://d8265ce0b0614c67bf4fa5f3f62d827e@sentry.io/1330250"
});

class ExampleBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.error) {
      //render fallback UI
      return <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>;
    } else {
      //when there's not an error, render children untouched
      return (
        <div>
          <p>here</p>
          <p>{this.props.children}</p>
        </div>
      );
    }
  }
}

ReactDOM.render(<ExampleBoundary />, document.getElementById("root"));
