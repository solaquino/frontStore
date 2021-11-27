import React, { Fragment, PropTypes, Component } from "react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Link } from "react-router-dom";
import ImageIcon from "@material-ui/icons/Image";

import ReactImageMagnify from "react-image-magnify";

import {
  Button,
  required,
  DeleteButton,
  BooleanField,
  Datagrid,
  Edit,
  FormTab,
  ImageField,
  ImageInput,
  Pagination,
  ReferenceField,
  ReferenceManyField,
  TabbedForm,
  TextField,
  TextInput,
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
  FormDataConsumer,
  SimpleForm,
} from "react-admin";

import RichTextInput from "ra-input-rich-text";
import withStyles from "@material-ui/core/styles/withStyles";
import { useForm } from "react-final-form";
import { func } from "prop-types";
const { style } = require("../styles/formStyle");

var Status_ = false;
var ProductId = "";
var ContainerId = "";
var DrinkId = "";

const CategoriesAndSubs = ({
  formData,
  scopedFormData,
  getSource,
  record,
  ...rest
}) => {

  let form = useForm();
  return (
    <Fragment>
      <ReferenceInput
        label="Categoría"
        source="catproduct"
        reference="catproducts"
        //formClassName={classes.input}
      >
        <SelectInput choises="name" />
      </ReferenceInput>
    </Fragment>
  );
};

  let form = useForm();

const ProductEdit = withStyles(style)(({ classes, record, ...props }) => {
  let bebida = "";
  bebida = localStorage.getItem("drink_name");

  return (
    <Edit title={"Editar producto"} {...props}>
      <TabbedForm>
        <FormTab label="General">
          <TextInput
          label="Nombre"
          source="name"
          validate={required("Ingrese nombre")}
          resettable
          formClassName={classes.input}
        />
        <FormDataConsumer formClassName={classes.input}>
            {(formDataProps) => (
              <CategoriesAndSubs
                {...formDataProps}
                formClassName={classes.input}
              />
            )}
          </FormDataConsumer>
        <TextInput
          label="Costo"
          source="costo"
          validate={required("Ingrese costo")}
          resettable
          formClassName={classes.input}
        />
        <TextInput
          label="Precio"
          source="precioVenta"
          validate={required("Ingrese precio")}
          resettable
          formClassName={classes.input}
        />
        <TextInput
          label="Stock mínimo"
          source="stock"
          validate={required("Ingrese stock")}
          resettable
          formClassName={classes.input}
        />
        <TextInput multiline 
            label="Descripción"
            source="description"
            validate={required("Ingrese descripción")}
            toolbar={[[]]}
          />
        
        </FormTab>
      </TabbedForm>
    </Edit>
  );
});

export default ProductEdit;

/**
     
 */