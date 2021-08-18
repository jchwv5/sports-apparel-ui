const validate = (name, description, brand, material, price) => {
  const errors = {
    name: '',
    description: '',
    brand: '',
    material: '',
    price: ''
  };
  const valid = {
    formIsValid: true,
    message: ''
  };

  if (!name) {
    errors.name = 'name cannot be empty';
    // setName({ ...productData, name: '' });
    valid.formIsValid = false;
  }
  if (!description) {
    errors.description = 'description cannot be empty';
    // setProductData({ ...productData, description: '' });
    valid.formIsValid = false;
  }
  if (!brand) {
    errors.brand = 'brand cannot be empty';
    // setProductData({ ...productData, brand: '' });
    valid.formIsValid = false;
  }
  if (!material) {
    errors.material = 'material cannot be empty';
    // setProductData({ ...productData, material: '' });
    valid.formIsValid = false;
  }
  if (!price) {
    errors.price = 'price cannot be empty';
    // setProductData({ ...productData, price: '' });
    valid.formIsValid = false;
  } else if (Number.isNaN(price) || price < 0) {
    errors.price = 'price should be a positive number';
    // setProductData({ ...productData, price: '' });
    valid.formIsValid = false;
  } else if (price.toString()[price.toString().length - 3] !== '.') {
    errors.price = 'price should be in dollars and cents';
    // setProductData({ ...productData, price: '' });
    valid.formIsValid = false;
  }

  return (
    valid
  );
};

export default validate;
