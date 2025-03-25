import { DefaultTheme } from "styled-components/dist/types";
import { atom, selector } from "recoil";

export enum Categories {
  "ALL" = "ALL",
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface ITodo {
  text: string;
  id: number;
  category: Categories;
}

export const themeState = atom<DefaultTheme>({
  key: "ThemeState",
  default: {} as DefaultTheme,
});

export const todoDataSet = atom<ITodo[]>({
  key: "todo",
  default: [],
});

export const todoCategory = atom<Categories>({
  key: "todoCategory",
  default: Categories.TO_DO,
});

export const todoSelector = selector<ITodo[]>({
  key: "todoSelextor",
  get: ({ get }) => {
    const todos = get(todoDataSet);
    const currCat = get(todoCategory);
    console.log(typeof currCat, currCat);
    return currCat === Categories.ALL
      ? todos
      : todos.filter((todo) => todo.category === currCat);
  },
});
