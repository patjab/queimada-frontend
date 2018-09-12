import FriendInfo from './FriendInfo'
import FindFriends from './FindFriends'
import React, {Component} from 'react'

export default class InteractiveFriendContainer extends Component {
  render() {
    const randomIndexes = []

    const suggestions = this.props.friendSuggestions
    const totalNumOfFriendSuggestions = this.props.friendSuggestions.length
    let currentChosenIndex = Math.trunc(Math.random()*totalNumOfFriendSuggestions)

    let limit = totalNumOfFriendSuggestions < 5 ? totalNumOfFriendSuggestions : 5

    for ( let i = 0; i < limit; i++ ) {
      while ( randomIndexes.includes(currentChosenIndex) ) {
        currentChosenIndex = Math.trunc(Math.random()*totalNumOfFriendSuggestions)
      }
      randomIndexes.push(currentChosenIndex)
    }

    const randomlySelectedSuggestions = []
    for ( let i = 0; i < randomIndexes.length; i++ ) {
      randomlySelectedSuggestions.push(suggestions[randomIndexes[i]])
    }

    return (
      <div className="column" id="content" style={{"paddingTop":"20px"}}>
        <FriendInfo deleteFriend={this.props.deleteFriend} currentFriend={this.props.currentFriend} currentUser={this.props.currentUser}/>
        <FindFriends addNewFriend={this.props.addNewFriend} friendSuggestions={randomlySelectedSuggestions} currentUser={this.props.currentUser} friendshipsList={this.props.friendshipsList}/>
      </div>
    )
  }
}
