"use client";

import React, { Component, Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<Props> {
  state = {
    hasError: false,
  };

  logUnhandledRejection = async (event: PromiseRejectionEvent) => {
    await this.logEvent(event.reason.stack);
  };

  logEvent = async (errorStack: string) => {
    await fetch("/api/utils/logs", {
      method: "POST",
      body: JSON.stringify({
        message: errorStack,
        logLevel: "error",
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  componentDidMount() {
    window.addEventListener("unhandledrejection", this.logUnhandledRejection);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.logUnhandledRejection
    );
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.logEvent(error.stack ?? String(error));
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center mt-8">
          Something went wrong. Please try reloading the page.
        </div>
      );
    }

    return this.props.children;
  }
}

export class SmartComponentErrorBoundary extends ErrorBoundary {
  render() {
    if (this.state.hasError) {
      return (
        <div className="my-2 text-gray-400">
          Something went wrong while rendering this smart component.
        </div>
      );
    }

    return this.props.children;
  }
}

const SmartComponentSuspenseErrorBoundary = ({ children }: Props) => {
  return (
    <SmartComponentErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </SmartComponentErrorBoundary>
  );
};

export const withSmartComponentErrorBoundary =
  // eslint-disable-next-line react/display-name
  (Component: React.ComponentType<any>) => (props: Record<string, unknown>) =>
    (
      <SmartComponentSuspenseErrorBoundary>
        <Component {...props} />
      </SmartComponentSuspenseErrorBoundary>
    );

export default ErrorBoundary;
