import React from 'react';
import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function createData(categories, colors, types) {
  return { categories, colors, types };
}

const rows = [
  createData('pants', 'blue', 'short'),
  createData('dress', 'black', 'midi'),
  createData('shirts', 'green', 'long')
];

const ProductList = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Style</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.categories}>
              <TableCell component="th" scope="row">
                {row.categories}
              </TableCell>
              <TableCell align="right">{row.colors}</TableCell>
              <TableCell align="right">{row.types}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ProductList;
