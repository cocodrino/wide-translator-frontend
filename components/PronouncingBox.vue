<template lang="pug">
  transition(name="fade")
    div.pronounce-box
        span.pr-text
        | {{pronunciation}}
        .uk-flex.uk-flex-right.uk-flex-middle.pronounce-buttoms
          div.label pronunciation
          .uk-button-group
            button.uk-button.ukbutton-small.pronounce-buttom(
              @click="updatePronunciation('IPA')" 
              v-bind:class="{ 'activo':  pronunciationType == 'IPA' }" 
              :active="pronunciationType=='IPA'") IPA
            button.uk-button.ukbutton-small.pronounce-buttom(
              @click="updatePronunciation('simple')" 
              v-bind:class="{ 'activo':  pronunciationType == 'simple' }" 
              :active="pronunciationType=='simple'") simple
</template>

<script>
import { mapFields } from "vuex-map-fields";
export default {
  computed: {
    ...mapFields(["pronunciationType"]),
    pronunciation() {
      return this.$store.getters.pronText;
    }
  },
  methods: {
    updatePronunciation(to) {
      this.$store.commit("updateProununciation", { to });
    }
  }
};
</script>

<style lang="stylus">
.pronounce-box {
  background: #ffa726;
  color: #3c3014;
  font-size: 14px;
  padding-top: 8px;

  .pr-text {
    padding: 0 4px 5px 4px;
  }
}

.pronounce-buttoms {
  font-size: 10px;

  .label {
    margin-right: 12px;
    padding: 0 4px 5px 4px;
  }

  .pronounce-buttom {
    background-color: #ad7017;
    font-size: 13px;
    color: #fff;
    border: 1px solid transparent;
  }

  .pronounce-buttom:hover {
    background-color: #563e1a;
  }

  .pronounce-buttom:active {
    background-color: #563e1a;
  }
}

//handel animation
.fade-enter-active, .fade-leave-active {
  transition: all 0.25s ease-out;
 
}

//final
.fade-enter-to .fade-leave{
   transform: rotateX(0deg)
}

//inicial
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: rotateX(45deg)
}

</style>
