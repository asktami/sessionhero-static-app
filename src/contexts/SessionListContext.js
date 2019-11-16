import React, { Component } from 'react'

const SessionListContext = React.createContext({
  SessionList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setSessionList: () => {},
})
export default SessionListContext

export class SessionListProvider extends Component {
  state = {
    SessionList: [],
    error: null,
  };

  setSessionList = SessionList => {
    this.setState({ SessionList })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    const value = {
      SessionList: this.state.SessionList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setSessionList: this.setSessionList,
    }
    return (
      <SessionListContext.Provider value={value}>
        {this.props.children}
      </SessionListContext.Provider>
    )
  }
}
