import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserService';
import Layout from './components/ui/Layout/Layout';
import Button from './components/ui/Button/Button';
import Card from './components/Card/Card';
import { useTranslation } from 'react-i18next';
import LangSwitcher from './components/LangSwitcher/LangSwitcher';

const App: FC = () => {

  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])
  const { t } = useTranslation();

  useEffect( () => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  if (store.isLoading) {
    return <div>Загрузка...</div>
  }

  if (!store.isAuth) {
    return (
      <Layout>
        <LoginForm />
      </Layout>
    )
  }
  return (
    <Layout>
      <Card>
      <LangSwitcher />
      <h1>{store.isAuth ? `${t('user')} ${store.user.email} ${t('authorized')}` : 'Пользователь не авторизован'}</h1>
      <h1>{store.user.isActivated ? `${t('confirmed')}` : `${t('to confirm')}`}</h1>
      <Button onClick={() => store.logout()}>{t('logout')}</Button>
      <div>
        <Button onClick={getUsers}>{t('userslist')}</Button>
      </div>
      <div>
        {users.map( user => 
          <Card key={user.email}>{user.email}</Card>
        )}
      </div>
      </Card>
    </Layout>
  );
}

export default observer(App);
