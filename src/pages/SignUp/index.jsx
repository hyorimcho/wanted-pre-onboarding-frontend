import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUp = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    // validate();
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
  console.log(touched);
  return (
    <Form onSubmit={handleSubmit}>
      <h1>회원 가입</h1>
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
        <button type="submit" disabled={disabled}>
          회원가입 하기
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/signin");
          }}
        >
          돌아가기
        </button>
      </ButtonContainer>
    </Form>
  );
};
export default SignUp;

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
    background-color: #ffd4d4;
    &:focus {
      background-color: white;
    }
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
    :disabled {
      background-color: grey;
      cursor: default;
    }
  }
`;
