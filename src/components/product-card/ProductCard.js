/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Popper } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Rating } from '@material-ui/lab';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import notify from '../Toast/Toast';
import { useCart } from '../checkout-page/CartContext';
import Modal from '../Modal/Modal';
import ProductReview from '../product-page/ProductReview';

const StyledRating = withStyles({
  iconFilled: {
    color: '#f1b119'
  }
})(Rating);
/**
 * @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
 */
const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 470
  },
  header: {
    height: 130
  },
  CardContent:
   {
     height: '100px',
     padding: '16px'
   },
  media: {
    backgroundSize: '50%',
    height: '165px',
    paddingTop: '56.25%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  rating: {
    color: red[500]
  },
  stars: {
    padding: 0,
    border: 0,
    backgroundColor: 'transparent',
    margin: 0
  },
  price: {
    paddingLeft: '25px'
  }
}));

/**
 * @name ProductCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const ProductCard = ({ product, setPlayCarousel }) => {
  const [anchorEl, setAnchorEl] = useState();
  const [reviewRatingAverage, setReviewRatingAverage] = useState(0);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { dispatch } = useCart();
  const classes = useStyles();
  const showReviewRating = Boolean(anchorEl);

  const handlePopperOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopperClose = () => {
    setAnchorEl('hidden', '');
  };

  useEffect(() => {
    if (product.reviews.length !== 0 && product.reviews !== null) {
      const accumulator = product.reviews.reduce((a, b) => ((a.rating ?? a) + b.rating), 0);
      setReviewRatingAverage((accumulator / product.reviews.length).toFixed(2));
    }
  }, [product.reviews]);

  const onAdd = () => {
    dispatch({
      type: 'add',
      product: {
        id: product.id,
        title: product.name,
        price: product.price,
        description: product.description,
        quantity: 1,
        image: product.imageSrc
      }
    });
    notify('success', 'Item added');
  };

  const hideModal = () => {
    setShowProductModal(false);
    if (setPlayCarousel) {
      setPlayCarousel(true);
    }
  };

  const showModal = () => {
    setShowProductModal(true);
    if (setPlayCarousel) {
      setPlayCarousel(false);
    }
  };

  const isDisabled = () => {
    if (product.reviews.length === 0) {
      return true;
    }
    return false;
  };

  return (
    <>
      <OutsideClickHandler onOutsideClick={() => hideModal()}>
        {showProductModal && <Modal onClose={() => hideModal()} item={product} />}
      </OutsideClickHandler>
      <OutsideClickHandler onOutsideClick={() => setShowReviewModal(false)}>
        {showReviewModal && <ProductReview onClose={() => setShowReviewModal(false)} item={product} />}
      </OutsideClickHandler>
      <Card className={classes.root}>
        <CardHeader
          className={classes.header}
          onClick={() => showModal()}
          avatar={(
            <Avatar aria-label="demographics" className={classes.avatar}>
              {product.demographic.charAt(0)}
            </Avatar>
          )}
          action={(
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )}
          title={product.name}
          subheader={`${product.demographic} ${product.category} ${product.type}`}
        />
        <CardMedia
          className={classes.media}
          image={product.imageSrc}
          title="placeholder"
          onClick={() => showModal()}
        />
        <CardContent onClick={() => showModal()} className={classes.CardContent}>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
          <br />
        </CardContent>
        <Typography className={classes.price} variant="body2" color="textSecondary" component="p">
          Price: $
          {product.price}
        </Typography>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="add to shopping cart" onClick={onAdd}>
            <AddShoppingCartIcon />
          </IconButton>
          <Typography
            aria-owns={showReviewRating ? 'mouse-over-popper' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopperOpen}
            onMouseLeave={handlePopperClose}
          >
            <button type="submit" className={classes.stars} disabled={isDisabled()} onClick={() => setShowReviewModal(true)}>
              <StyledRating
                className={classes.stars}
                name="review-rating"
                value={reviewRatingAverage}
                readOnly
                precision={0.1}
                size="medium"
              />
            </button>
          </Typography>
          <Popper
            id="mouse-over-popper"
            anchorEl={anchorEl}
            placement="top"
            disablePortal={false}
            modifiers={{
              flip: {
                enabled: false
              }
            }}
            open={showReviewRating}
          >
            <Typography className={classes.rating} variant="body1" component="p">
              <b>Rating:</b>
              {' '}
              <b>{reviewRatingAverage}</b>
            </Typography>
          </Popper>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
