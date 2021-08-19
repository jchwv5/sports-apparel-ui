import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './CreateProduct.module.css';
import FormItem from '../form/FormItem';
import FormItemDropdown from '../form/FormItemDropdown';
import CreateProductService from './CreateProductService';
import constants from '../../utils/constants';
import validate from '../../utils/validate';
// import notify from '../Toast/Toast';

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
  const [demographic, setDemographic] = React.useState('Men');
  const onDemographicChange = (e) => {
    setDemographic(e.target.value);
  };

  const [categories, setCategories] = React.useState(['[Select category]']);
  useEffect(() => {
    CreateProductService.fetchCategories(setCategories, setApiError);
  }, []);
  const [category, setCategory] = React.useState('');
  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const [types, setTypes] = React.useState(['[Select type]']);
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

  const [activeStatus, setActiveStatus] = React.useState('Active');
  const onActiveStatusChange = (e) => {
    setActiveStatus(e.target.value);
  };

  const productActive = ['Active', 'Inactive'];

  function handleSubmit() {
    CreateProductService.productPost(
      name,
      description,
      demographic,
      category,
      type,
      brand,
      material,
      price,
      activeStatus
    ).then(() => history.push('/'));
    // notify('success', 'Product created successfully');
  }

  function validateForm() {
    let formIsValid = true;
    if (!validate('text', 'Name', name)) {
      formIsValid = false;
    }
    if (!validate('text', 'Description', description)) {
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
    if (formIsValid) {
      handleSubmit();
    }
  }

  return (
    <div className={styles.container}>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{constants.API_ERROR}</p>}
      <h2>Create new item:</h2>
      <FormItem
        placeholder="Prorduct Name"
        type="text"
        id="name"
        label="Name"
        onChange={onNameChange}
        value={name.value}
      />

      <FormItem
        placeholder="Product Description"
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
        value={demographic.value}
        options={demographics}
      />

      <FormItemDropdown
        id="productCategory"
        label="Category"
        onChange={onCategoryChange}
        value={category.value}
        options={categories}
      />

      <FormItemDropdown
        id="type"
        label="Type"
        onChange={onTypeChange}
        value={type.value}
        options={types}
      />

      <FormItem
        placeholder="Product Brand"
        type="text"
        id="brand"
        label="Brand"
        onChange={onBrandChange}
        value={brand.value}
      />

      <FormItem
        placeholder="Product Material"
        type="text"
        id="material"
        label="Material"
        onChange={onMaterialChange}
        value={material.value}
      />

      <FormItem
        placeholder="Product Price"
        type="text"
        id="price"
        label="Price"
        onChange={onPriceChange}
        value={price.value}
      />

      <FormItemDropdown
        id="activeStatus"
        label="Active"
        onChange={onActiveStatusChange}
        value={activeStatus.value}
        options={productActive}
      />
      <button onClick={validateForm} type="button" className={styles.createButton}>
        Create Product
      </button>
    </div>
  );
};

export default Create;
