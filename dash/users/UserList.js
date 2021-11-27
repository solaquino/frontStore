import React from 'react';
import {Datagrid, List, ReferenceField, TextField } from 'react-admin';

const UserList = props => (
    <List {...props} >
        <Datagrid>
            <ReferenceField  source="id" label="email" reference="users" sortable={false} sortByOrder="DESC">
                <TextField source="email"/>
            </ReferenceField>
            <TextField  source="username" label="username"/>
        </Datagrid>
    </List>
);

export default UserList;