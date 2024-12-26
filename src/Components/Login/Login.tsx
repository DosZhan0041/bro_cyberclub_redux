import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface User {
  email: string | null;
  password: string | null;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [eyes, setEyes] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    email: null,
    password: null,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Password не может быть пустым",
  );
  const [isValid, setIsValid] = useState(false);
  const [loginError, setLoginError] = useState("");

  const signIn = () => {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (!response.ok) {
          if (
            response.status === 401 ||
            response.status === 403 ||
            response.status === 400
          ) {
            throw new Error("Неправильный логин или пароль");
          }
          throw new Error("Ошибка HTTP, статус " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data.user, accessToken: data.accessToken }),
        );
        navigate("/");
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };
  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };
  useEffect(() => {
    if (emailError || passwordError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setNewUser((prev) => ({ ...prev, email: e.target.value }));
    const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный Email");
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setNewUser((prev) => ({ ...prev, password: e.target.value }));
    if (e.target.value.length < 6 || e.target.value.length > 15) {
      setPasswordError("Пароль должен быть длиннее 6 и меньше 15");
      if (!e.target.value) {
        setPasswordError("Пароль не должен быть пустым");
      }
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="registration">
      <form action="" className="form login">
        <h1>Login</h1>
        {loginError && (
          <div
            className="warning-auth"
            style={{ color: "red", fontSize: "14px" }}
          >
            {loginError}
          </div>
        )}
        {emailDirty && emailError && (
          <div
            className="warning-auth"
            style={{
              color: "red",
              fontSize: "14px",
              display: "flex",
              justifyContent: "start",
              width: "60%",
            }}
          >
            {emailError}
          </div>
        )}
        <input
          type="text"
          onBlur={blurHandler}
          value={email}
          name="email"
          placeholder="Email"
          onChange={(e) => emailHandler(e)}
        />
        {passwordDirty && passwordError && (
          <div
            className="warning-auth"
            style={{
              color: "red",
              fontSize: "14px",
              display: "flex",
              justifyContent: "start",
              width: "65%",
              marginLeft: "15px",
            }}
          >
            {passwordError}
          </div>
        )}
        <div className="input_password">
          <input
            className="input_svg"
            onBlur={(e) => blurHandler(e)}
            value={password}
            name="password"
            type={eyes ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => passwordHandler(e)}
          />
          {eyes ? (
            <span onClick={() => setEyes(false)}>
              <FaEye />
            </span>
          ) : (
            <span onClick={() => setEyes(true)}>
              <FaEyeSlash />
            </span>
          )}
        </div>
        <button
          type="button"
          disabled={!isValid}
          className="btn"
          onClick={signIn}
        >
          Войти
        </button>
        <Link to="/register">Зарегистрироваться</Link>
      </form>
    </div>
  );
};
export default Login;
