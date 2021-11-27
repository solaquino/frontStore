import React from "react";
import { Datagrid, List, ReferenceField, TextField } from "react-admin";

const AdminList = (props) => (
  <List {...props}>
    <Datagrid>
      <ReferenceField source="id" label="Email" reference="admins">
        <TextField source="email" />
      </ReferenceField>
    </Datagrid>
  </List>
);

export default AdminList;