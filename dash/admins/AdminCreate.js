import React from 'react';
import {
    Create,required,
    SelectInput,AutocompleteInput,
    SimpleForm,ReferenceInput,
    TextInput,usePermissions
} from 'react-admin';

//import withStyles from '@material-ui/core/styles/withStyles';
//const { style } = require('../styles/formStyle');

const validateUserCreation = (values) => {
    var espacio = [0];
    const errors = {};
    if ( values.username <=espacio) {
        errors.username = ['Ingrese username'];
    }
    if(values.email <= espacio){
        errors.email=['ingrese email']
    }
    return errors
};
 

const AdminCreate = ({ ...props }) => {
  const { permissions } = usePermissions();
  return (
    <Create {...props}>
      <SimpleForm validate={validateUserCreation}>
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
        <TextInput
          label="Email"
          source="email"
          validate={required("Ingrese email")}
          resettable
        />
        <TextInput
          label="Password"
          source="password"
          validate={required("Ingrese password")}
          resettable
        />
        <SelectInput
          source="level"
          choices={[
            permissions === "0" ? { id: 1, name: "Administrador" } : null,
            permissions === "1" ? { id: 2, name: "Usuario creador" } : null,
          ]}
          defaultValue={"0"}
        />
      </SimpleForm>
    </Create>
  );
};

export default AdminCreate;

