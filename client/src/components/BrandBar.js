import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {setSelectedBrand} from '../slices/deviceSlice'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    paper: {
        height: theme.spacing(6),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
            background: 'rgba(0, 0, 0, 0.04)'
        }
    },
    active: {
        background: 'rgba(0, 0, 0, 0.04)'
    }
}));

const BrandBar = () => {

    const {brands, selectedBrand} = useSelector(state => state.deviceReducer)
    const dispatch = useDispatch()
    const classes = useStyles();

    return (
        <Grid container item xs={12} spacing={2}>
            {
                brands && brands.map((brand, i) => 
                    <Grid item xs={2} key={i}>
                        <Paper 
                            className={brand === selectedBrand ? 
                                classes.active + ' ' + classes.paper : 
                                classes.paper
                            } 
                            children={brand.name}
                            onClick={() => dispatch(setSelectedBrand(brand))}
                        />
                    </Grid>
            )}
        </Grid>
    );
}

export default BrandBar