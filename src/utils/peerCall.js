import Peer from "peerjs";

export function createPeer(peerName) {
  if (peerName) {
    return new Peer(peerName, {
      host: "192.168.100.28",
      port: 9000,
      path: "/"
    });
  }

  return new Peer({ host: "192.168.100.28", port: 9000, path: "/" });
}

/** @param { Peer } myPeer
 * @param { HTMLMediaElement } videoElement */
export function callPeer(myPeer, pairPeerName, videoElement) {
  var streamCaptured = videoElement.captureStream();
  myPeer.call(pairPeerName, streamCaptured);
}

/**
 * @param { HTMLMediaElement } videoElement
 * @param { Peer } myPeer */
export function receivePeer(myPeer, videoElement, showVideo, hasReceived) {
  myPeer.on("call", function(call) {
    call.answer();
    call.on("stream", function(remoteStream) {
      videoElement.srcObject = remoteStream;
      videoElement.play();
      showVideo.value = true;
      hasReceived.value = true;
    });
  });
}
