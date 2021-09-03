import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './CreateProduct.module.css';
import FormItem from '../form/FormItem';
import FormItemDropdown from '../form/FormItemDropdown';
import CreateProductService from './CreateProductService';
import validate from '../../utils/validate';
import Constants from '../../utils/constants';

const Create = () => {
  const history = useHistory();
  const [apiError, setApiError] = useState(false);

  const [name, setName] = React.useState('');
  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const [description, setDescription] = React.useState('');
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const demographics = ['Men', 'Women', 'Kids'];
  const [demographic, setDemographic] = React.useState('');
  const onDemographicChange = (e) => {
    setDemographic(e.target.value);
  };

  const [categories, setCategories] = React.useState([]);
  useEffect(() => {
    CreateProductService.fetchCategories(setCategories, setApiError);
  }, []);
  const [category, setCategory] = React.useState('');
  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const [types, setTypes] = React.useState([]);
  useEffect(() => {
    CreateProductService.fetchTypes(setTypes, setApiError);
  }, []);
  const [type, setType] = React.useState('');
  const onTypeChange = (e) => {
    setType(e.target.value);
  };

  const [brand, setBrand] = React.useState('');
  const onBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const [material, setMaterial] = React.useState('');
  const onMaterialChange = (e) => {
    setMaterial(e.target.value);
  };

  const [priceAsString, setPriceAsString] = React.useState('');
  const onPriceChange = (e) => {
    setPriceAsString(e.target.value);
  };

  const activeChoices = ['Active', 'Inactive'];
  const [activeStatus, setActiveStatus] = React.useState('');
  const onActiveStatusChange = (e) => {
    setActiveStatus(e.target.value);
  };

  const [nameError, setNameError] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');
  const [demographicError, setDemographicError] = React.useState('');
  const [categoryError, setCategoryError] = React.useState('');
  const [typeError, setTypeError] = React.useState('');
  const [brandError, setBrandError] = React.useState('');
  const [materialError, setMaterialError] = React.useState('');
  const [priceError, setPriceError] = React.useState('');
  const [activeError, setActiveError] = React.useState('');

  /**
   *
   * @name statusToBoolean
   * @description converts user selected drop down options
   * @param {String} statusAsString - string to be converted to boolean
   * @returns true if 'Active' - false if 'Inactive' - the original string if something else
   */
  function statusToBoolean(statusAsString) {
    let statusAsBoolean = statusAsString;
    if (statusAsString === 'Active') {
      statusAsBoolean = true;
    } else if (statusAsString === 'Inactive') {
      statusAsBoolean = false;
    }
    return statusAsBoolean;
  }

  /**
   *
   * @name removeDollarSign
   * @description takes in a string and removes leading dollar signs $$
   * @param {String} priceString string containing dollar signs and a price
   * @returns price without dollar signs as a number
   */
  function removeDollarSign(priceString) {
    let priceAsNumber = priceString;
    while (priceAsNumber.charAt(0) === '$') {
      priceAsNumber = priceAsNumber.substring(1);
    }
    return priceAsNumber;
  }

  function handleRedirect() {
    history.push('/maintenance');
  }

  /**
   *
   * @name handleSubmit
   * @description sends request to save valid form data, then displays status toast
   */
  function handleSubmit() {
    const active = statusToBoolean(activeStatus);
    const price = removeDollarSign(priceAsString);
    CreateProductService.productPost(
      name,
      description,
      demographic,
      category,
      type,
      brand,
      material,
      price,
      active,
      setApiError
    );
    handleRedirect();
  }

  /**
   *
   * @name validateForm
   * @description validates all form fields then submits data if valid
   */
  function validateForm() {
    let formIsValid = true;
    let result = validate('text', 'Name', name);
    setNameError(result[1]);
    if (!result[0]) {
      formIsValid = false;
    }
    result = validate('text', 'Description', description);
    setDescriptionError(result[1]);
    if (!result[0]) {
      formIsValid = false;
    }
    result = validate('drop-down', 'demographic', demographic);
    setDemographicError(result[1]);
    if (!result[0]) {
      formIsValid = false;
    }
    result = validate('drop-down', 'category', category);
    setCategoryError(result[1]);
    if (!result[0]) {
      formIsValid = false;
    }
    result = validate('drop-down', 'type', type);
    setTypeError(result[1]);
    if (!result[0]) {
      formIsValid = false;
    }
    result = validate('text', 'Brand', brand);
    setBrandError(result[1]);
    if (!result[0]) {
      formIsValid = false;
    }
    result = validate('text', 'Material', material);
    setMaterialError(result[1]);
    if (!result[0]) {
      formIsValid = false;
    }
    result = validate('currency', 'Price', priceAsString);
    setPriceError(result[1]);
    if (!result[0]) {
      formIsValid = false;
    }
    result = validate('drop-down', 'status', activeStatus);
    setActiveError(result[1]);
    if (!result[0]) {
      formIsValid = false;
    }
    if (formIsValid) {
      handleSubmit();
    }
  }

  return (
    <div>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      {!apiError && (
      <div className={styles.container}>
        <>
          <h2>Create new item:</h2>
          <FormItem
            placeholder="Enter Product Name"
            type="textarea"
            id="name"
            label="Name"
            onChange={onNameChange}
            value={name.value}
          />
          {nameError && <p className={styles.errMsg}>{nameError}</p>}

          <FormItem
            placeholder="Enter Product Description"
            type="textarea"
            id="description"
            label="Description"
            onChange={onDescriptionChange}
            value={description.value}
          />
          {descriptionError && <p className={styles.errMsg}>{descriptionError}</p>}

          <FormItemDropdown
            id="productDemographic"
            label="Demographic"
            onChange={onDemographicChange}
            placeholder="[Select Product Demographic]"
            value={demographic.value}
            options={demographics}
          />
          {demographicError && <p className={styles.errMsg}>{demographicError}</p>}

          <FormItemDropdown
            id="productCategory"
            label="Category"
            onChange={onCategoryChange}
            placeholder="[Select Product Category]"
            value={category.value}
            options={categories}
          />
          {categoryError && <p className={styles.errMsg}>{categoryError}</p>}

          <FormItemDropdown
            id="type"
            label="Type"
            onChange={onTypeChange}
            placeholder="[Select Product Type]"
            value={type.value}
            options={types}
          />
          {typeError && <p className={styles.errMsg}>{typeError}</p>}

          <FormItem
            placeholder="Enter Product Brand"
            type="textarea"
            id="brand"
            label="Brand"
            onChange={onBrandChange}
            value={brand.value}
          />
          {brandError && <p className={styles.errMsg}>{brandError}</p>}

          <FormItem
            placeholder="Enter Product Material"
            type="textarea"
            id="material"
            label="Material"
            onChange={onMaterialChange}
            value={material.value}
          />
          {materialError && <p className={styles.errMsg}>{materialError}</p>}

          <FormItem
            placeholder="Enter Product Price"
            type="textarea"
            id="price"
            label="Price"
            onChange={onPriceChange}
            value={priceAsString.value}
          />
          {priceError && <p className={styles.errMsg}>{priceError}</p>}

          <FormItemDropdown
            id="activeStatus"
            label="Active Status"
            onChange={onActiveStatusChange}
            placeholder="[Choose Product Status]"
            value={activeStatus.value}
            options={activeChoices}
          />
          {activeError && <p className={styles.errMsg}>{activeError}</p>}
          <button onClick={validateForm} type="button" className={styles.createButton}>
            Create Product
          </button>
        </>
      </div>
      )}
    </div>
  );
};

export default Create;
