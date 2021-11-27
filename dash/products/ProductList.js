import React from "react";
import { Datagrid, List, ReferenceField, TextField } from "react-admin";

const ProductList = (props) => (
  <List {...props}>
    <Datagrid>
      <ReferenceField label="Nombre" source="id" reference="products" sortable={false}>
        <TextField source="name" />
      </ReferenceField>

      <TextField source="costo" label="Precio" />
    </Datagrid>
  </List>
);

export default ProductList;
