import React, { FC, useContext, useState } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import LangSwitcher from "../LangSwitcher/LangSwitcher";
import cls from "./LoginForm.module.css";

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const { store } = useContext(Context);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (store.emailError) {
      store.setEmailError(null);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (store.passwordError) {
      store.setPasswordError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent, isLogin: boolean) => {
    e.preventDefault();
    if (isLogin) {
      store.login(email, password);
    } else {
      store.registartion(email, password);
    }
  };

  return (
    <div className={cls.container}>
      <div className={cls.langSwitcherWrapper}>
        <LangSwitcher />
      </div>
      <h1 className={cls.title}>{t('welcome')}</h1>
      
      <form onSubmit={(e) => handleSubmit(e, true)}>
        <div className={cls.inputWrapper}>
          {store.emailError && (
            <span className={cls.errorText}>{store.emailError}</span>
          )}
          <input
            className={`${cls.input} ${store.emailError ? cls.inputError : ''}`}
            type="email"
            placeholder={t('email')}
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div className={cls.inputWrapper}>
          {store.passwordError && (
            <span className={cls.errorText}>{store.passwordError}</span>
          )}
          <input
            className={`${cls.input} ${store.passwordError ? cls.inputError : ''}`}
            type="password"
            placeholder={t('password')}
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        {store.generalError && (
          <div className={cls.generalError}>
            <span className={cls.errorText}>{store.generalError}</span>
          </div>
        )}

        <div className={cls.buttonGroup}>
          <button type="submit" className={cls.button}>
            {t('login')}
          </button>
          <button 
            type="button" 
            className={`${cls.button} ${cls.buttonSecondary}`}
            onClick={(e) => handleSubmit(e, false)}
          >
            {t('registration')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default observer(LoginForm);
