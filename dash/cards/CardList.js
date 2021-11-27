import React from "react";
import { Datagrid, List, ReferenceField, TextField } from "react-admin";

const CardList = props => (
  <List {...props} >
      <Datagrid>
          <ReferenceField label="Descripción" source="id" reference="cards" sortable={false} sortByOrder="DESC">
              <TextField source="card_number" />
                            <TextField source="holder_name" />
                            <TextField source="brand" />
          </ReferenceField>

      </Datagrid>
  </List>
);


export default CardList;
