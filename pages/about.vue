<template lang="pug">
  div
    vk-navbar.barra(transparent=true)
      vk-navbar-nav(slot="center-left")
        nuxt-link.bar-link(to="/") HOME
      vk-navbar-logo(slot="center")
        img.logo(src="/logo.png")
      vk-navbar-nav(slot="center-right" active=true)
        nuxt-link.bar-link(to="/about") ABOUT


    vk-modal(:show.sync="show")
      vk-model-title thanks for your comment
      p We'll reply soon
      vk-button(@click="show=false" type="primary") Ok

    .container
      h2.yellow About
      span.about
      |I use the translator (google and more recently deepl) every day, I need to be able to switch quickly between languages 
      |(usually English and Spanish) but modern translators require me to lift my fingers off the keyboard and press certain buttons, 
      |this results in a waste of time.

      span.about
      |I also like to see the pronunciation of words to improve my English, if you are like me and want a more efficient 
      | translator try this small test project and comments to google and deepl that you would like to add these features with a tweet
      
      vk-icon-button.twitter-share(icon="twitter" href="https://twitter.com/intent/tweet?text=Hi%20%40google%20%40DeepLcom%20please%20include%20IPA%20pronunciation%20and%20shortcuts%20in%20your%20translator%20like%20www.sdsd.com")


      h2.yellow Features
      ul
        li automatically detects the language of your browser and selects the translation options for you
        li save the language options so in your next search you don't need to set it
        li change between language boxes using <em class="yellow">tab</em> so you can write in both text boxes
        li delete text using <em class="yellow">ctrl+space</em>
        li show IPA and simplified pronunciation (currently I'm improving the simplified translation)

      h2.yellow Technical Specs
      span.about
      |the application was builded with phoenix elixir at the backend and vuejs at the frontend, the communication is through websockets

      span.about
      |I created a couple of elixir packages for translation and pronunciation, 
      | you can access the code of those packages and this app through my github repository 
      a(href="")  here

      div.contact-me.hide
        h2.yellow send me an email
        span.about
        | Do you have suggestions?...or maybe do you need a dedicated freelance frontend developer for your next project ;-D ??? please let me know 

        form.uk-form-horizontal.myform(@submit.prevent="onSubmit")
          .uk-margin
            label.uk-form-label(for="email") Email
            .uk-form-controls
              input.uk-input.transparent-form(id="email" placeholder="name@email.com",v-model="email")

          .uk-margin
            label.uk-form-label(for="message") Message
            .uk-form-controls
              textarea.uk-textarea.transparent-form(id="message" rows="5" placeholder="tell me something",v-model="message")


          button.uk-button.uk-button-primary( type="submit") Send Email

      

</template>

<script>
//import { VueRecaptcha } from "vue-recaptcha";

export default {
  components: {
    //VueRecaptcha
  },
  data() {
    return {
      show:false,
      message : ""
    };
  },

  methods: {
    onSubmit: function() {
      this.show=true;
      //this.$refs.invisible.execute();
    },
    onVerify: function(response) {
      console.log("Verify: " + response);
    },
    onExpired: function() {
      console.log("Expired");
    }
  }
};
</script>


<style lang="stylus" scoped>
.barra{
  padding-top 25px
  .logo{
    width:140px;
  }
  .bar-link{
    color:#ffa726
  }
}

.hide{
  display: none;
}


.uk-modal{
  color:black
}

.container {
  // add-border(white,0.4px,5px)
  width: 80%;
  margin: auto;
  margin-top: 100px;

  .about {
    margin-bottom: 12px;
    display: block;
    color: white;
  }

  .white {
    color: white;
  }

  .yellow{
    color:#ffa726
  }

 

  .twitter-share {
    margin: 30px 0 0 20px;
    display: grid;
    color: #1f3149;
    background-color : #ffa726
  }

  .force-display {
    display: block !important;
  }

  .myform {
    margin-top: 40px;
    padding-bottom 40px

    .uk-form-label {
      color: white;
    }
  }

  .contact-me {
    padding-top: 40px;
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
}
</style>


