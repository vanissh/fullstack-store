import { useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CreateDevice from '../components/modals/CreateDevice';
import CreateBrand from '../components/modals/CreateBrand';
import CreateType from '../components/modals/CreateType';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
        display: 'flex',
        alignItems: 'flex-start'
    },
    btn: {
        color: '#fff',
        background: '#3f51b5',
        '&:hover': {
            background: '#5e6dbf'
        },
        minHeight: '60px',
        minWidth: '270px',
        marginRight: theme.spacing(3)
    }
}));
const AdminPanel = () => {

    const classes = useStyles()

    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <>
            <Container className={classes.root}>
                <Button className={classes.btn} onClick={() => setTypeVisible(true)}>Добавить новый тип</Button>
                <Button className={classes.btn} onClick={() => setBrandVisible(true)}>Добавить новый Brand</Button>
                <Button className={classes.btn} onClick={() => setDeviceVisible(true)}>Добавить новое устройство</Button>
            </Container>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
        </>
    )
}

export default AdminPanel