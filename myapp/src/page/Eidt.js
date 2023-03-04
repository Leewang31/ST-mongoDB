import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
const Edit = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8080/detail/" + id).then((res) => {
      setData(res.data);
    });
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitHandler = (data) => {
    try {
      axios
        .put(
          `http://localhost:8080/edit/${id}`,
          {
            title: data.title,
            time: data.time,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            navigate("/");
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <WriteWrapper>
      {data !== null && (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <h2 className="writeH2">할일</h2>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={data.제목}
            {...register("title", { required: true })}
          />
          <h2 className="writeH2">Due Date</h2>
          <input
            type="text"
            id="time"
            name="time"
            defaultValue={data.날짜}
            {...register("time", { required: true })}
          />
          <div>
            <SubmitButton type="submit">Submit</SubmitButton>
          </div>
        </form>
      )}
    </WriteWrapper>
  );
};
export default Edit;

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
