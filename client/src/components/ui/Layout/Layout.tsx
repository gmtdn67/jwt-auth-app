import React, { FC, ReactNode } from 'react';
import cls from './Layout.module.css'

interface LayoutProps {
    children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <div className={cls.background}>
            <div className={cls.layout}>
                {children}
            </div>
        </div>
    );
};

export default Layout;