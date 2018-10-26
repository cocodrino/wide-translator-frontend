import Vuex from "vuex";

import { getField, updateField } from "vuex-map-fields";

import { Socket } from "phoenix";
import { saveLangs } from "@/utils/Cookie";

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

const ROOT_SOCKET = "ws://localhost:4000";
let socket = new Socket(ROOT_SOCKET);
let chan = socket.channel("connect:" + guid);
chan.join();

const createStore = () => {
  return new Vuex.Store({
    state: {
      activeSide: "from",
      fromText: "",
      toText: "",
      pronText: "blah",
      from: "",
      to: "",
      pronunciationType: "IPA"
    },

    getters: {
      getField,
      errorLang(state) {
        state.fromLang == state.toLang;
      }
    },

    mutations: {
      updateField,
      saveCookie(state){
        console.log(`mutation cookie: ${state.from} to ${state.to}`  )
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
        console.log("cambiando texto del lado " + side + " a " + text);
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
          state[pronText] = payload[state.pronunciationType];
        });
      }
    },
    actions: {
      changeLang({commit} , payload){
        console.log("----------------------------------")
        commit("changeLang",payload)
        commit("saveCookie")
      },

      translate({ state }) {
        //enviamos el texto del lado activo
        let from = state.activeSide;
        let to = from == "from" ? "to" : "from";
        let payload = {
          "from-lang": from,
          "to-lang": to,
          "from-content": state[from + "Text"]
        };
        console.log("payload");
        console.log(JSON.stringify(payload));
        chan.push("translate", payload);
      }
    }
  });
};

export default createStore;
