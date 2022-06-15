import {MainLayout} from 'components/MainLayout/MainLayout';
import MDX from 'components/MDX/delete.mdx'
import React from 'react';

const Delete = () => {
    return (
        <MainLayout title='Чтобы удалить свои данные, напишие к нам запрос'>
            <MDX/>
        </MainLayout>
    );
};

export default Delete;