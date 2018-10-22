import Vuex from "vuex";

import { getField, updateField } from 'vuex-map-fields';

const createStore= () => {
    return new Vuex.Store({
        
        state:{
            activeSide : "from",
            fromText:"",
            toText:"",
            from:"ENG",
            to:"ES",
            pronunciationType: "IPA"
        },

        getters:{getField,
            errorLang(state){
                state.fromLang == state.toLang 
            }},

        mutations: {
            updateField,

            changeLang(state,{side,lang}){
                state[side] = lang
            },

            toggleActiveSide(state){
                let new_state = state.activeSide == "from" ? "to" : "from"
                state.activeSide= new_state
            },

            updateActiveSide(state,{side}){
                state.activeSide = side
            },

            updateText(state,{fromOrTo,text}){
                state[fromOrTo] = text
            },
            updateProununciation(state,{to}){
                state.pronunciationType=to
            }


        },
        actions: {

        }
    })
}

export default createStore