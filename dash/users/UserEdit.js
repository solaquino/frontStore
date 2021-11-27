import React from 'react';
import {
    Datagrid,required,
    Edit,
    FormTab,
    ReferenceManyField,
    TabbedForm,
    TextField,
    TextInput } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
const {style} = require('../styles/formStyle');

const UserEdit =  withStyles(style)(({ classes, ...props }) => {

    return (
        <Edit title={"Editar Usuario"} {...props}>
            <TabbedForm>
                <FormTab label="General">
                    <TextInput label="email" source="email" validate={required('Ingrese email')} resettable formClassName={classes.input} />
                    <TextInput label="username" source="username" validate={required('Ingrese user name')} resettable formClassName={classes.input} />
                </FormTab>

                <FormTab label="Tarjetas">
                    <ReferenceManyField reference="cards" target="user" addLabel={false}>
                        <Datagrid>
                            <TextField source="card_number" />
                            <TextField source="holder_name" />
                            <TextField source="brand" />
                            
                        </Datagrid>
                    </ReferenceManyField>
                </FormTab>

            </TabbedForm>
        </Edit>
    );

});

export default UserEdit;