import Vuex from "vuex";

import { getField, updateField } from "vuex-map-fields";

import { Socket } from "phoenix";
import { saveLangs } from "@/utils/Cookie";
var _ = require("lodash");

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

const URL = "trusty-fixed-lunamoth.gigalixirapp.com"
window.Socket = Socket
const ROOT_SOCKET = `wss://${URL}/socket`;
let socket = new Socket(ROOT_SOCKET);
socket.connect()
let chan = socket.channel("connect:" + guid());
chan.join();

const createStore = () => {
  return new Vuex.Store({
    state: {
      activeSide: "from",
      fromText: "",
      toText: "",
      pronIPA:"",
      pronSimple:"",
      from: "",
      to: "",
      pronunciationType: "IPA"
    },

    getters: {
      getField,
      errorLang(state) {
        state.fromLang == state.toLang;
      },
      pronText(state){
        if (state.pronunciationType=="IPA") return state.pronIPA
        return state.pronSimple
      }
    },

    mutations: {
      updateField,
      saveCookie(state) {
        console.log(`mutation cookie: ${state.from} to ${state.to}`);
        saveLangs({ from: state.from, to: state.to });
      },

      changeLang(state, { side, lang }) {
        console.log("cambiando lenguade de " + side + " a " + lang);
        state[side] = lang;
      },

      toggleActiveSide(state) {
        let new_state = state.activeSide == "from" ? "to" : "from";
        state.activeSide = new_state;
      },

      updateActiveSide(state, { side }) {
        state.activeSide = side;
      },

      updateText(state, { text }) {
        let side = state.activeSide + "Text";
        //console.log("cambiando texto del lado " + side + " a " + text);
        state[side] = text;
      },
      updateProununciation(state, { to }) {
        state.pronunciationType = to;
      },

      startloadingTranslation(state) {
        console.log("esperando mensj");
        chan.on("translate", payload => {
          console.log(JSON.stringify(payload));

          //cargamos la traduccion en el lado no activo
          let lado = state.activeSide == "from" ? "toText" : "fromText";
          state[lado] = payload.translation;
          state["pronSimple"] = payload["simple"];
          state["pronIPA"] = payload["IPA"];
        });

        chan.onError((err)=>console.log("ERROR: "+  err))

      }
    },
    actions: {
      changeLang({ commit }, payload) {
        console.log("----------------------------------");
        commit("changeLang", payload);
        commit("saveCookie");
      },

      updateText({ commit}, { text }) {
        commit("updateText", { text });
        //dispatch("translate");
      },

      translate({ state },{side}={side:false}) {
        console.log("dispatched translate");
        
          let from = side || state.activeSide;
          let to = from == "from" ? "to" : "from";

          let fromLang = state[from] == "EN" ? "EN" : state[from];
          let toLang = state[to] == "EN" ? "EN" : state[to];
          let texto = state[from + "Text"];

          let payload = {
            "from-lang": fromLang,
            "to-lang": toLang,
            "from-content": texto
          };
          console.log("------ enviando por WS payload");
          console.log(JSON.stringify(payload));
          chan.push("translate", payload);
      }

      
    }
  });
};

export default createStore;
