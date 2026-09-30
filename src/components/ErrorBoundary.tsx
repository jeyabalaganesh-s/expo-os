// src/components/ErrorBoundary.tsx
import React from "react";

type State = { hasError: boolean; message?: string };

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, message: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: any) {
    // TODO: log to monitoring (Sentry)
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8">
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-gray-600">Error: {this.state.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
