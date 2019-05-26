var _ = require("lodash");

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

function getLangsFromBrowser(){
    var default_langs = window.navigator.languages.slice(0);
    default_langs.push("EN");
    default_langs.push("ES");

    let langs= _(default_langs.map(lang => lang.replace(/[^a-zA-Z]+/, "")))
      .map(lang => {
        let l = lang.toUpperCase();
        return _.includes(["EN", "ES", "FR", "DE", "IT", "NL", "PL"], l) ? l : null;
      })
      .uniq()
      .compact()
      .value();

  console.log("lenguajes son " + langs);
    return {from: langs[0], to: langs[1]}
}



export function loadLangs(){
    return getCookie("langs") && JSON.parse(getCookie("langs")) || getLangsFromBrowser()
}

export function saveLangs(obj){
    console.log("salvando cookie " + JSON.stringify(obj))
    setCookie("langs",JSON.stringify(obj),30)
}
