import {
  MyRootState,
  TodosState,
  UserState,
  Todo,
  RootCommitType,
} from "@/types";
import { ActionContext } from "vuex";

const state: TodosState = {
  todos: new Array(2).fill(undefined).map((_, index: number) => {
    return {
      id: Date.now(),
      text: "something is here " + index,
      color: "blue",
    };
  }),
};
const mutations = {
  SET_TODOS(state: TodosState, payload: Todo[]): void {
    if (typeof payload !== "object" || payload === null)
      return console.error(
        "payload must be a specific type of object but it was ",
        payload
      );
    state.todos = payload;
  },
  ADD_TODO(state: TodosState, payload: Todo): void {
    if (typeof payload !== "object" || payload === null)
      return console.error(
        "payload must be a specific type of object but it was ",
        payload
      );
    state.todos.unshift(payload);
  },
  DELETE_TODO(state: TodosState, index: number): void {
    if (typeof index !== "number" || index === null)
      return console.error(
        "index argument must be a number but it was: ",
        index
      );
    state.todos.splice(index, 1);
  },
  EDIT_TODO(state: TodosState, payload: { index: number; text: string }): void {
    const { index, text } = payload;
    //cant check if the index is !zero and return because 0 is a falsey value in javascript. even though
    // arrays are zero indexed haha
    // so adding 1 to prevent the zero indexing to throw this console error.
    if (!(index + 1) || !text)
      return console.error(
        "error in edit todo commit payload types are incorrect"
      );
    state.todos[index].text = text;
  },
};
const actions = {
  async addTodo(
    { commit }: ActionContext<UserState, MyRootState>,
    payload: Todo
  ): Promise<void | boolean> {
    if (typeof payload !== "object" || payload === null)
      return console.error(
        "payload must be a specific type of object but it was ",
        payload
      );
    try {
      commit("todos/ADD_TODO" as RootCommitType, payload, { root: true });
      return Promise.resolve(true);
    } catch (error) {
      console.error(error);
      return Promise.resolve(false);
    }
  },
  async setTodos(
    { commit }: ActionContext<TodosState, MyRootState>,
    payload: TodosState
  ): Promise<void | boolean> {
    try {
      commit("todos/SET_TODOS" as RootCommitType, payload, { root: true });
      return Promise.resolve(true);
    } catch (error) {
      console.error(error);
      return Promise.resolve(false);
    }
  },
  async deleteTodo(
    { commit }: ActionContext<TodosState, MyRootState>,
    index: number
  ): Promise<void | boolean> {
    try {
      commit("todos/DELETE_TODO" as RootCommitType, index, { root: true });
      return Promise.resolve(true);
    } catch (error) {
      console.error(error);
      return Promise.resolve(false);
    }
  },
  async editTodo(
    { commit }: ActionContext<TodosState, MyRootState>,
    payload: { index: number; text: string }
  ): Promise<void | boolean> {
    try {
      commit("todos/EDIT_TODO" as RootCommitType, payload, { root: true });
      return Promise.resolve(true);
    } catch (error) {
      console.error(error);
      return Promise.resolve(false);
    }
  },
};
const getters = {
  todos(state: TodosState): Todo[] | [] {
    return state.todos || [];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};