import React, { useEffect, useState } from 'react';
import styles from './CreateProduct.module.css';
import FormItem from '../form/FormItem';
import FormItemDropdown from '../form/FormItemDropdown';
import CreateProductService from './CreateProductService';
import validate from '../../utils/validate';

const Create = () => {
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

  const [price, setPrice] = React.useState('');
  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };

  const activeChoices = ['Active', 'Inactive'];
  const [activeStatus, setActiveStatus] = React.useState('');
  const onActiveStatusChange = (e) => {
    setActiveStatus(e.target.value);
  };

  /**
   *
   * @name statusToBoolean
   * @description converts user selected drop down options
   * @param {String} isActive - string to be converted to boolean
   * @returns true if 'Active' - false if 'Inactive' - the original string if something else
   */
  function statusToBoolean(isActive) {
    let status = isActive;
    if (isActive === 'Active') {
      status = true;
    } else if (isActive === 'Inactive') {
      status = false;
    }
    return status;
  }

  /**
   *
   * @name handleSubmit
   * @description sends request to save valid form data, then displays status toast
   */
  function handleSubmit() {
    const active = statusToBoolean(activeStatus);
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
  }

  /**
   *
   * @name validateForm
   * @description validates all form fields then submits data if valid
   */
  function validateForm() {
    let formIsValid = true;
    if (!validate('text', 'Name', name)) {
      formIsValid = false;
    }
    if (!validate('text', 'Description', description)) {
      formIsValid = false;
    }
    if (!validate('drop-down', 'demographic', demographic)) {
      formIsValid = false;
    }
    if (!validate('drop-down', 'category', category)) {
      formIsValid = false;
    }
    if (!validate('drop-down', 'type', type)) {
      formIsValid = false;
    }
    if (!validate('text', 'Brand', brand)) {
      formIsValid = false;
    }
    if (!validate('text', 'Material', material)) {
      formIsValid = false;
    }
    if (!validate('currency', 'Price', price)) {
      formIsValid = false;
    }
    if (!validate('drop-down', 'status', activeStatus)) {
      formIsValid = false;
    }
    if (formIsValid) {
      handleSubmit();
    }
  }

  return (
    <div className={styles.container}>
      { apiError && <div>{ apiError }</div>}
      <h2>Create new item:</h2>
      <FormItem
        placeholder="Enter Product Name"
        type="text"
        id="name"
        label="Name"
        onChange={onNameChange}
        value={name.value}
      />

      <FormItem
        placeholder="Enter Product Description"
        type="textarea"
        id="description"
        label="Description"
        onChange={onDescriptionChange}
        value={description.value}
      />

      <FormItemDropdown
        id="productDemographic"
        label="Demographic"
        onChange={onDemographicChange}
        placeholder="[Select Product Demographic]"
        value={demographic.value}
        options={demographics}
      />

      <FormItemDropdown
        id="productCategory"
        label="Category"
        onChange={onCategoryChange}
        placeholder="[Select Product Category]"
        value={category.value}
        options={categories}
      />

      <FormItemDropdown
        id="type"
        label="Type"
        onChange={onTypeChange}
        placeholder="[Select Product Type]"
        value={type.value}
        options={types}
      />

      <FormItem
        placeholder="Enter Product Brand"
        type="text"
        id="brand"
        label="Brand"
        onChange={onBrandChange}
        value={brand.value}
      />

      <FormItem
        placeholder="Enter Product Material"
        type="text"
        id="material"
        label="Material"
        onChange={onMaterialChange}
        value={material.value}
      />

      <FormItem
        placeholder="Enter Product Price"
        type="text"
        id="price"
        label="Price"
        onChange={onPriceChange}
        value={price.value}
      />

      <FormItemDropdown
        id="activeStatus"
        label="Active Status"
        onChange={onActiveStatusChange}
        placeholder="[Choose Product Status]"
        value={activeStatus.value}
        options={activeChoices}
      />
      <button onClick={validateForm} type="button" className={styles.createButton}>
        Create Product
      </button>
    </div>
  );
};

export default Create;
