import {
  BrowserRouter as Router,
} from "react-router-dom";
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import {useState, useEffect} from 'react'
import {check} from './http/userAPI'
import { setIsAuth, setUser } from './slices/userSlice';
import {useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '600px',
    justifyContent: 'center',
    alignItems: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function App() {

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const classes = useStyles();

  useEffect(() => {
    dispatch(setIsAuth(false))
    dispatch(setUser({}))
    localStorage.removeItem('token')
  }, [])

  if (loading) {
    return <div className={classes.root}>
      <CircularProgress />
    </div>
  }

  return (
    <Router>
        <NavBar/>
        <AppRouter/>
    </Router>
  );
}

export default App;
