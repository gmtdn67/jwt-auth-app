import React, { FC, useContext, useState } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import cls from "./LoginForm.module.css"
import Text from '../ui/Text/Text'
import { useTranslation } from "react-i18next";
import LangSwitcher from "../LangSwitcher/LangSwitcher";
import Card from "../Card/Card";

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

  return (
  <Card className={cls.loginForm}>
    <Text text="JWT-Auth-app" title={t('welcome')}/>
      <div className={cls.inputWrapper}>
        {store.emailError && (
          <span className={cls.errorText}>{store.emailError}</span>
        )}
        <Input
          value={email}
          type="text"
          placeholder={t('email')}
          onChange={handleEmailChange}
          className={store.emailError ? cls.inputError : ''}
        />
      </div>
      <div className={cls.inputWrapper}>
        {store.passwordError && (
          <span className={cls.errorText}>{store.passwordError}</span>
        )}
        <Input
          value={password}
          type="password"
          placeholder={t('password')}
          onChange={handlePasswordChange}
          className={store.passwordError ? cls.inputError : ''}
        />
      </div>
      {store.generalError && (
        <div className={cls.generalError}>
          <span className={cls.errorText}>{store.generalError}</span>
        </div>
      )}
      <Button 
        onClick={() => store.login(email, password)}
      >
        {t('login')}
      </Button>
      <Button 
        onClick={() => store.registartion(email, password)}
      >
        {t('registration')}
      </Button>
    </Card>
  );
};

export default observer(LoginForm);
