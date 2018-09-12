import { createUser, loginUser, getCurrentUser, getUsersFriendRequest, getMyFriendRequests, rejectFriendRequest, acceptFriendRequest} from './adapter/adapter'

const setUpLoggedInUser = (data) => {
  return getCurrentUser(data.token).then(user => {
    this.setState({currentUser: user.user}, () => {
      localStorage.setItem('token', data.token)
      this.props.history.push(`/users`)
    })
  })
}

const compileAllFriendRequestsIntoState = () => {
  getUsersFriendRequest(this.state.currentUser.id, localStorage.getItem('token'))
  .then(data => this.setState({friendRequests: data.friend_requests}))

  getMyFriendRequests(this.state.currentUser.id, localStorage.getItem('token'))
  .then(data => this.setState({createdFriendRequest: data.friend_requests}))
}

const setSocket = () => {
  this.setState({
    socket: this.state.socket || io("http://localhost:4000/")
  }, () => {

    this.state.socket.on('friend request', (friend_request) => {
      console.log("New Friend Request For you");
      this.setState((prevState) => {
        return {friendRequests: [...prevState.friendRequests, friend_request]}
      })
    });

    this.state.socket.on('connect', () => {
      console.log( 'connected to server' );
      let userObj = {
        id: this.state.currentUser.id
      };
      console.log("THIS IS MY OBJ: ", userObj)
      this.state.socket.emit('register', userObj);
    });

    this.state.socket.on( 'disconnect', function () {
      console.log( 'disconnected to server' );
    });




  });
}

const login = (email, password) => {
  loginUser(email, password)
  .then(data => {
    if (!data.error) { setUpLoggedInUser(data).then(compileAllFriendRequestsIntoState).then(setSocket) }
    else { this.setState({errors: data.error}) }
  })
}


export { login }
