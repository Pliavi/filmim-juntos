import { reactive, readonly } from "vue";

export const createStreamStore = () => {
  const state = reactive({
    self_time: 0,
    pair_time: 0,
    speed: 1, // tweak as unpaired
    ping: 0
  });

  /** @param {HTMLVideoElement} playerRef */
  const pairTime = (playerRef) => {
    state.self_time = playerRef.currentTime
    state.pair_time = 
  }

  return {
    state: readonly(state)
  };
};
