import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignIn = () => {
  const navigate = useNavigate();
  return (
    <Form>
      <h1>TodoList</h1>
      <InputContainer>
        <div>
          <label htmlFor="email">이메일</label>
          <input id="email" type="text" data-testid="email-input" />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" data-testid="password-input" />
        </div>
      </InputContainer>
      <ButtonContainer>
        <button type="submit" signin-button>
          로그인
        </button>
        <button
          onClick={() => {
            navigate("/signup");
          }}
          type="button"
          data-testid="signup-button"
        >
          회원가입 하기
        </button>
      </ButtonContainer>
    </Form>
  );
};
export default SignIn;

const Form = styled.form`
  max-width: 450px;
  margin-inline: auto;
  margin-top: 200px;
  h1 {
    text-align: center;
    margin: 30px 0 20px 0;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  label {
    line-height: 2.5rem;
  }
  input {
    border: 1px solid black;
    width: 100%;
    line-height: 10px;
    padding: 0.625rem 0.9375rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 30px;
  button {
    width: 200px;
    margin-inline: auto;
    padding: 10px 20px;
    cursor: pointer;
    border: 0px;
    color: black;
    background-color: #cde990;
    &:hover {
      background-color: #aacb73;
      /* color: white; */
      transition: 0.2s;
    }
  }
`;
