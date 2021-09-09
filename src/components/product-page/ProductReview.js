import { React, useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Avatar, NativeSelect, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Rating } from '@material-ui/lab';
import style from './ProductReview.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  margin: {
    width: 120,
    height: 30,
    backgroundColor: '#e0e0e0',
    border: '0.75px solid #e0e0e0',
    borderRadius: 6,
    fontSize: 14,
    color: '#565959',
    margin: theme.spacing(0),
    padding: '6px 6px 7px'
  }
}));
const StyledRating = withStyles({
  iconFilled: {
    color: '#f1b119'
  }
})(Rating);
/**
 * @name ProductReviews
 * @description Displays product reviews
 * @return component
 */

const ProductReview = (product) => {
  const { item, onClose } = product;
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState('dateDesc');
  const classes = useStyles();
  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        dateDesc: 'dateDesc'
      };
      const sortProperty = types[type];
      const sorted = [...item.reviews].sort((a, b) => {
        if (sortProperty === 'dateDesc') {
          return b.date.localeCompare(a.date);
        }
        return a.date.localeCompare(b.date);
      });
      setData(sorted);
    };

    sortArray(sortType);
  }, [item, sortType]);

  return (
    <>
      <div className={style.modal} backdrop="static" keyboard={false}>
        <div className={style.header}>
          <div className={style.title}>
            {item.name}
          </div>
          <NativeSelect className={classes.margin} onChange={(e) => setSortType(e.target.value)}>
            <option value="dateDesc">Most recent</option>
            <option value="dateAsc">Older</option>
          </NativeSelect>
          <IconButton onClick={onClose} className={classes.button}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={style.modalBody} id={style.scroll}>
          {data.map((customerReview) => (
            <div key={customerReview.id}>
              <span className={classes.root}>
                <Avatar
                  sizes="xsmall"
                  alt="User Avatar"
                  src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"
                  className={classes.small}
                />
              </span>
              <StyledRating
                name="read-only"
                value={customerReview.rating}
                readOnly
                precision={1}
                size="small"
              />
              <span className={style.space} />
              <span className={style.title}>{customerReview.title}</span>
              <div className={style.date}>
                Reviewed in the United States on
                <span className={style.space} />
                {customerReview.date}
              </div>
              <span className={style.comment}>
                {customerReview.comment}
              </span>
            </div>
          ))}
        </div>
        <div className={style.footer} />
      </div>
    </>
  );
};

export default ProductReview;
