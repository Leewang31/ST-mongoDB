import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState();
  useEffect(() => {
    console.log("HI");
    axios.get("/data").then((res) => console.log(res));
  }, []);
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
};

export default Home;
