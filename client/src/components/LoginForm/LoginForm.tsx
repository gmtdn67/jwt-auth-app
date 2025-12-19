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

  return (
  <Card className={cls.loginForm}>
    <Text text="JWT-Auth-app" title={t('welcome')}/>
      <Input
        value={email}
        type="text"
        placeholder={t('email')}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        value={password}
        type="password"
        placeholder={t('password')}
        onChange={(event) => setPassword(event.target.value)}
      />
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
