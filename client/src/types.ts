export interface Todo {
  id: number;
  text: string;
  color: string | "blue";
}

//for some reason this interface for the event didn't export for whatever reason....strange...oh well it
// only applies to the todolist component anyways
export interface MyDOMInputEvent extends Event {
  target: EventTarget & {
    //for some reason value isn't a property on the vanilla EventTarget type given by typescript....
    // so we are forcing it to be a property
    value: number | string;
  };
}
export interface MeQueryResponse extends Object {
  me: {
    user: {
      token: string;
      username: string;
      email: string;
    };
    errors: MyErrorResponse;
  };
}
export interface MyRootState {
  user: UserState;
  todos: TodosState;
}
export interface UserState {
  user: {
    username: string | null;
    email: string | null;
    token: string | null;
    todos: Todo[];
  };
}

export interface UserEntityBase {
  id?: number;
  username: string;
  email: string;
  token: string | null;
  createdAt: number;
  updatedAt: number;
}
export interface TodosState {
  todos: Array<Todo>;
}

export type RootDispatchType =
  | "user/setUserToken"
  | "user/setUserTodos"
  | "user/setUser"
  | "todos/setTodos"
  | "todos/deleteTodo"
  | "todos/editTodo"
  | "todos/addTodo";

export type RootCommitType =
  | "user/SET_USER"
  | "user/CLEAR_USER_TOKEN"
  | "todos/ADD_TODO"
  | "todos/SET_TODOS"
  | "todos/DELETE_TODO"
  | "todos/EDIT_TODO";

export interface CustomError {
  field: string;
  message: string;
}
export type MyErrorResponse = CustomError[] | null;

export interface RegisterResponse {
  register: {
    errors: MyErrorResponse;
    token: string | null;
    user: UserEntityBase | null;
  };
}
export interface LoginResponse {
  login: {
    errors: MyErrorResponse;
    token: string | null;
    user: UserEntityBase | null;
  };
}
