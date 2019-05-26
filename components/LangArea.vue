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
          div
            PronouncingBox(v-if="selectedLang=='EN'")

</template>

<script>
import LanguageInput from "@/components/LanguageInput";
import PronouncingBox from "@/components/PronouncingBox";
let _ = require("lodash");

export default {
  components: {
    LanguageInput,
    PronouncingBox
  },
  props: {
    side: {
      type: String,
      required: true
    }
  },

  data() {
    return {};
  },

  mounted() {
    window.mystate = this.$store;
    window.ventana = this;
  },

  created() {
    this.sendWS = _.debounce(
      () => this.$store.dispatch("translate"),
      50,
      { leading: true, trailing: true }
    );
  },

  computed: {
    selectedLang() {
      return this.$store.state[this.side];
    },

    texto: {
      get() {
        return this.$store.state[this.side + "Text"];
      },
      set(text) {
        this.$store.dispatch("updateText", { text });
        //

        if (text.length > 4) this.sendWS();
      }
    },
    activeSide() {
      console.log("cambiado lado activo");
      return this.$store.state.activeSide;
    },
    isReady(){
      return this.$store.state.wsReady;
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

    clearText() {
      //throw "buscame"
      this.$nextTick(() => (this.texto = ""));
    }
  }
};
</script>



<style lang="stylus">
.activo {
  background-color: #563e1a !important;
}

.hidden {
  display: none;
}
</style>


