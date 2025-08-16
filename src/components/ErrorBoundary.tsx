import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Solar System Error Boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center w-full h-full bg-black text-white">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">🌌 Solar System Loading...</h2>
            <p className="text-lg mb-4">Initializing the cosmic experience</p>
            <p className="text-sm opacity-70">
              {this.state.error?.message || 'Something went wrong, but we\'re fixing it!'}
            </p>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              🚀 Retry Launch
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
