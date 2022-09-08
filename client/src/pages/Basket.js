import React, { useEffect } from 'react';
import { getBasket } from '../http/deviceAPI';
import { useSelector, useDispatch } from 'react-redux'
import { setBasket } from '../slices/userSlice';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteFromBasket } from '../http/deviceAPI';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
    },
    card: {
        minHeight: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inline: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    }
}));

const Basket = () => {
   
    const classes = useStyles()
    const dispatch = useDispatch()
    let {basket} = useSelector(state => state.userReducer)

    useEffect(() => {
        getBasket().then(data => dispatch(setBasket(data)))
    }, [])



    const deleteDevice = (id) => {
        const formData = new FormData()
        formData.append('id', id)
        deleteFromBasket(formData)
            .then(response => alert(`Товар был удален из корзины!`))
            .then(() => getBasket()
                .then(data => dispatch(setBasket(data)))
            )
    }

    let prices = basket.reduce((acc, item) => acc + item.device.price, 0)

    return (
        <Container component="main" maxWidth="xl" className={classes.root}>
            <Typography variant="h2" align="center">Корзина</Typography>

            <Grid container spacing={3} className={classes.root}>
                <Grid item xs={3}>
                    <Card className={classes.card}>
                        <Typography variant="h4" display="inline">Итого:</Typography>
                        <Typography variant="h4" display="inline">{prices + ' рублей'}</Typography>
                    </Card>
                </Grid>
                <Grid container item xs={7} spacing={2}>
                    {basket ? basket.map(product =>
                        <Grid item xs={4} key={product.id}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt={product.device.name}
                                        height="320"
                                        image={process.env.REACT_APP_API_URL + product.device.img}
                                        title={product.device.name}
                                    />
                                    <CardContent className={classes.inline}>
                                        <div>
                                            <Typography gutterBottom fontSize="small" component="h2">
                                                {product.device.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {product.device.price + ' ₽'}
                                            </Typography>
                                        </div>
                                        <DeleteIcon
                                            fontSize="large"
                                            onClick={() => deleteDevice(product.id)}
                                        />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ) : 
                        <span>Корзина пуста</span>
                    }
                </Grid>
            </Grid>
        </Container>
    );
};

export default Basket;