import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitHandler = (data) => {
    axios
      .post(
        "http://localhost:8080/login",
        {
          id: data.id,
          pw: data.pw,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        alert("로그인 성공");
      })
      .catch(() => alert("실패"));
  };
  return (
    <WriteWrapper>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <h2 className="writeH2">아이디</h2>
        <input
          type="text"
          name="id"
          id="id"
          {...register("id", { required: true })}
        />
        <h2 className="writeH2">비밀번호</h2>
        <input
          type="test"
          id="pw"
          name="pw"
          {...register("pw", { required: true })}
        />
        <div>
          <SubmitButton type="submit">Sign in</SubmitButton>
        </div>
      </form>
    </WriteWrapper>
  );
};
export default Login;
const WriteWrapper = styled.main`
  .writeH2 {
    font-family: "JetBrains Mono";
    font-size: 14px;
    margin: 10px 0;
  }
`;
const SubmitButton = styled.button`
  background-color: #d1180b;
  border-style: none;
  margin: 10px 0;
  padding: 5px 8px;
  font-family: "JetBrains Mono";
  color: cornsilk;
  border-radius: 8px;
  box-shadow: 1px 1px 3px gray;
  :hover {
    transform: translate(1px, 1px);
    box-shadow: -1px -1px 3px gray;
  }
`;
