import Vuex from "vuex";
import {getField, updateField} from "vuex-map-fields";
import {saveLangs} from "@/utils/Cookie";

let mysocket;

//https://widetranslator.herokuapp.com/
//const URL = "trusty-fixed-lunamoth.gigalixirapp.com"

function initializeSocket() {
  console.log("====================================================");
  //const URL = "widetranslator.herokuapp.com";
  //const ROOT_SOCKET = `ws://localhost:8080/translate`;
  const ROOT_SOCKET = `wss://limitless-coast-75075.herokuapp.com/translate`;
  let socket = new WebSocket(ROOT_SOCKET);
  // TODO for debugging purpose, delete on production
  window.socket = socket;
  return socket;

}

const createStore = () => {
  return new Vuex.Store({
    state: {
      activeSide: "from",
      fromText: "",
      toText: "",
      pronIPA: "",
      pronSimple: "",
      from: "",
      to: "",
      pronunciationType: "IPA",
      wsReady: false
    },

    getters: {
      getField,
      errorLang(state) {
        return state.fromLang === state.toLang;
      },
      pronText(state) {
        if (state.pronunciationType === "IPA") return state.pronIPA;
        return state.pronSimple;
      }
    },

    mutations: {
      updateField,
      saveCookie(state) {
        console.log(`mutation cookie: ${state.from} to ${state.to}`);
        saveLangs({from: state.from, to: state.to});
      },

      changeLang(state, {side, lang}) {
        console.log("cambiando lenguade de " + side + " a " + lang);
        state[side] = lang;
      },

      toggleActiveSide(state) {
        state.activeSide = state.activeSide === "from" ? "to" : "from";
      },

      updateActiveSide(state, {side}) {
        state.activeSide = side;
      },

      updateText(state, {text}) {
        let side = state.activeSide + "Text";
        //console.log("cambiando texto del lado " + side + " a " + text);
        state[side] = text;
      },
      updateProununciation(state, {to}) {
        state.pronunciationType = to;
      },

      startloadingTranslation(state) {
        mysocket = initializeSocket();
        console.log("esperando mensj");

        mysocket.onopen = function () {
          console.log("cambiando estado websocket")
          state.wsReady = true;
        };

        mysocket.onerror = function(e){
          console.log("error " + e)
        };

        mysocket.onclose = function (e) {
          console.log("reconectando" + e);
          mysocket = initializeSocket();
        };

        mysocket.onmessage = function (e) {
          let payload = JSON.parse(e.data);
          console.log("recibiendo >\n"+JSON.stringify(payload));

          //cargamos la traduccion en el lado no activo
          let lado = state.activeSide === "from" ? "toText" : "fromText";
          state[lado] = payload["toText"];
          state["pronSimple"] = payload["pronSimple"];
          state["pronIPA"] = payload["pronIPA"];
        };


        mysocket.onerror = (e) => console.log("ERROR: " + JSON.stringify(e.data));
      }
    },
    actions: {
      changeLang({commit}, payload) {
        console.log("----------------------------------");
        commit("changeLang", payload);
        commit("saveCookie");
      },

      updateText({commit}, {text}) {
        commit("updateText", {text});
        //dispatch("translate");
      },

      translate({state}, {side} = {side: false}) {
        console.log("dispatched translate");

        let from = side || state.activeSide;
        let to = from === "from" ? "to" : "from";

        let fromLang = state[from] === "EN" ? "EN" : state[from];
        let toLang = state[to] === "EN" ? "EN" : state[to];
        let texto = state[from + "Text"];

        let payload = {
          "from-lang": fromLang,
          "to-lang": toLang,
          "from-content": texto
        };
        console.log("------ enviando por WS payload");
        console.log(JSON.stringify(payload));
        mysocket.send(JSON.stringify(payload));
      }
    }
  });
};

export default createStore;
