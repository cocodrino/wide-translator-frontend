<template lang="pug">
    div(class="uk-width-1-2@m")
      div(class="uk-flex uk-flex-center") 
        p.lang LANG: 
        div.uk-form-control
          select.uk-select.transparent-form
            option ES
            option ENG
            option FR
          
      div.uk-width-1-1.uk-margin-top
        div.uk-margin
          textarea.uk-textarea.transparent-form(rows="12",ref="toArea")
      div.uk-width-1-1.pronuncation-box
        span
        | traducción de algun contenido acá
</template>

<script>
export default {
  
}
</script>

