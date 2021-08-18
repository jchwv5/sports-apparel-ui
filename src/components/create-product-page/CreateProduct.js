import React from 'react';
import styles from './CreateProduct.module.css';

const CreateProduct = () => {
  const [productData, setProductData] = React.useState({
    id: null,
    errorIdMsg: '',
    name: '',
    errorNameMsg: '',
    description: '',
    errorDescriptionMsg: '',
    demographic: '',
    category: '',
    type: '',
    releadeDate: '',
    errorReleaseDateMsg: '',
    primaryColorCode: '',
    errorPrimaryColorCodeMsg: '',
    secondaryColorCode: '',
    errorSecondaryColorCodeMsg: '',
    styleNumber: '',
    errorStyleNumberMsg: '',
    globalProductCode: '',
    errorGlobalProductCodeMsg: '',
    brand: '',
    errorBrandMsg: '',
    material: '',
    errorMaterialMsg: '',
    price: null,
    errorPriceMsg: '',
    quantity: null,
    errorQuantityMsg: '',
    imageSrc: '',
    errorImageSrc: '',
    active: false
  });

  let errors = {name:'', description:'', brand:'', material:'', price:'', date:''};

  const onProductChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const categories = ['Golf', 'Soccer', 'Basketball', 'Hockey', 'Football', 'Running', 'Baseball', 'Skateboarding', 'Boxing', 'Weightlifting'];
  const types = ['Pant', 'Short', 'Shoe', 'Glove', 'Jacket', 'Tank Top', 'Sock', 'Sunglasses', 'Hat', 'Helmet', 'Belt', 'Visor', 'Shin Guard', 'Elbow Pad', 'Headband', 'Wristband', 'Hoodie', 'Flip Flop', 'Pool Noodle'];

  const validate = () => {
    //setProductData({ ...productData, errorIdMsg: 'error message' });
    let noErrors = true;

    if(!productData.name) {
      errors.name = "name cannot be empty";
      setProductData({ ...productData, name: '' });
      noErrors = false;
    }
    if(!productData.description) {
      errors.description = "description cannot be empty";
      setProductData({ ...productData, description: '' });
      noErrors = false;
    }
    if(!productData.brand) {
      errors.brand = "brand cannot be empty";
      setProductData({ ...productData, brand: '' });
      noErrors = false;
    }
    if(!productData.material) {
      errors.material = "material cannot be empty";
      setProductData({ ...productData, material: '' });
      noErrors = false;
    }
    if(!productData.price) {
      errors.price = "price cannot be empty";
      setProductData({ ...productData, price: '' });
      noErrors = false;
    } else if(isNaN(productData.price) || productData.price < 0) {
      errors.price = "price should be a positive number";
      setProductData({ ...productData, price: '' });
      noErrors = false;
    } else if(productData.price.toString()[productData.price.toString().length - 3] !== '.') {
      errors.price = "price should be in dollars and cents";
      setProductData({ ...productData, price: '' });
      noErrors = false;
    }

    if(noErrors) {
      handlesubmit();
    }

  };

  return (
    <div className={styles.container} onChange={onProductChange}>
      <form>
        <h1>Enter the details of the Product here: </h1>
        <div className="input">
          <label className="label" htmlFor="Id:">
            Product Id:
            <input id="id" name="id"className={styles.inputVals} type="number" step="1" Required placeholder="enter id" />
          </label>
          <span id="errorIdMsg" name="errorIdMsg" className={styles.errors}>{productData.errorIdMsg}</span>
        </div>
        <div className="input">
          <label className="label" htmlFor="Name:">
            Product Name:
            <input id="name" name="name" className={styles.inputVals} type="text" Required placeholder="enter name" />
          </label>
          <span id="errorNameMsg" name="errorNameMsg" className={styles.errors}>{productData.errorNameMsg}</span>
        </div>
        <div className="input">
          <label className="label" htmlFor="Description:">
            Description:
            <input id="description" name="description" className={styles.inputVals} type="text" Required placeholder="enter description" />
          </label>
          <span id="errorNameMsg" name="errorNameMsg" className={styles.errors}>{productData.errorDescriptionMsg}</span>
        </div>
        <div className="input">
          <label className="label" htmlFor="Demographic:">
            Demographic:
            <select id="demographic" name="demographic" className={styles.inputVals} type="text" Required placeholder="enter demographic">
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>
          </label>
        </div>
        <div className="input">
          <label className="label" htmlFor="Category:">
            Category:
            <select id="category" name="category" className={styles.inputVals} type="text" Required placeholder="enter category">
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="input">
          <label className="label" htmlFor="Type:">
            Product Type:
            <select id="type" name="type" className={styles.inputVals} type="text" Required placeholder="enter type">
              {types.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="input">
          <label className="label" htmlFor="ReleaseDate:">
            Product Release Date:
            <input id="releaseDate" name="releaseDate" className={styles.inputVals} type="text" Required placeholder="enter release date" />
          </label>
          <span id="errorReleaseDateMsg" name="errorIdMsg" className={styles.errors}>{productData.errorReleaseDateMsg}</span>
        </div>
        <div className="input">
          <label className="label" htmlFor="PrimaryColorCode:">
            Product Primary Color Code:
            <input id="primaryColorCode" name="primaryColorCode" className={styles.inputVals} type="text" Required placeholder="enter primary color code" />
          </label>
          <span id="errorPrimaryColorCodeMsg" name="errorPrimaryColorCodeMsg" className={styles.errors}>{productData.errorPrimaryColorCodeMsg}</span>
        </div>
        <div className="input">
          <label className="label" htmlFor="SecondaryColorCode:">
            Product Secondary Color Code:
            <input id="secondaryColorCode" name="secondaryColorCode" className={styles.inputVals} type="text" Required placeholder="enter secondary color code" />
          </label>
          <span id="errorSecondaryColorCodeMsg" name="errorSecondaryColorCodeMsg" className={styles.errors}>{productData.errorSecondaryColorCodeMsg}</span>
        </div>
        <div className="input">
          <label className="label" htmlFor="StyleNumber:">
            Product Style Number:
            <input id="productStyleNumber" name="productStyleNumber" className={styles.inputVals} type="text" Required placeholder="enter style number" />
          </label>
          <span id="errorStyleNumberMsg" name="errorStyleNumberMsg" className={styles.errors}>{productData.errorStyleNumberMsg}</span>
        </div>
        <div className="input">
          <label className="label" htmlFor="GlobalProductCode:">
            Product Global Product Code:
            <input id="globalProductCode" name="globalProductCode" className={styles.inputVals} type="text" Required placeholder="enter global product code" />
          </label>
          <span id="errorGlobalProductCodeMsg" name="errorGlobalProductCodeMsg" className={styles.errors}>{productData.errorGlobalProductCodeMsg}</span>
        </div>
        <div className="input">
          <label className="label" htmlFor="Brand:">
            Product Brand:
            <input id="brand" name="brand" className={styles.inputVals} type="text" Required placeholder="enter brand" />
          </label>
          <span id="errorBrandMsg" name="errorBrandMsg" className={styles.errors}>{productData.errorBrandMsg}</span>
        </div>
        <div className="input">
          <label className="label" htmlFor="Material:">
            Product Material:
            <input id="material" name="material" className={styles.inputVals} type="text" Required placeholder="enter material" />
          </label>
          <span id="errorMaterialMsg" name="errorMaterialMsg" className={styles.errors}>{productData.errorMaterialMsg}</span>
        </div>
        <div className="input">
          <label className="label" htmlFor="Price:">
            Product Price:
            <input id="price" name="price" className={styles.inputVals} type="number" step="0.01" min="0.00" Required />
          </label>
          <span id="errorPriceMsg" name="errorPriceMsg" className={styles.errors}>{productData.errorPriceMsg}</span>
        </div>
        <div className="input">
          <label className="label" htmlFor="Quantity:">
            Quantity:
            <input id="quantity" name="quantity" className={styles.inputVals} type="number" step="1" min="0" Required />
          </label>
          <span id="errorQuantityMsg" name="errorQuantityMsg" className={styles.errors}>{productData.errorQuantityMsg}</span>
        </div>
        <div className="input">
          <label className="label" htmlFor="ImageSrc:">
            Product ImageSrc:
            <input id="imageSrc" name="imageSrc" className={styles.inputVals} type="text" Required placeholder="enter image src" />
          </label>
          <span id="errorImageSrc" name="errorImageSrc" className={styles.errors}>{productData.errorImageSrc}</span>
        </div>
        <div className="input">
          <label className="label" htmlFor="Active:">
            Product Active:
            <select id="active" name="active" className={styles.inputVals} type="boolean" Required placeholder="enter active status">
              <option>true</option>
              <option>false</option>
            </select>
          </label>
        </div>
        <div className={styles.add}>
          <button onClick={validate} type="button" className={styles.addButton}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};



export default CreateProduct;
