import React, { FC, useContext, useEffect } from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import Layout from './components/ui/Layout/Layout';

const App: FC = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store]);

  if (store.isLoading) {
    return (
      <Layout>
        <div style={{ 
          color: 'white', 
          fontSize: '1.5rem', 
          fontWeight: 600,
          textAlign: 'center'
        }}>
          Загрузка...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {!store.isAuth ? <LoginForm /> : <Dashboard />}
    </Layout>
  );
};

export default observer(App);
