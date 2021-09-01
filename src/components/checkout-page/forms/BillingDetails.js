import React from 'react';
import FormItem from '../../form/FormItem';
import FormItemDropdown from '../../form/FormItemDropdown';
import styles from './DeliveryAddress.module.css';

/**
 * @name BillingDetails
 * @description Allows entry of Billing Details
 * @return component
 */
const BillingDetails = ({
  errorInfo, onChange, billingData, useShippingForBilling
}) => {
  const usStates = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',
    'Federated States of Micronesia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Marshall Islands',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Northern Mariana Islands',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Island',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ];

  return (
    <div className={styles.deliveryAddress}>
      {!useShippingForBilling && (
        <>
          <FormItem
            placeholder="e.g. 123 Sesame Street"
            type="text"
            id="billingStreet"
            label="Street"
            onChange={onChange}
            value={billingData.billingStreet}
            errorMessage={errorInfo.billingStreet.errorMessage}
            isValid={errorInfo.billingStreet.dataIsValid}
          />
          <FormItem
            placeholder="e.g. Unit #1"
            type="text"
            id="billingStreet2"
            label="Street 2 (Optional)"
            onChange={onChange}
            defaultValue=""
            value={billingData.billingStreet2}
          />
          <FormItem
            placeholder="e.g. Chicago"
            type="text"
            id="billingCity"
            label="City"
            onChange={onChange}
            defaultValue=""
            value={billingData.billingCity}
            errorMessage={errorInfo.billingCity.errorMessage}
            isValid={errorInfo.billingCity.dataIsValid}
          />
          <FormItemDropdown
            id="billingState"
            label="State"
            onChange={onChange}
            placeholder="[Select State]"
            defaultValue=""
            value={billingData.billingState}
            options={usStates}
            errorMessage={errorInfo.billingState.errorMessage}
            isValid={errorInfo.billingState.dataIsValid}
          />
          <FormItem
            placeholder="e.g. 12345"
            type="text"
            id="billingZip"
            label="Zip"
            onChange={onChange}
            defaultValue=""
            value={billingData.billingZip}
            errorMessage={errorInfo.billingZip.errorMessage}
            isValid={errorInfo.billingZip.dataIsValid}
          />
        </>
      )}
      <FormItem
        placeholder="e.g. example@catalyte.io"
        type="email"
        id="email"
        label="Email"
        onChange={onChange}
        defaultValue=""
        value={billingData.email}
        errorMessage={errorInfo.email.errorMessage}
        isValid={errorInfo.email.dataIsValid}
      />
      <FormItem
        placeholder="e.g. 555-555-5555"
        type="text"
        id="phone"
        label="Phone"
        onChange={onChange}
        defaultValue=""
        value={billingData.phone}
        errorMessage={errorInfo.phone.errorMessage}
        isValid={errorInfo.phone.dataIsValid}
      />
      <FormItem
        placeholder="e.g. 1234567812345678"
        type="text"
        id="creditCard"
        label="Credit Card"
        onChange={onChange}
        value={billingData.creditCard}
        errorMessage={errorInfo.cardNumber.errorMessage}
        isValid={errorInfo.cardNumber.dataIsValid}
      />
      <FormItem
        placeholder="e.g. 555"
        type="text"
        id="cvv"
        label="CVV"
        onChange={onChange}
        defaultValue=""
        value={billingData.cvv}
        errorMessage={errorInfo.cvv.errorMessage}
        isValid={errorInfo.cvv.dataIsValid}
      />
      <FormItem
        placeholder="e.g. 05/21"
        type="text"
        id="expiration"
        label="Expiration"
        onChange={onChange}
        defaultValue=""
        value={billingData.expiration}
        errorMessage={errorInfo.expiration.errorMessage}
        isValid={errorInfo.expiration.dataIsValid}
      />
      <FormItem
        type="text"
        id="cardholder"
        label="Cardholder Name"
        onChange={onChange}
        defaultValue=""
        value={billingData.cardholder}
        errorMessage={errorInfo.cardholder.errorMessage}
        isValid={errorInfo.cardholder.dataIsValid}
      />
    </div>
  );
};

export default BillingDetails;
