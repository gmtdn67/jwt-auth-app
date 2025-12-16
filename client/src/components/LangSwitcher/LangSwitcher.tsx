import React from 'react';
import { useTranslation } from 'react-i18next';
import cls from './LangSwitcher.module.css';

const LangSwitcher = () => {
    const { i18n } = useTranslation()

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }
    return (
        <div className={cls.switchers}>
            <button className={cls.lang} onClick={() => changeLanguage('ru')} >RU</button>
            <button className={cls.lang} onClick={() => changeLanguage('en')}>EN</button>
        </div>
    );
};

export default LangSwitcher;