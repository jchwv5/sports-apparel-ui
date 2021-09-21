import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CreateProduct.module.css';
import FormItem from '../form/FormItem';
import FormItemDropdown from '../form/FormItemDropdown';
import CreateProductService from './CreateProductService';
import validate from '../../utils/validate';
import Constants from '../../utils/constants';

const Create = () => {
  const history = useHistory();
  const [apiError, setApiError] = useState(false);
  const [releaseDate, setReleaseDate] = useState(new Date());

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
      releaseDate,
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
    setNameError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('description', 'Description', description);
    setDescriptionError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('drop-down', 'demographic', demographic);
    setDemographicError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('drop-down', 'category', category);
    setCategoryError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('drop-down', 'type', type);
    setTypeError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('text', 'Brand', brand);
    setBrandError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('text', 'Material', material);
    setMaterialError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('currency', 'Price', priceAsString);
    setPriceError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('drop-down', 'status', activeStatus);
    setActiveError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    if (formIsValid) {
      handleSubmit();
    }
  }

  return (
    <div>
      {apiError && (
        <p className={styles.errMsg} data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
      )}
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
            <div className={styles.errorDiv}>
              {nameError && <p className={styles.errMsg}>{nameError}</p>}
            </div>

            <FormItem
              placeholder="Enter Product Description"
              type="textarea"
              id="description"
              label="Description"
              onChange={onDescriptionChange}
              value={description.value}
            />
            <div className={styles.errorDiv}>
              {descriptionError && (
                <p className={styles.errMsg}>{descriptionError}</p>
              )}
            </div>

            <FormItemDropdown
              id="productDemographic"
              label="Demographic"
              onChange={onDemographicChange}
              placeholder="[Select Product Demographic]"
              value={demographic.value}
              options={demographics}
            />
            <div className={styles.errorDiv}>
              {demographicError && (
                <p className={styles.errMsg}>{demographicError}</p>
              )}
            </div>

            <FormItemDropdown
              id="productCategory"
              label="Category"
              onChange={onCategoryChange}
              placeholder="[Select Product Category]"
              value={category.value}
              options={categories}
            />
            <div className={styles.errorDiv}>
              {categoryError && (
                <p className={styles.errMsg}>{categoryError}</p>
              )}
            </div>

            <FormItemDropdown
              id="type"
              label="Type"
              onChange={onTypeChange}
              placeholder="[Select Product Type]"
              value={type.value}
              options={types}
            />
            <div className={styles.errorDiv}>
              {typeError && <p className={styles.errMsg}>{typeError}</p>}
            </div>

            <DatePicker
              selected={releaseDate}
              onChange={(date) => setReleaseDate(date)}
            />

            <FormItem
              placeholder="Enter Product Brand"
              type="textarea"
              id="brand"
              label="Brand"
              onChange={onBrandChange}
              value={brand.value}
            />
            <div className={styles.errorDiv}>
              {brandError && <p className={styles.errMsg}>{brandError}</p>}
            </div>

            <FormItem
              placeholder="Enter Product Material"
              type="textarea"
              id="material"
              label="Material"
              onChange={onMaterialChange}
              value={material.value}
            />
            <div className={styles.errorDiv}>
              {materialError && (
                <p className={styles.errMsg}>{materialError}</p>
              )}
            </div>

            <FormItem
              placeholder="Enter Product Price"
              type="textarea"
              id="price"
              label="Price"
              onChange={onPriceChange}
              value={priceAsString.value}
            />
            <div className={styles.errorDiv}>
              {priceError && <p className={styles.errMsg}>{priceError}</p>}
            </div>

            <FormItemDropdown
              id="activeStatus"
              label="Active Status"
              onChange={onActiveStatusChange}
              placeholder="[Choose Product Status]"
              value={activeStatus.value}
              options={activeChoices}
            />
            <div className={styles.errorDiv}>
              {activeError && <p className={styles.errMsg}>{activeError}</p>}
            </div>
            <button
              onClick={validateForm}
              type="button"
              className={styles.createButton}
            >
              Create Product
            </button>
          </>
        </div>
      )}
    </div>
  );
};

export default Create;
