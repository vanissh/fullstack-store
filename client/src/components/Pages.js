import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { setShopPage } from '../slices/deviceSlice';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Pages = () => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const {totalCount, limit, page} = useSelector(state => state.deviceReducer)
    const pageCount = Math.ceil(totalCount / limit)

    return (
        <Grid container item xs={12} spacing={2} className={classes.root}>
            <Pagination 
                count={pageCount} 
                color="primary" 
                page={page} 
                onChange={(e, value) => dispatch(setShopPage(value))}
            />
        </Grid>

    );
}

export default Pages