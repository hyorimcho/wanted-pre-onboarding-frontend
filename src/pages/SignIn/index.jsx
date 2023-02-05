import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signIn } from "../../api";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      email: true,
      password: true,
    });
    const errors = validate();
    setErrors(errors);
    if (Object.values(errors).some((v) => v)) {
      return;
    }
  };

  const validate = useCallback(() => {
    const errors = {
      email: "",
      password: "",
    };

    const emailCheck = () => {
      var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      return values.email !== "" && values.email !== "undefined" && regex.test(values.email);
    };

    if (!emailCheck(values.email)) {
      errors.email = "이메일 형식에 맞게 입력 해 주세요";
    }
    if (!values.password || values.password.length < 8) {
      errors.password = "비밀번호를 8자리 이상 입력하세요";
    }
    if (!errors.email && !errors.password) {
      setDisabled(false);
    }
    return errors;
  }, [values]);

  useEffect(() => {
    setErrors(validate());
  }, [validate]);

  const onSubmit = async () => {
    const { email, password } = values;
    const res = await signIn(email, password);
    console.log(res);
    localStorage.setItem("token", res.access_token);
    if (res.access_token) {
      navigate("/todo");
    } else {
      alert("이메일과 비밀번호를 다시 확인 해 주세요");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>로그인</h1>
      <InputContainer>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="text"
            placeholder="이메일을 입력하세요"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            // autoFocus
          />
          {touched.email && errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {touched.password && errors.password && <span>{errors.password}</span>}
      </InputContainer>
      <ButtonContainer>
        <button type="submit" data-testid="signin-button" onClick={onSubmit} disabled={disabled}>
          로그인
        </button>
        <button
          type="button"
          data-testid="signup-button"
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입 하기
        </button>
      </ButtonContainer>
    </Form>
  );
};
export default SignIn;

const Form = styled.form`
  padding: 30px;
  margin-top: 50px;
  background: #fff;
  border-radius: 10px;
  max-width: 450px;
  margin-inline: auto;
  margin-top: 200px;
  box-shadow: -9px 17px 13px rgb(0 0 0 / 16%);
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
    background-color: #fff;
  }
  span {
    color: red;
    font-size: 14px;
    font-weight: 600;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 30px;
  button {
    width: 180px;
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
    :disabled {
      background-color: grey;
      cursor: default;
    }
  }
`;
