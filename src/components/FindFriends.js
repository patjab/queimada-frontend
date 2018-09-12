import React, {Component, Fragment} from 'react'
import FriendInfoCard from './FriendInfoCard'

import {getFriendships} from '../adapter/adapter'

export default class FindFriends extends Component {

  // ADDED THIS MORNING
  componentDidMount() {
    // getFriendships()
  }

  showRandomCards = () => {
    if (!!this.props.friendSuggestions) {
      return this.props.friendSuggestions
      .map(friend => <FriendInfoCard addNewFriend={this.props.addNewFriend} friend={friend} key={friend.id} isSuggested='true'/>)
    }
  }

  render() {
    return (
      <div className="row" id="FindFriends">
        {this.props.friendSuggestions.length > 0 ?
          <Fragment>
            <h1 className="ui huge header">Suggested Friends</h1>
            <div className="ui link cards float left active content">
              {this.showRandomCards()}
            </div>
          </Fragment>
        : <div></div>}
      </div>
    )
  }
}
