import {
  MyRootState,
  CardsState,
  UserState,
  Card,
  RootDispatchType,
  RootCommitType,
} from "@/types";
import { ActionContext } from "vuex";

const state: UserState = {
  user: {
    username: "",
    email: "",
    token: "",
    cards: [] as Card[],
    loggedIn: false,
  },
};
const mutations = {
  SET_USER(state: UserState, payload: UserState): void {
    console.log("set user commit some payload", payload);

    if (typeof payload !== "object")
      return console.error("payload was was not an object!");
    state.user = {
      ...state.user,
      ...payload,
    } as UserState["user"];
    delete state.user.token;
  },
  SET_USER_TODOS(state: UserState, payload: Card[]): void {
    console.log("setting user todos payload!!!", payload);
    state.user.cards = payload;
  },
  SET_LOGGED_IN(state: UserState, payload: boolean): void {
    console.log("setting logged in", payload);
    state.user = {
      ...state.user,
      loggedIn: payload,
    };
  },
  // eslint-disable-next-line
  CLEAR_USER(state: UserState, payload: any): void {
    state.user = payload;
  },
};
const actions = {
  async setUserCards(
    { commit }: ActionContext<UserState, MyRootState>,
    payload: Card[]
  ): Promise<void> {
    try {
      commit("user/SET_USER_CARDS" as RootCommitType, payload, { root: true });
      Promise.resolve();
    } catch (error) {
      Promise.resolve(error);
    }
  },
  async setUser(
    { commit }: ActionContext<UserState, MyRootState>,
    payload: UserState
  ): Promise<void> {
    commit("user/SET_USER" as RootCommitType, payload, { root: true });
  },
  async getUserCards(
    { dispatch }: ActionContext<UserState, MyRootState>,
    payload: CardsState
  ): Promise<void> {
    //some db call to get logged in user's account cards

    //get the cards then set them on the cards state of the users login page

    //type casting here provides the autocomplete for string union type of
    // all possible rootstate actions accessed with the root: true option as 3rd argument
    await dispatch("user/setUserCards" as RootDispatchType, payload, {
      root: true,
    });

    //set the cards on the page
    await dispatch("cards/setCards" as RootDispatchType, payload, {
      root: true,
    });
  },
};
const getters = {
  user(state: UserState): UserState["user"] {
    return state.user;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
