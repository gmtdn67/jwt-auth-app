import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserService';
import Layout from './components/ui/Layout/Layout';
import Button from './components/ui/Button/Button';

const App: FC = () => {

  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])

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
    <div>
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'Пользователь не авторизован'}</h1>
      <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'Подтвердите аккаунт по почте'}</h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить список пользователей</button>
      </div>
      <div>
        {users.map( user => 
          <div key={user.email}>{user.email}</div>
        )}
      </div>
    </div>
  );
}

export default observer(App);
