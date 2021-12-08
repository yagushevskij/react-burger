import React, { ErrorInfo } from 'react'

export default class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: {}) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {}

  render() {
    if (this.state.hasError) {
      return (
        <section>
          <h1>Что-то пошло не так :(</h1>
          <p>В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.</p>
        </section>
      )
    }
    return this.props.children
  }
}
