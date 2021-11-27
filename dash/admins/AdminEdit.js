import React from 'react';
import {
    Edit,required,AutocompleteInput,
    SimpleForm,ReferenceInput,
    TextInput
} from 'react-admin';
//import withStyles from '@material-ui/core/styles/withStyles';
//const { style } = require('../styles/formStyle');

//const AdminEdit = withStyles(style)(({classes, ...props})    => {
const AdminEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput
          label="Username"
          source="username"
          validate={required("Ingrese username")}
          resettable
        />
        <ReferenceInput
          label="Línea de negocio"
          source="bsline"
          reference="bslines"
          perPage={100}
        >
          <AutocompleteInput optionText="drink_name" />
        </ReferenceInput>
        <TextInput label="Email" source="email" required resettable />
        <TextInput label="Password" source="password" required resettable />
      </SimpleForm>
    </Edit>
  );
};

export default AdminEdit;

