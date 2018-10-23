<template lang="pug">
  .container
    span.about
    |I use the translator (google and more recently deepl) every day, I need to be able to switch quickly between languages 
    |(usually English and Spanish) but modern translators require me to lift my fingers off the keyboard and press certain buttons, 
    |this results in a waste of time.

    span.about
    |I also like to see the pronunciation of words to improve my English, if you are like me and want a more efficient 
    | translator try this small test project and comments to google and deepl that you would like to add these features with a tweet
    
    vk-icon-button.twitter-share(icon="twitter" href="https://twitter.com/intent/tweet?text=Hi%20%40google%20%40DeepLcom%20please%20include%20IPA%20pronunciation%20and%20shortcuts%20in%20their%20apps%20like%20www.sdsd.com")

    span.about
    |the application is constructed using elixir phoenix in the backend and vuejs in the frontend 

    span.about
    |I created a couple of elixir packages for translation and pronunciation, 
    | you can access the code of those packages and this app through my github repository 
    a(href="")  here

    
    h4.white do you want to send me an email...or Do you need a dedicated frontend vuejs developer ;-D ??? please let me know 

    form.uk-form-horizontal.myform(@submit.prevent="onSubmit")
      .uk-margin
        label.uk-form-label(for="email") Email
        .uk-form-controls
          input.uk-input(id="email" placeholder="name@email.com")

      .uk-margin
        label.uk-form-label(for="message") Message
        .uk-form-controls
          textarea.uk-textarea(id="message" rows="5" placeholder="tell me something")

      vue-recaptcha(
        ref="invisible"
        @verify="onVerify"
        @expired="onExpired"
        :sitekey="sitekey"
      )
      button.uk-button.uk-button-primary( type="submit") Send Email

    

</template>

<script>
import {VueRecaptcha} from "vue-recaptcha"

export default {
  components:{
    VueRecaptcha
  },
  data() {
    return {
      show: false
    };
  },

  methods: {
    onSubmit: function () {
      this.$refs.invisible.execute()
    },
    onVerify: function (response) {
      console.log('Verify: ' + response)
    },
    onExpired: function () {
      console.log('Expired')
    },

  }
};
</script>


<style lang="stylus" scoped>
.container {
  // add-border(white,0.4px,5px)
  width: 80%;
  margin: auto;
  margin-top: 180px;

  .about {
    margin-bottom: 12px;
    display: block;
    color: white;
  }

  .white {
    color: white;
  }

  .twitter-share{
    margin:10px;
    display: grid;
    color: #1f3149;
  }

  .force-display {
    display: block !important;
  }

  .myform{
    margin-top:40px;

    .uk-form-label{
      color:white
    }
  }

}
</style>


