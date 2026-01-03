import React, { FC, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Context } from '../..';
import { IUser } from '../../models/IUser';
import UserService from '../../services/UserService';
import LangSwitcher from '../LangSwitcher/LangSwitcher';
import cls from './Dashboard.module.css';

const Dashboard: FC = () => {
  const { store } = useContext(Context);
  const { t } = useTranslation();
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const getUsers = async () => {
    try {
      setIsLoadingUsers(true);
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  return (
    <div className={cls.dashboard}>
      <div className={cls.header}>
        <div className={cls.userInfo}>
          <h1 className={cls.greeting}>{t('welcome')}, {store.user.email?.split('@')[0]}!</h1>
          <div className={cls.email}>{store.user.email}</div>
          <div className={`${cls.status} ${store.user.isActivated ? cls.statusActivated : cls.statusNotActivated}`}>
            <span className={cls.statusIcon}></span>
            {store.user.isActivated ? t('confirmed') : t('to confirm')}
          </div>
        </div>
        <div className={cls.headerActions}>
          <LangSwitcher />
          <button className={`${cls.button} ${cls.buttonDanger}`} onClick={() => store.logout()}>
            {t('logout')}
          </button>
        </div>
      </div>

      <div className={cls.content}>
        <div className={cls.usersSection}>
          <h2 className={cls.sectionTitle}>
            <span>👥</span>
            {t('userslist')}
          </h2>
          <button 
            className={cls.button} 
            onClick={getUsers}
            disabled={isLoadingUsers}
          >
            {isLoadingUsers ? 'Загрузка...' : t('userslist')}
          </button>
          
          {users.length > 0 ? (
            <div className={cls.usersList}>
              {users.map((user) => (
                <div key={user.email} className={cls.userCard}>
                  <div className={cls.userEmail}>{user.email}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className={cls.emptyState}>
              <div className={cls.emptyStateText}>
                Нажмите кнопку выше, чтобы загрузить список пользователей
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(Dashboard);

