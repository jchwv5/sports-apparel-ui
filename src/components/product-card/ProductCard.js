import React, { useState, useEffect } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Chip, Popper } from '@material-ui/core';
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
    maxWidth: 345
  },
  header: {
    height: 130
  },
  media: {
    backgroundSize: '50%',
    height: 0,
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
    padding: 6
  }
}));

/**
 * @name ProductCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const ProductCard = ({ product }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const [reviewRatingAverage, setReviewRatingAverage] = useState(0);
  const [reviewRatingCount, setReviewRatingCount] = useState(0);
  useEffect(() => {
    if (product.reviews.length !== 0 && product.reviews !== null) {
      const accumulator = product.reviews.reduce((a, b) => ((a.rating ?? a) + b.rating), 0);
      setReviewRatingAverage((accumulator / product.reviews.length).toFixed(2));
      setReviewRatingCount(product.reviews.length);
    }
  }, [product.reviews]);
  const classes = useStyles();
  const { dispatch } = useCart();
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
  const [show, setShow] = useState(false);
  const isDisabled = () => {
    if (product.reviews.length === 0) {
      return true;
    }
    return false;
  };
  const [visual, setVisual] = useState(false);
  return (
    <>
      <OutsideClickHandler onOutsideClick={() => setShow(false)}>
        {show && <Modal onClose={() => setShow(false)} item={product} />}
      </OutsideClickHandler>
      <OutsideClickHandler onOutsideClick={() => setVisual(false)}>
        {visual && <ProductReview onClose={() => setVisual(false)} item={product} />}
      </OutsideClickHandler>
      <Card className={classes.root}>
        <CardHeader
          className={classes.header}
          onClick={() => setShow(true)}
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
          onClick={() => setShow(true)}
        />
        <CardContent onClick={() => setShow(true)}>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
          <br />
          <Typography variant="body2" color="textSecondary" component="p">
            Price: $
            {product.price}
          </Typography>
        </CardContent>
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
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <StyledRating
              className={classes.stars}
              name="review-rating"
              value={reviewRatingAverage}
              readOnly
              precision={0.1}
              size="medium"
            />
          </Typography>
          <Chip
            label={reviewRatingCount}
            disabled={isDisabled()}
            clickable
            onClick={() => setVisual(true)}
            color="default"
          />
          <Popper
            id="mouse-over-popover"
            anchorEl={anchorEl}
            placement="top"
            disablePortal={false}
            modifiers={{
              flip: {
                enabled: false
              },
              preventOverflow: {
                enabled: true,
                boundariesElement: 'scrollParent'
              }
            }}
            open={open}
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
