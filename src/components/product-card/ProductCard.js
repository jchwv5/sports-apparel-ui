import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import notify from '../Toast/Toast';
import { useCart } from '../checkout-page/CartContext';
// eslint-disable-next-line import/no-cycle
import Modal from '../Modal/Modal';

/**
 * @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
 */
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    maxWidth: 345
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
  }
}));

/**
 * @name ProductCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const ProductCard = ({ product }) => {
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
    notify('success', 'Item added to cart!');
  };
  const [show, setShow] = useState(false);

  return (
    <>
      <OutsideClickHandler onOutsideClick={() => setShow(false)}>
        {show && <Modal onClose={() => setShow(false)} item={product} />}
      </OutsideClickHandler>
      <Card className={classes.root}>
        <CardHeader
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
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
