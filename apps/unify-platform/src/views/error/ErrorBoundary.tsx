import ClientMonitor from 'skywalking-client-js'
import React from 'react'

interface ErrorBoundaryProps {
  hasError: boolean
}

// React
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryProps> {
  static defaultProps = { hasError: false }

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: React.ErrorInfo) {
    console.log('error', error)
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: object) {
    // You can also log the error to an error reporting service

    console.log('errorInfo', errorInfo)
    ClientMonitor.reportFrameErrors(
      {
        collector: 'http://192.168.64.78:8080/',
        service: 'react-demo',
        pagePath: '/app',
        serviceVersion: 'v1.0.0',
      },
      error,
    )
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
