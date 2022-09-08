import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneDevice, addToBasket } from '../http/deviceAPI';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
    },
    img: {
        height: '350px',
    },
    block: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    price_block: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: '1.5rem',
        margin: '0 auto'
    },
    btn: {
        color: '#fff',
        background: '#3f51b5',
        marginLeft: theme.spacing(3)
    },
    list_item_active: {
        background: 'rgba(0, 0, 0, 0.04)'
    }
}));


const DevicePage = () => {
    const classes = useStyles()

    const [device, setDevice] = useState({info: []})
    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(id)
            .then(data => setDevice(data))
    }, [])

    const add = () => {
        const formData = new FormData()
        formData.append('deviceId', `${id}`)
        addToBasket(formData).then(response => alert(`Товар ` + device.name + ` был добавлен в вашу корзину!`))
    }
    
    return (
        <Grid container className={classes.root}>
            <Grid item xs={4} className={classes.block}>
                <p className={classes.title}>{device.name}</p>
                <img src={process.env.REACT_APP_API_URL + device.img} alt={device.name} className={classes.img}/>
                <div className={classes.price_block}>
                    <p className={classes.title}>{device.price} &#8381;</p>
                    <Button 
                        variant="contained" 
                        className={classes.btn}
                        onClick={add}
                    >
                        Добавить в корзину
                    </Button>
                </div>
            </Grid>
            <Grid item xs={7}>
                <List component="nav" aria-label="main mailbox folders">
                    {
                        device && device.info.map((info, i) => 
                            <ListItem 
                                button 
                                key={i} 
                                className={i % 2 === 0 ? classes.list_item_active : null}
                            >
                                <ListItemText>{info.name}: {info.description}</ListItemText>
                            </ListItem>
                        )
                    }
                </List>
            </Grid>
        </Grid>
    )
}

export default DevicePage