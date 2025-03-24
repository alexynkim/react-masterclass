import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const FORM = styled.form`
  max-width: 30vw;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// function TodoList() {
//   const [todo, setTodo] = useState("");

//   const onChangeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
//     const {
//       currentTarget: { value },
//     } = e;
//     setTodo(value);
//     console.log(value);
//   };

//   const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
//     e.preventDefault();
//     console.log(todo);
//     setTodo("");
//   };

//   return (
//     <>
//       <form onSubmit={onSubmitHandler}>
//         <input
//           onChange={onChangeHandler}
//           value={todo}
//           placeholder="Input new todo"
//         ></input>
//       </form>
//     </>
//   );
// }

interface IFORM {
  Email: string;
  FirstName: string;
  LastName: string;
  Username: string;
  Password: string;
  Password1: string;
}

function TodoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFORM>({
    defaultValues: {
      Email: "@naver.com",
    },
  });

  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(errors);

  return (
    <>
      <FORM onSubmit={handleSubmit(onValid)}>
        <input
          {...register("Email", {
            required: "Email is required",
            minLength: {
              value: 5,
              message: "Too short",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
              message: "Only @gmail.com emails are allowed",
            },
          })}
          placeholder="Email"
        ></input>
        <span>{errors?.Email?.message}</span>
        <input
          {...register("FirstName", { required: "FirstName is required" })}
          placeholder="First Name"
        ></input>
        <span>{errors?.FirstName?.message}</span>
        <input
          {...register("LastName", { required: "LastName is required" })}
          placeholder="Last Name"
        ></input>
        <span>{errors?.LastName?.message}</span>
        <input
          {...register("Username", {
            required: "Username is required",
            minLength: {
              value: 5,
              message: "Too short",
            },
          })}
          placeholder="Username"
        ></input>
        <span>{errors?.Username?.message}</span>
        <input
          {...register("Password", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Too short",
            },
          })}
          placeholder="Password"
        ></input>
        <span>{errors?.Password?.message}</span>
        <input
          {...register("Password1", {
            required: "Confirm Password is required",
            minLength: {
              value: 5,
              message: "Too short",
            },
          })}
          placeholder="Confirm Password"
        ></input>
        <span>{errors?.Password1?.message}</span>
        <button>ADD</button>
      </FORM>
    </>
  );
}

export default TodoList;
