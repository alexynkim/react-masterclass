import { useForm } from "react-hook-form";
import styled from "styled-components";

const FORM = styled.form`
  max-width: 30vw;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface IFORM {
  Email: string;
  FirstName: string;
  LastName: string;
  Username: string;
  Password: string;
  Password1: string;
}

function useFormExec() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFORM>({
    defaultValues: {
      Email: "@gmail.com",
    },
  });

  const onValid = (data: IFORM) => {
    if (data.Password != data.Password1) {
      setError(
        "Password1",
        { message: "Password is different!!" },
        { shouldFocus: true }
      );
    }
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
              value: /^[a-zA-Z0-9().%+-]+@gmail\.com$/,
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
              value: 2,
              message: "Too short",
            },
            validate: {
              noAlex: (value) =>
                value.includes("alex") ? "alex is denied" : true,
              noMike: (value) =>
                value.includes("mike") ? "mike is denied" : true,
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
        <span>{errors?.root?.message}</span>
      </FORM>
    </>
  );
}

export default useFormExec;
