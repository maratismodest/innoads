import {MainLayout} from 'components/MainLayout/MainLayout';
import MDX from 'components/MDX/agreement.mdx'
import React from 'react';

const Agreement = () => {
    return (
        <MainLayout title='Пользовательское соглашение'>
            <MDX/>
        </MainLayout>
    );
};

export default Agreement;