import React, { useEffect, useState } from 'react';
import styles from './CreateProduct.module.css';
import FormItem from '../form/FormItem';
import FormItemDropdown from '../form/FormItemDropdown';
import CreateProductService from './CreateProductService';
import validate from '../../utils/validate';
import notify from '../Toast/Toast';

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
    if (apiError) {
      notify('error', 'Problem fetching Categories');
    }
  }, [apiError]);
  const [category, setCategory] = React.useState('');
  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const [types, setTypes] = React.useState([]);
  useEffect(() => {
    CreateProductService.fetchTypes(setTypes, setApiError);
    if (apiError) {
      notify('error', 'Problem fetching Types');
    }
  }, [apiError]);
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
    if (activeStatus === 'Active') {
      setActiveStatus(true);
    }
    if (activeStatus === 'Inactive') {
      setActiveStatus(false);
    }
    CreateProductService.productPost(
      name,
      description,
      demographic,
      category,
      type,
      brand,
      material,
      price,
      activeStatus,
      setApiError
    );
    if (apiError) {
      notify('error', 'Server connection error');
    } else {
      notify('success', 'Product created successfully');
    }
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
        placeholder="[Select Demographic]"
        value={demographic.value}
        options={demographics}
      />

      <FormItemDropdown
        id="productCategory"
        label="Category"
        onChange={onCategoryChange}
        placeholder="[Select Category]"
        value={category.value}
        options={categories}
      />

      <FormItemDropdown
        id="type"
        label="Type"
        onChange={onTypeChange}
        placeholder="[Select Type]"
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
