<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <input type="text" v-model="peerID" @keydown.enter="handleKey" />
</template>

<script>
import Peer from "peerjs";
import { ref } from "vue";

export default {
  name: "App",
  setup() {
    const peerID = ref("");
    const peer = new Peer({ host: "localhost", port: 9000, path: "/" });

    const handleKey = () => {
      console.log(peerID.value)
      const conn = peer.connect(peerID.value);
      conn.on("open", () => {
        conn.send("hi!");
      });
    };

    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        console.log(data);
      });
      conn.on("open", () => {
        conn.send("hello!");
      });
    });

    return { peerID, handleKey };
  },
};
</script>
