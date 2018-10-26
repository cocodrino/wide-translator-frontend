<template lang="pug">
  div.uk-flex.uk-flex-centered
    p.lang LANG: 
      div.uk-form-control.language-input
        select.uk-select.transparent-form(@change="changeLang")
          option(v-for="option in langs" :selected="option.text == selectedLang" :value="option.value") {{option.text}}
</template>

<script>
export default {
  props:{
    selectedLang : {
      type: String,
    },
    side : {
      type:String,
    }
  },

  data() {
    return {
      langs: ["EN", "ES", "FR", "DE", "IT", "NL", "PL"].map(txt => {
        return { text: txt, value: txt };
      })
    };
  },
  methods: {
    changeLang(event) {
      this.$store.dispatch("changeLang", {
        side: this.side,
        lang: event.target.value
      });
    }
  }
};
</script>

<style lang="stylus">
</style>
