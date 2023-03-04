import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Detail = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios.get("http://localhost:8080/detail/" + id).then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <div>
      Detail {id}
      <div>제목 : {data && data.제목}</div>
      <div>날짜 : {data && data.날짜}</div>
    </div>
  );
};
export default Detail;
