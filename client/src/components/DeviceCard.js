import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useNavigate } from 'react-router-dom'
import {DEVICE_ROUTE} from '../utils/consts'
import { useSelector } from 'react-redux';

const DeviceCard = ({device}) => {
    const navigate = useNavigate()
    const {types, brands} = useSelector(state => state.deviceReducer)

    const type = types.filter(item => item.id === device.typeId)[0]
    const brand = brands.filter(item => item.id === device.brandId)[0]

    return (
        <Grid item xs={4}>
            <Card onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={device.name}
                        height="320"
                        image={process.env.REACT_APP_API_URL + device.img}
                        title={device.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            {device.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {type && type.name} {brand && brand.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default DeviceCard