import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { SHOP_ROUTE, ADMIN_ROUTE, REGISTRATION_ROUTE, BASKET_ROUTE } from '../utils/consts';
import { setIsAuth, setUser } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  }
}));

const NavBar = () => {

    const {isAuth} = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes = useStyles();

    const logOut = () => {
      dispatch(setUser({}))
      dispatch(setIsAuth(false))
      localStorage.removeItem('token')
    }

    useEffect(() => {
      console.log('fyyff')
    }, [])

    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" className={classes.title}>
                <NavLink to={SHOP_ROUTE} className={classes.link}>
                    iStore
                </NavLink>
            </Typography>
            {isAuth ? 
                <>
                    <Button 
                      color="inherit" 
                      onClick={() => navigate(ADMIN_ROUTE)}
                    >
                        Админ
                    </Button>
                    <Button 
                      color="inherit" 
                      onClick={() => navigate(BASKET_ROUTE)}
                    >
                        <ShoppingCartIcon/>
                    </Button>
                    <Button 
                      color="inherit" 
                      onClick={logOut}
                    >
                      Выйти
                    </Button>
                </>
                :
                <Button
                  color="inherit" 
                  onClick={() => navigate(REGISTRATION_ROUTE)}
                >
                  Авторизация
                </Button>
            }
            </Toolbar>
        </AppBar>
        </div>
    );
}

export default NavBar