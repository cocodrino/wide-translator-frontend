<template lang="pug">
  .content
    .container
      img(src="/logo.png" id="logo")
      blockquote#quote
        | "temporary available site showing a proof of concept about a translator with pronunciator and keyboard shortcuts" 
        <nuxt-link to="/about">more info</nuxt-link>
      vk-grid
        LangArea(side="from")
        LangArea(side="to")
      div.leyenda
        div shortcuts:
        span.uk-display-block
        | press tab for toggle between text areas (you can type in both text areas!!!)
        span.uk-display-block
        | press ctrl+space for clear text area
      div#footer
        | if you like the ideas of this translator please give us a tweet
        vk-icon-button.twitter-share(icon="twitter" href="https://twitter.com/intent/tweet?text=Hi%20%40google%20%40DeepLcom%20please%20include%20IPA%20pronunciation%20and%20shortcuts%20in%20your%20translator%20like%20www.sdsd.com")
</template>


<script>
import LangArea from "@/components/LangArea";
import { loadLangs } from "@/utils/Cookie";

export default {
  components: {
    LangArea
  },
  mounted() {
    this.$nextTick(function() {
      this.$store.commit("startloadingTranslation");
      let { from, to } = loadLangs();
      this.$store.dispatch("changeLang", { side: "from", lang: from });
      this.$store.dispatch("changeLang", { side: "to", lang: to });
    });
  }
};
</script>


<style lang="stylus">
add-border(color, w, radius) {
  border-style: solid;
  border-width: w;
  border-color: color;
  -webkit-border-radius: radius;
  border-radius: radius;
}

.container {
  color: white;
  // add-border(white,0.4px,5px)
  width: 80%;
  margin: auto;
  margin-top: 220px;
}

#logo {
  width: 186px;
  position: absolute;
  left: 45%;
  top: 18px;
}

#quote {
  color: #ffffff9c;
  text-align: center;
  padding-bottom: 45px;
  font-size: 14px;
}

.transparent-form {
  background: #fff0 !important;
  color: #fff;
}

.transparent-form:focus {
  outline: none;
  background-color: #fff;
  color: white;
  border-color: #55d6fd;
}

.leyenda {
  color: #ffa726;
  font-size: 13px;
}

.transparent-form option {
  color: #55d6fd;
  background-color: white;
}

#footer{
  margin-top: 70px;
  text-align : center;

  .twitter-share{
    margin-left : 15px;
     color: #1f3149;
    background-color : #ffa726
  }
 


}
</style>
