import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { setTypes, setBrands, setDevices, setTotalCount } from '../slices/deviceSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchTypes, fetchBrands, fetchDevices } from '../http/deviceAPI.js'
import Pages from '../components/Pages';

const useStyles = makeStyles((theme) => ({
    main: {
       marginTop: theme.spacing(3),
    }
}));

const Shop = () => {
    const classes = useStyles();

    const dispatch = useDispatch()
    const {selectedBrand, selectedType, page, limit} = useSelector(state => state.deviceReducer)

    useEffect(() => {
        fetchTypes().then(data => dispatch(setTypes(data)))
        fetchBrands().then(data => dispatch(setBrands(data)))
        fetchDevices(null, null, 1, 3).then(data => {
            dispatch(setDevices(data.rows))
            dispatch(setTotalCount(data.count))
        })
    }, [])

    useEffect(() => {
        fetchDevices(selectedType.id, selectedBrand.id, page, limit).then(data => {
            dispatch(setDevices(data.rows))
            dispatch(setTotalCount(data.count))
        })
    }, [page, selectedType, selectedBrand])
    return (
        <Container component="main" maxWidth="xl" className={classes.main}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <TypeBar/>
                </Grid>
                <Grid container item xs={9}  spacing={3}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Shop