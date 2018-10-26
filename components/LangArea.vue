<template lang="pug">
    div(class="uk-width-1-2@m")
      div(class="uk-flex uk-flex-center") 
        LanguageInput(v-bind:selectedLang="selectedLang",v-bind:side="side")  
      div.uk-width-1-1.uk-margin-top
        div.uk-margin
          button.hidden(v-shortkey="['ctrl', 'space']" @shortkey="clearText" @click="clearText") clear text
          textarea.uk-textarea.transparent-form.transparent-area(rows="5",
            ref="fromArea" @focus="forceFocus()" 
            v-model="texto" @keydown.tab="keymonitor")
          
          transition(name="fade")
            div.pronounce-box(v-if="selectedLang=='ENG'")
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
import LanguageInput from "@/components/LanguageInput"
import { mapFields } from "vuex-map-fields";

export default {
  components:{
    LanguageInput
  },
  props: {
    side: {
      type: String,
      required: true
    }
  },

  data() {
    return {
     
      
    };
  },

  mounted() {
    window.mystate = this.$store;
    window.ventana = this;
  },

  computed: {
    ...mapFields(["pronunciationType"]),
    selectedLang() {
      return this.$store.state[this.side];
    },

    texto: {
      get() {
        return this.$store.state[this.side + "Text"];
      },
      set(text) {
        this.$store.commit("updateText", { text });
      }
    },
    activeSide() {
      console.log("cambiado lado activo");
      return this.$store.state.activeSide;
    },

    pronunciation(){
      return this.$store.state.pronText
    }
  },

  //TODO: refactor this, we don't need an inner state selectedInner nor a selectedLang watcher, found a better way to accomplish this
  watch: {
    activeSide: function(newV, _) {
      console.log("cambiando focus");
      //newV=="from" ? this.$refs.fromArea.$el.focus() : this.$refs.fromArea.blur()
      newV == this.side
        ? this.$nextTick(() => this.$refs.fromArea.focus())
        : this.$nextTick(() => this.$refs.fromArea.blur());
    }
  },

  methods: {
    changeFocus() {
      this.$store.commit("toggleActiveSide");
    },

    forceFocus() {
      this.$store.commit("updateActiveSide", { side: this.side });
    },



    keymonitor(event) {
      event.preventDefault();
      this.$store.commit("toggleActiveSide");
      console.log(event.key);
    },
    updatePronunciation(to) {
      this.$store.commit("updateProununciation", { to });
    },
    clearText(){
      //throw "buscame"
      this.$nextTick(()=>this.texto = "")
      
    }
  }
};
</script>



<style lang="stylus">
.lang {
  margin: 10px 20px;
}

.transparent-area {
  font-size: 20px;
}

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

.activo{
  background-color: #563e1a !important;
}

.hidden{
  display:none
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


