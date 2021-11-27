import React, { Component } from 'react';
import { Admin , Resource, TopToolbar } from 'react-admin';
import jsonServerProvider from './Provider';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { url } from './constants'
import UserIcon from '@material-ui/icons/Group';
import { AppBar } from '@material-ui/core';
import authProvider from './authProvider'

import { CatproductList, CatproductCreate, CatproductEdit } from './catproducts';
import {MyLoginPage} from './layaout';
import { UserList, UserEdit } from './users';
import { AdminList, AdminEdit, AdminCreate  } from './admins';
import { CardList } from './cards';
import { ProductEdit, ProductCreate, ProductList } from './products';
import { OpycardList, OpycardEdit, OpycardCreate  } from './opycards';
import { OrderEdit, OrderList } from './orders';
 

const dataProvider = jsonServerProvider(url);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#16273A",
    },
    secondary: {
      main: "#005ce6",
    },
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  //  overflow: 'hidden',
},
tileBar: {
  background:
      'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
},
});


const App = () => {
  return (
    <Admin
      theme={theme}
      authProvider={authProvider}
      loginPage={MyLoginPage}
      title="HulkStore Dashboard"
      dataProvider={dataProvider}
    >
      {(permissions) => [
        permissions === "0" ? (
          <Resource
            name="admins"
            edit={AdminEdit}
            list={AdminList}
            create={AdminCreate}
            options={{ label: "Administradores" }}
          />
        ) : null,

        permissions === "0" ? (
          <Resource
            name="opycards"
            edit={OpycardEdit}
            list={OpycardList}
            create={OpycardCreate}
            options={{ label: "Accesos Openpay" }}
          />
        ) : null,

        permissions === "1" ? (
          <Resource
            name="catproducts"
            list={CatproductList}
            create={CatproductCreate}
            edit={CatproductEdit}
            options={{ label: "Categorías Productos" }}
          />
        ) : null,

        permissions === "1" ? (
          <Resource
            name="products"
            list={ProductList}
            create={ProductCreate}
            edit={ProductEdit}
            options={{ label: "Productos" }}
          />
        ) : null,

        permissions === "1" ? (
          <Resource
            name="orders"
            list={OrderList}
            edit={OrderEdit}
            options={{ label: "Pedidos" }}
          />
        ) : null,

        permissions === "1" ? (
          <Resource
            name="users"
            icon={UserIcon}
            list={UserList}
            edit={UserEdit}
            options={{ label: "Usuarios " }}
          />
        ) : null,

      ]}
    </Admin>
  );
};

export default App;
