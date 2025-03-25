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
  category: string;
}

export const todoDataSet = atom<ITodo[]>({
  key: "todo",
  default: [],
});

export const todoCategory = atom<string>({
  key: "todoCategory",
  default: Categories.ALL,
});

export const todoSelector = selector<ITodo[]>({
  key: "todoSelextor",
  get: ({ get }) => {
    const todos = get(todoDataSet);
    const currCat = get(todoCategory);

    return currCat === Categories.ALL
      ? todos
      : todos.filter((todo) => todo.category === currCat);
  },
});

export const categoryList = atom<string[]>({
  key: "CategoryList",
  default: [
    Categories.ALL,
    Categories.TO_DO,
    Categories.DOING,
    Categories.DONE,
  ],
});

export const showInputAtom = atom({
  key: "ShwoInput",
  default: false,
});

export const showMgrPopupAtom = atom({
  key: "ShowMgrPopup",
  default: false,
});

export const showMoveToPopupAtom = atom({
  key: "ShowMoveToPopup",
  default: false,
});
