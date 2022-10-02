import React, { Component } from 'react';

import Error404 from './error-404.svg';

export class ErrorBoundary extends Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div className=" bg-white flex justify-center grow">
          <div className="p-12 flex flex-col justify-center">
            <h1 className="text-center text-3xl font-bold text-primary">
              Something went wrong!
            </h1>
            <p className="m-4 text-primary text-center">
              Please refresh the page or check your network if the problem
              persists.
            </p>
            <img className="m-4 h-72" src={Error404} alt="error" />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
