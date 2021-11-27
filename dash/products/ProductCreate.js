import React, { Fragment } from "react";
import {
  AutocompleteInput,
  Create,
  FormDataConsumer,
  ImageField,
  ImageInput,
  required,
  SimpleForm,
  SelectInput,
  ReferenceInput,
  TextInput,
} from "react-admin";
import { useForm } from "react-final-form";
import withStyles from "@material-ui/core/styles/withStyles";
import NumberFormat from "react-number-format";
import RichTextInput from "ra-input-rich-text";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const { style } = require('../styles/formStyle');

const validateUserCreation = (values) => {
  var espacio = [0];

  const errors = {};
  if (values.name <= espacio) {
    errors.name = ["Ingrese Nombre"];
  }
  if (values.description <= espacio) {
    errors.description = ["ingrese descripción"];
  }
  if (values.original_cost <= espacio) {
    errors.original_cost = ["Ingrese costo"];
  }
  if (values.cost <= espacio) {
    errors.cost = ["Ingrese costo"];
  }
  if (values.minimum_stock <= espacio) {
    errors.minimum_stock = ["Ingrese stock"];
  }

  return errors;
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

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

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix=""
      //prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

//const ProductCreate = withStyles(style)(({classes, ...props}) => {
const ProductCreate = withStyles(style)(({ classes, ...props }) => {
  //const classes = useStyles();

  return (
    <Create {...props}>
      <SimpleForm validate={validateUserCreation}>
        <TextInput
          label="Nombre"
          source="name"
          validate={required("Ingrese nombre")}
          resettable
          formClassName={classes.input}
        />
        <TextInput multiline 
            label="descripción"
            source="description"
            validate={required("Ingrese descripción")}
            toolbar={[[]]}
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
          validate={required("ingrese costo")}
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
          validate={required("ingrese stock")}
          resettable
          formClassName={classes.input}
        />

      </SimpleForm>
    </Create>
  );
});
export default ProductCreate;
