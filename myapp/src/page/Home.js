import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:8080/data").then((res) => setData(res.data));
  }, []);
  const onDelete = (_id) => {
    const div = document.getElementById(`li${_id}`);
    div.remove();
    axios.delete("http://localhost:8080/delete/" + _id).then(() => {
      console.log("삭제완료");
    });
  };
  return (
    <div>
      <h2>Home</h2>
      <ul>
        {data &&
          data.map((el) => (
            <li key={el._id} id={`li${el._id}`}>
              {el.제목} : {el.날짜}{" "}
              <button
                onClick={() => {
                  onDelete(el._id);
                }}
              >
                삭제
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
