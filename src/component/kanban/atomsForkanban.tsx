import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface ITodo {
  text: string;
  id: number;
  //category: string;
}

export interface ITodoSelect {
  [key: string]: ITodo[];
}

export const todoDataSet = atom<ITodoSelect>({
  key: "toDosKanban",
  default: {
    [Categories.TO_DO]: [
      { text: "1", id: 1 },
      { text: "2", id: 2 },
      { text: "3", id: 3 },
    ],
    [Categories.DOING]: [
      { text: "4", id: 4 },
      { text: "5", id: 5 },
      { text: "6", id: 6 },
    ],
    [Categories.DONE]: [
      { text: "7", id: 7 },
      { text: "8", id: 8 },
      { text: "9", id: 9 },
    ],
  },
});

export const todoCategory = atom<string>({
  key: "kanbanCategory",
  default: Categories.TO_DO,
});

// export const todoSelector = selector<ITodoSelect>({
//   key: "categorizedTodos",
//   get: ({ get }) => {
//     const todos = get(todoDataSet);
//     const categories = get(categoryList);

//     const categorizedData: ITodoSelect = categories.reduce((acc, category) => {
//       acc[category] = []; // 모든 카테고리 초기화
//       return acc;
//     }, {} as ITodoSelect);

//     todos.forEach((todo) => {
//       if (categorizedData[todo.category]) {
//         categorizedData[todo.category].push(todo);
//       }
//     });

//     return categorizedData;
//   },
// });
