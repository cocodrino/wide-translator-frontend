<template>
  <div>
    <script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async defer></script>
    <nuxt/>
  </div>
</template>

<style>
 html{
  width: 100%;
  height: 100%;
  background-color: #b3e5fe;
 
  /* background-image: linear-gradient(to left bottom, #19263d, #1c2b43, #1f3049, #21364f, #243b55); */
  background-image: linear-gradient(to left bottom, #152136, #1a283f, #1f3048, #233852, #28405b);
 
  color:white;

 }

 .uk-button-primary {
    background-color: #ffa726;
    color: black;
    border: 1px solid transparent;
}

.uk-button-primary:active, .uk-button-primary.uk-active {
    background-color: #ffa726;
    color: black;
}

.uk-button-primary:hover, .uk-button-primary:focus {
    background-color: #b5781e;
    color: #131313;
}

  a{
    color:#ffa726
  }
</style>
