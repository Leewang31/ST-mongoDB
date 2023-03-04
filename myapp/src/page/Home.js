import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:8080/data").then((res) => setData(res.data));
  }, []);
  const onDelete = (_id) => {
    const div = document.getElementById(`li${_id}`);
    const button = document.getElementById(`button${_id}`);
    div.remove();
    button.remove();
    axios.delete("http://localhost:8080/delete/" + _id).then(() => {
      console.log("삭제완료");
    });
  };
  const navigate = useNavigate();
  return (
    <div>
      <ul>
        {data &&
          data.map((el) => (
            <>
              <TodoCard
                key={el._id}
                id={`li${el._id}`}
                onClick={() => {
                  navigate(`/detail/${el._id}`);
                }}
              >
                <p className="postNum">글번호 : {el._id}</p>
                <h2 className="postH2">할일 제목 : {el.제목}</h2>
                <p className="postDate">할일 마감 날짜 {el.날짜}</p>
              </TodoCard>
              <ButtonWrapper>
                <RedButton
                  className="postBtn"
                  id={`button${el._id}`}
                  onClick={() => {
                    navigate(`/edit/${el._id}`);
                  }}
                >
                  수정
                </RedButton>
                <RedButton
                  className="postBtn"
                  id={`button${el._id}`}
                  onClick={() => {
                    onDelete(el._id);
                  }}
                >
                  삭제
                </RedButton>
              </ButtonWrapper>
            </>
          ))}
      </ul>
    </div>
  );
};

export default Home;

const TodoCard = styled.li`
  border: 1px solid lightgrey;
  padding: 15px;
  width: 200px;
  cursor: pointer;
  :hover {
    background-color: lightgray;
  }
  .postNum {
    color: gray;
    font-size: 12px;
  }
  .postH2 {
    margin: 10px 0;
  }
  .postDate {
    margin: 10px 0 30px 0;
    font-size: 12px;
  }
`;
const ButtonWrapper = styled.div`
  position: absolute;
  margin-top: -40px;
  margin-left: 10px;
`;
const RedButton = styled.button`
  background-color: #d1180b;
  border-style: none;
  padding: 5px 8px;
  margin: 0 5px;
  font-family: "JetBrains Mono";
  color: cornsilk;
  border-radius: 8px;
  box-shadow: 1px 1px 3px gray;
  :hover {
    transform: translate(1px, 1px);
    box-shadow: -1px -1px 3px gray;
  }
`;
