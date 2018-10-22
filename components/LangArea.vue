<template lang="pug">
    div(class="uk-width-1-2@m")
      div(class="uk-flex uk-flex-center") 
        //button(@click="changeFocus") change focus
        p.lang LANG: 
        div.uk-form-control
          select.uk-select.transparent-form(@change="changeLang" v-model="selectedInner")
            option(v-for="option in langs" :selected="option.text == selectedLang" :value="option.value") {{option.text}}
          
      div.uk-width-1-1.uk-margin-top
        div.uk-margin
          textarea.uk-textarea.transparent-form.transparent-area(rows="5",
            ref="fromArea" @focus="forceFocus()" 
            v-model="fromText" @keydown.tab="keymonitor")
          div.pronounce-box(v-if="selectedInner=='ENG'")
            span.pr-text
            | algun texto acá
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
  props: {
    side: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      selectedInner: "AUTO",
      langs: ["ENG", "ES", "FR", "DE", "IT", "NL", "PL"].map(txt => {
        return { text: txt, value: txt };
      })
    };
  },

  mounted() {
    window.mystate = this.$store;
    window.ventana = this;
    this.selectedInner = this.$store.state[this.side];
  },

  computed: {
    ...mapFields(["pronunciationType"]),
    selectedLang() {
      return this.$store.state[this.side];
    },

    fromText: {
      get() {
        return this.$store.state[this.side + "Text"];
      },
      set(text) {
        this.$store.commit("updateText", { fromOrTo: "fromText", text });
      }
    },
    activeSide() {
      console.log("cambiado lado activo");
      return this.$store.state.activeSide;
    }
  },

  watch: {
    selectedLang: function(n, _) {
      this.selectedInner == n;
    },

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

    changeLang(event) {
      console.log(this.selectedInner);

      this.$store.commit("changeLang", {
        side: this.side,
        lang: this.selectedInner
      });
    },

    keymonitor(event) {
      event.preventDefault();
      this.$store.commit("toggleActiveSide");
      console.log(event.key);
    },
    updatePronunciation(to) {
      this.$store.commit("updateProununciation", { to });
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
  font-size: 17px;
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
</style>


