import React, { FC, useContext, useState } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { store } = useContext(Context);

  return (
    <div>
      <input
        value={email}
        type="text"
        placeholder="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        value={password}
        type="password"
        placeholder="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button 
        onClick={() => store.login(email, password)}
      >
        Логин
      </button>
      <button 
        onClick={() => store.registartion(email, password)}
      >
        Регистрация
      </button>
    </div>
  );
};

export default observer(LoginForm);
