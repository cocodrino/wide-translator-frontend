<template lang="pug">
  .content
    vk-navbar(class="uk-nav", transparent=true)
      vk-navbar-nav-item(class="uk-active" title="translator")
    .container
      img(src="/logo.png" id="logo")
      blockquote#quote
        | "temporary available site showing a proof of concept about a translator with pronunciator and keyboard shortcuts" 
        a(href="/blah") more info
      vk-grid
        LangArea(side="from")
        LangArea(side="to")
</template>


<script>
 
import LangArea from "@/components/LangArea";

export default {
 components:{
   LangArea
 }
}
</script>


<style lang="stylus">
  add-border(color,w,radius)
    border-style: solid;
    border-width:w;
    border-color: color;
    -webkit-border-radius: radius
    border-radius: radius


  .container{
    color:white
    // add-border(white,0.4px,5px)
    width: 80%;
    margin:auto;
    margin-top : 180px;
  }

  #logo{
    width:186px;
    position absolute;
    left:45%;
    top:18px
  }

  #quote{
    color:#ffffff9c;
    text-align: center;
    padding-bottom 45px;
    font-size:14px;

  }

  .transparent-form{
    background: #fff0 !important;
    color: #fff;
  }

  .transparent-form:focus {
    outline: none;
    background-color: #fff;
    color: white;
    border-color: #55d6fd;
}

.transparent-form option {
  color: #55d6fd;
  background-color white ;
}
</style>
