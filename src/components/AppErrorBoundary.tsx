import React from 'react';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export default class AppErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('UI error boundary caught an error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 text-center">
          <div className="max-w-lg rounded-2xl border bg-card p-6">
            <h1 className="text-xl font-bold">A rendering error occurred</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Please refresh the page. If the issue persists, clear browser cache and service worker.
            </p>
            <button
              type="button"
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-primary-foreground"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
