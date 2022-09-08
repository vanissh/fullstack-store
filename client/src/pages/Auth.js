import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setIsAuth, setUser, setIsAdmin } from '../slices/userSlice';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from '../utils/consts.js'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { registration, login } from '../http/userAPI.js';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: '#3f51b5',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    }
  },
  ph: {
    display: 'inline',
  }
}));

const Auth = () => {
  const classes = useStyles();
  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const isLogin = location.pathname === LOGIN_ROUTE

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const sign = async (event) => {
    event.preventDefault()
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }

      dispatch(setUser(data))
      dispatch(setIsAuth(true))

      // if (email === "admin@mail.ru"){
      //   setIsAdmin(true)
      // }

      navigate(SHOP_ROUTE)
    } catch (e) {
      console.log(e)
    }
    
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin? 'Войти' : 'Регистрация'}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => sign(e)}
          >
            {isLogin? 'Войти' : 'Регистрация'}
          </Button>
          <Grid container>
            <Grid item>
                {isLogin ?
                    <>
                        <p className={classes.ph}>Нет аккаунта? </p>
                        <NavLink to={REGISTRATION_ROUTE} className={classes.link}>
                            Зарегистрироваться
                        </NavLink>
                    </>
                    :
                    <>
                        <p className={classes.ph}>Есть аккаунт? </p>
                        <NavLink to={LOGIN_ROUTE} className={classes.link}>
                            Войти
                        </NavLink>
                    </>
                }
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Auth