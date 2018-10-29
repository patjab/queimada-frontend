import React, {Fragment, Component} from 'react'

import $ from 'jquery'
import Handlebars from 'handlebars'
import SimpleWebRTC from 'simplewebrtc'

export default class VideoChat extends Component {
  state = {
    calling: false
  }

  componentDidMount() {
    if (this.props.currentUser && Object.keys(this.props.currentFriend).length !== 0) {
      let username = this.props.currentUser.email
      let roomName = [this.props.currentUser.email, this.props.currentFriend.email].sort().join("")

      const localVideoEl = $('#local-video');
      const remoteVideoTemplate = Handlebars.compile($('#remote-video-template').html());
      const remoteVideosEl = $('#remote-videos');

      const webrtc = new SimpleWebRTC({
        localVideoEl: 'local-video',
        remoteVideosEl: 'remote-videos',
        autoRequestMedia: true,
      });

      console.log(webrtc)

      webrtc.on('localStream', () => {
        localVideoEl.show();
      });

      $('#join-btn').on('click', (event) => {
        $(`#join-btn`).html("Calling")
        webrtc.joinRoom(roomName);
        return false;
      });

      webrtc.on('videoAdded', (video, peer) => {
        $(`#join-btn`).remove()
        const id = webrtc.getDomId(peer);
        const html = remoteVideoTemplate({ id });

        let localVideoEl = document.getElementById('local-video')
        let remoteVideoEl = document.getElementById('remote-videos').firstChild

        console.log(localVideoEl)
        console.log(remoteVideoEl)

        $('#allVideos').append(html);
        $(`#${id}`).html(video);
        $(`#${id}`).addClass('ui image large')

        const topStatus = document.getElementById(`topStatus`)
        topStatus.classList += " activeTopStatus"

        topStatus.appendChild(document.createElement('BR'))
        topStatus.innerHTML = `Secure Chat`

        const statusBar = document.getElementById(`statusBar`)
        statusBar.appendChild(document.createElement('BR'))
        statusBar.appendChild(document.createTextNode(`You are now privately chatting with ${this.props.currentFriend.full_name}`))
        statusBar.appendChild(document.createElement('BR'))
        statusBar.appendChild(document.createElement('BR'))
        statusBar.classList += " activeStatusBar"

        const hangUpButton = document.createElement('BUTTON')

        hangUpButton.setAttribute('id', 'hangUpButton')
        hangUpButton.innerHTML = 'Hang Up'
        hangUpButton.classList = 'ui button negative'

        statusBar.appendChild(hangUpButton)

        document.getElementById(`allVideos`).style['background-color'] = 'black'

        document.getElementById(`hangUpButton`).addEventListener('click', ()=> {
          window.location.reload()
        })
      });
    }
  }

  render() {
    return (<div style={{"paddingTop":"20px"}}>
      <div id="allVideos" className="video-container">
          <div id="topStatus"></div>
          <span id="remote-videos" className="ui large" style={{"margin":"20px"}}></span>
          <video id="local-video" className="ui large image hidden" style={{"margin":"20px"}} autoplay></video>
          <div className="overlay-desc">
            { (this.props.currentUser && Object.keys(this.props.currentFriend).length !== 0) ?
                <button id="join-btn" className="ui submit green massive transparent button" style={{"opacity":"0.6"}}>Call {this.props.currentFriend.full_name}</button>
                  : null
            }
          </div>
      </div>
      <div id="statusBar"></div>

      <script id="remote-video-template" type="text/x-handlebars-template"></script>
    </div>)
  }
}
