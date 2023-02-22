import styled from "styled-components";
const Write = () => {
  return (
    <WriteWrapper>
      <form action="/add" method="POST">
        <h2 className="writeH2">할일</h2>
        <input type="text" name="title" />
        <h2 className="writeH2">Due Date</h2>
        <input type="text" name="date" />
        <div>
          <SubmitButton>Submit</SubmitButton>
        </div>
      </form>
    </WriteWrapper>
  );
};
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
export default Write;
