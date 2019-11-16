import React, { Component } from 'react'

export const nullSession = {
  author: {},
  tags: [],
}

const SessionContext = React.createContext({
  Session: nullSession,
  comments: [],
  error: null,
  setError: () => {},
  clearError: () => { },
  setSession: () => {},
  clearSession: () => {},
  setComments: () => {},
  addComment: () => {},
})

export default SessionContext

export class SessionProvider extends Component {
  state = {
    Session: nullSession,
    error: null,
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setSession = Session => {
    this.setState({ Session })
  }

  setComments = comments => {
    this.setState({ comments })
  }

  clearSession = () => {
    this.setSession(nullSession)
    this.setComments([])
  }

  addComment = comment => {
    this.setComments([
      ...this.state.comments,
      comment
    ])
  }

  render() {
    const value = {
      Session: this.state.Session,
      comments: this.state.comments,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setSession: this.setSession,
      setComments: this.setComments,
      clearSession: this.clearSession,
      addComment: this.addComment,
    }
    return (
      <SessionContext.Provider value={value}>
        {this.props.children}
      </SessionContext.Provider>
    )
  }
}
