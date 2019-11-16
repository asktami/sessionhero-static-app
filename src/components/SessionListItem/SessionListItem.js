import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { SessionStarRating } from '../SessionStarRating/SessionStarRating'
import './SessionListItem.css'

export default class SessionListItem extends Component {
  render() {
    const { Session } = this.props

    return (
      <Link to={`/Session/${Session.id}`} className='SessionListItem'>
        <div className='SessionListItem__image' style={{backgroundImage: `url(${Session.image})`}} />

        <div className='SessionListItem__details'>
          <div className='SessionListItem__text'>
            <h2 className='SessionListItem__heading'>{Session.title}</h2>
            <p className='SessionListItem__description'>{truncate(Session.content)}</p>
          </div>

          <div className='SessionListItem__reviews'>
            <SessionStarRating rating={Session.average_review_rating} />
            <span id='SessionListItem__review-count'>{readableCommentCount(Session.number_of_comments)}</span>
          </div>
        </div>
      </Link>
    )
  }
}

function readableCommentCount(number) {
  switch(number) {
    case 0:
      return 'no comments yet'

    case 1:
      return `based on 1 comment`

    default:
      return `based on ${number} comments`
  }
}

function truncate(text) {
  const words = text.split(' ')

  if (words.length > 10) {
    return words.slice(0, 10).join(' ') + ' ...'
  }

  return text
}
