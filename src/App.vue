<template>
  <div
    class="bg-gray-200 h-screen flex flex-col justify-between md:justify-start md:gap-8 items-center p-4"
  >
    <h1 class="text-gray-800 text-2xl md:text-6xl font-black">
      Filmim 💖 Juntos
    </h1>
    <div class="w-1/2">
      <video
        class="rounded-xl h-64 mx-auto"
        :src="videoURLObject"
        ref="videoElement"
        controls
        v-show="showVideo"
      ></video>
      <h1
        v-show="!showVideo"
        class="text-center text-2xl bg-gray-300 border border-gray-100 rounded-xl p-6"
      >
        Selecione um video no botão abaixo
      </h1>
    </div>

    <div class="w-4/6" v-if="!hasReceived">
      <input
        id="movie-selector"
        type="file"
        @change="handleFileChange"
        hidden
      />
      <label
        for="movie-selector"
        class="block w-64 text-center border rounded-md border-blue-600 bg-blue-500 text-white font-bold p-2 my-8 mx-auto"
        >Selecionar Filme</label
      >

      <div class="flex gap-2">
        <input
          class="py-1 text-center rounded-md border border-gray-500 w-full block"
          type="text"
          v-model="pairID"
          @keydown.enter="handleKey"
          placeholder="Peça o ID do teu mozim ❤️"
        />

        <button
          class="block text-center border rounded-md border-red-600 bg-red-500 text-white font-bold p-2 mx-auto"
          @click="handleKey"
        >
          Assistir
        </button>
      </div>
    </div>

    <strong class="w-1/2 mx-auto flex items-center gap-2">
      <span class="block"> MEU ID: </span>
      <input
        class="py-1 text-center bg-white rounded-md border border-gray-500 block flex-grow"
        type="text"
        v-model="myID"
        @click="$event.target.select()"
      />
    </strong>
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
    const videoURLObject = ref("");
    const showVideo = ref(false);
    const hasReceived = ref(false);

    const handleKey = () => {
      callPeer(myPeer, pairID.value, videoElement.value);
      showVideo.value = true;
    };

    const handleFileChange = (ev) => {
      const { target } = ev;
      const file = target.files[0];
      videoURLObject.value = URL.createObjectURL(file);
    };

    onMounted(() => {
      myPeer.on("open", (id) => (myID.value = id));
      receivePeer(myPeer, videoElement.value, showVideo, hasReceived);
    });

    return {
      pairID,
      myID,
      handleKey,
      videoElement,
      handleFileChange,
      videoURLObject,
      showVideo,
      hasReceived,
    };
  },
};
</script>
