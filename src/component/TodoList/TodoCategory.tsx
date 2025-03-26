import { useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { getTodoItems, saveTodoItems } from "./Todo";
import {
  Categories,
  todoCategory,
  todoDataSet,
  categoryList,
  categoryMenuAtom,
} from "./atomsForTodo";

const CategoryContainer = styled.div`
  position: relative;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Selet = styled.select`
  max-width: 180px;
`;

const MgrContainer = styled.div`
  position: absolute;
  top: 0%;
  right: 0%;
  min-width: 180px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  background-color: ${(prop) => prop.theme.bgTitleColor};
  color: ${(prop) => prop.theme.textTitleColor};
  border: 3px solid ${(prop) => prop.theme.textColor};
  margin: 5px;
  padding: 10px;
`;

const MgrSub = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0px 20px 0px;
  padding: 0px 10px 10px 10px;
  border-bottom: 2px solid;
`;

const MgrItems = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  gap: 10px;
`;

const ButtonPopup = styled.button`
  font-size: 20px;
  border: none;
  background-color: transparent;
`;

const ButtonStyle = styled.button`
  background-color: ${(props) => props.theme.bgShadowColor};
  border: 1px solid ${(props) => props.theme.borderShadow};
  color: ${(props) => props.theme.textColor};

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.bgTitleColor};
  }
`;

const Buttonbox = styled.div`
  display: flex;
  gap: 5px;
`;

const saveCategories = (Cats: string[]) => {
  localStorage.setItem("Categories", JSON.stringify(Cats));
};

const getCategories = (): string[] => {
  const Cats = localStorage.getItem("Categories");
  return Cats ? JSON.parse(Cats) : [];
};

function TodoCategory() {
  const [toDos, setToDos] = useRecoilState(todoDataSet);
  const [todoCat, setTodoCat] = useRecoilState(todoCategory);
  const [categories, setCategories] = useRecoilState(categoryList);
  const [categoryMenu, setCategoryMenu] = useRecoilState(categoryMenuAtom);

  useEffect(() => {
    const newToDos = getTodoItems();
    const newCats = getCategories();

    setToDos(newToDos);
    newCats.length !== 0 && setCategories(newCats);
  }, []);

  const onChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setTodoCat(value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCatName = (e.target as HTMLFormElement).elements.namedItem(
      "newCat"
    ) as HTMLInputElement;

    const categoryName = newCatName.value.toUpperCase();
    if (!categoryName.trim() || categories.includes(categoryName)) return;

    const update = [...categories, categoryName];
    setCategoryMenu((prev) => ({ ...prev, showInput: false }));
    setCategories(update);
    saveCategories(update);
  };

  const onDeleteHandler = (index: number) => {
    const newToDos = toDos.map((todo) =>
      todo.category === categories[index]
        ? { ...todo, category: Categories.TO_DO }
        : todo
    );
    const update = categories.filter((cat, i) => i !== index);
    setCategoryMenu((prev) => ({ ...prev, showMgrPopup: false }));
    setToDos(newToDos);
    saveTodoItems(newToDos);
    setCategories(update);
    saveCategories(update);
  };

  const onMoveHandler = (index: number) => {
    const newToDos = toDos.map((todo) =>
      todo.category === todoCat || todoCat === Categories.ALL
        ? { ...todo, category: categories[index] }
        : todo
    );
    setCategoryMenu((prev) => ({ ...prev, showMoveToPopup: false }));
    setToDos(newToDos);
    saveTodoItems(newToDos);
  };

  const categoryCounts = toDos.reduce((acc, todo) => {
    acc[todo.category] = (acc[todo.category] || 0) + 1;
    acc[Categories.ALL] += 1;
    return acc;
  }, Object.fromEntries(categories.map((category) => [category, 0])) as Record<string, number>);

  return (
    <CategoryContainer>
      <div>
        <label htmlFor="category">Category:</label>
        <Selet onChange={onChangeHandler} value={todoCat} id="category">
          {categories.map((cat, i) => (
            <option key={cat} value={cat}>
              {cat} ({categoryCounts[categories[i]]})
            </option>
          ))}
        </Selet>
      </div>
      {!categoryMenu.showInput &&
        !categoryMenu.showMgrPopup &&
        !categoryMenu.showMoveToPopup && (
          <Buttonbox>
            <ButtonStyle
              onClick={(e) => {
                e.stopPropagation();
                setCategoryMenu((prev) => ({ ...prev, showInput: true }));
              }}
            >
              Add
              <br />
              Category
            </ButtonStyle>
            <ButtonStyle
              onClick={(e) => {
                e.stopPropagation();
                setCategoryMenu((prev) => ({ ...prev, showMgrPopup: true }));
              }}
            >
              Manage
              <br />
              Category
            </ButtonStyle>
            <ButtonStyle
              onClick={(e) => {
                e.stopPropagation();
                setCategoryMenu((prev) => ({ ...prev, showMoveToPopup: true }));
              }}
            >
              Move
              <br />
              Category
            </ButtonStyle>
          </Buttonbox>
        )}
      {categoryMenu.showInput && (
        <form onClick={(e) => e.stopPropagation()} onSubmit={onSubmitHandler}>
          <input
            type="text"
            name="newCat"
            maxLength={15}
            autoFocus={true}
            placeholder="New Category"
          />
        </form>
      )}
      {(categoryMenu.showMgrPopup || categoryMenu.showMoveToPopup) && (
        <MgrContainer onClick={(e) => e.stopPropagation()}>
          <MgrSub>
            {categoryMenu.showMgrPopup ? (
              <span>Select Category to delete</span>
            ) : (
              <span>Select Category to move</span>
            )}
          </MgrSub>
          <ul>
            {categories.map((cat, i) => {
              if (i !== 0) {
                return (
                  <MgrItems key={i}>
                    <span>{cat}</span>
                    {categoryMenu.showMgrPopup
                      ? i !== 1 && (
                          <ButtonPopup onClick={() => onDeleteHandler(i)}>
                            ❌
                          </ButtonPopup>
                        )
                      : categories[i] !== todoCat && (
                          <ButtonPopup onClick={() => onMoveHandler(i)}>
                            ⬅️
                          </ButtonPopup>
                        )}
                  </MgrItems>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </MgrContainer>
      )}
    </CategoryContainer>
  );
}

export default TodoCategory;
