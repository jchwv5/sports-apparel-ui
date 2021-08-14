import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ProductPage from '../product-page/ProductPage';
import ProductPageService from '../product-page/ProductPageService';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function createData(name, description, category, type, releaseDate) {
  return { name, description, category, type, releaseDate };
}

// const rows = [
//   createData('pants', 'blue', 'short'),
//   createData('dress', 'black', 'midi'),
//   createData('shirts', 'green', 'long')
// ];

const DataTable = () => {
  // const classes = useStyles();

  //   const [products, setProducts] = useState([]);
  //   const [apiError, setApiError] = useState(false);

  //   useEffect(() => {
  //     fetchProducts(setProducts, setApiError);
  //   }, []);

  //   return (
  //     <div>
  //       {apiError && (
  //         <p className={styles.errMsg} data-testid="errMsg">
  //           {Constants.API_ERROR}
  //         </p>
  //       )}
  //       <div className={classes}>
  //         {products.map((product) => (
  //           <div key={product.id}>
  //             <ProductCard product={product} />
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    fetch('https://fo4s-sports-apparel-api.herokuapp.com/products').then(
      (tableData) => setTableData(tableData)
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table className={useStyles.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">releaseDate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.description}</TableCell>
              <TableCell align="right">{item.category}</TableCell>
              <TableCell align="right">{item.type}</TableCell>
              <TableCell align="right">{item.releaseDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default DataTable;
