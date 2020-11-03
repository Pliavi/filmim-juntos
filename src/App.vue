<template>
  <div class="bg-gray-200 h-screen flex flex-col justify-between md:justify-start md:space-y-8 items-center p-4">
    <h1 class="text-gray-800 text-2xl md:text-6xl font-black"> Filmim 💖 Juntos </h1>
    <div class="w-1/2">
      <video
        class="rounded-xl"
        src="./assets/movies/mighty_goose.mp4"
        ref="videoElement"
        controls
      ></video>
    </div>

    <div class="w-4/6">
      <input class="py-1 text-center rounded-md border border-gray-500 w-full block" type="text" v-model="peerID" @keydown.enter="handleKey" placeholder="Peça o ID do teu mozim ❤️"/>
    </div>

    <strong> MEU ID: {{ myID }} </strong>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { createPeer, receivePeer, callPeer } from "./utils/peerCall";

export default {
  name: "App",
  setup() {
    const pairID = ref("");
    const myID = ref("");
    const myPeer = createPeer();
    const videoElement = ref(null);

    const handleKey = () => {
      callPeer(myPeer, pairID.value, videoElement.value);
    };

    onMounted(() => {
      myPeer.on("open", (id) => (myID.value = id));
      receivePeer(myPeer, videoElement.value);
    });

    return { pairID, myID, handleKey, videoElement };
  },
};
</script>
