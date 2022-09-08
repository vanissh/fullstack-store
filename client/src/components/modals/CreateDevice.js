import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';
import {    setTypes, setBrands, setSelectedType, setSelectedBrand } from '../../slices/deviceSlice'

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #3f51b5',
        borderRadius: '10px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 4),
    },
    btn: {
        marginRight: theme.spacing(2),
        display: 'inline',
        width: '40%',
    },
    btnAdd: {
        margin: theme.spacing(2, 0),
        width: '80%',
    },
    btnRemove: {
        width: '20%'
    },
    ph: {
        fontSize: '1.3rem',
        margin: '0 auto'
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: 170,
        '&::before': {
            content: ''
        }
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    form: {
        margin: theme.spacing(1, 0),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textField: {
        width: '45%'
    },
    icon: {
        cursor: 'pointer'
    }
}));

const CreateDevice = ({show, onHide}) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const {types, brands, selectedType, selectedBrand } = useSelector(state => state.deviceReducer)
    const [info, setInfo] = useState([])

    const [state, setState] = useState({
        name: '',
        price: '',
        file: '',
        brand: '',
        type: ''
    })

    useEffect(() => {
        fetchTypes().then(data => dispatch(setTypes(data)))
        fetchBrands().then(data => dispatch(setBrands(data)))
    }, [])

    const changeInfo = (key, value, name) => {
        setInfo(info.map(i => i.name === name ? {...i, [key]: value} : i))
    }

    const addInfo = (e) => {
        e.preventDefault()
        setInfo([...info, {title: '', description: '', name: Date.now()}])
    }

    const removeInfo = (name) => {
        setInfo(info.filter(i => i.name !== name))
    }

    const addDevice = (e) => {
        e.preventDefault()
        const formData = new FormData()
        try {
            formData.append('name', state.name)
            formData.append('price', `${state.price}`)
            formData.append('img', state.file)
            formData.append('brandId', selectedBrand.id)
            formData.append('typeId', selectedType.id)
            formData.append('info', JSON.stringify(info))
            createDevice(formData).then(data => onHide())
        } catch (e) {
            alert (e)
        }
    }

    const body = (
        <div className={classes.paper}>
        <p className={classes.ph}>Создать устройство</p>
        <form noValidate>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Выберите тип</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={state.type}
                onChange={e => setState({...state, type: e.target.value})}
                >
                {types && types.map((type, i) => 
                    <MenuItem  
                        value={type.name}
                        key={i}
                        onClick={() => dispatch(setSelectedType(type))}
                    >
                        {type.name}
                    </MenuItem>
                )}
                </Select>
            </FormControl>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Выберите бренд</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={state.brand}
                onChange={e => setState({...state, brand: e.target.value})}
                >
                {brands && brands.map((brand, i) => 
                    <MenuItem  
                        value={brand.name}
                        key={i}
                        onClick={() => dispatch(setSelectedBrand(brand))}
                    >
                        {brand.name}
                    </MenuItem>
                )}
                </Select>
            </FormControl>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="device"
                label="Введите название устройства"
                name="device"
                autoFocus
                value={state.name}
                onChange={e => setState({...state, name: e.target.value})}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="price"
                label="Введите стоимость устройства"
                name="price"
                type="number"
                value={state.price}
                onChange={e => setState({...state, price: e.target.value})}
            />
            <FormControl className={classes.formControl}>
                <Input 
                    disableUnderline={true} 
                    type="file" 
                    onChange={e => setState({...state, file: e.target.files[0]})}
                /> 
            </FormControl>
            <Button
                type="text"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.btnAdd}
                onClick={(e) => addInfo(e)}
            >Добавить новое свойство</Button>
            {
                info.map(item => 
                    <div noValidate autoComplete="off" className={classes.form} key={item.name}>
                        <TextField 
                            className={classes.textField} id="name" 
                            label="Название свойства" variant="outlined" 
                            value={item.title}
                            onChange={e => changeInfo('title', e.target.value, item.name)}
                        />
                        <TextField 
                            className={classes.textField} id="description" 
                            label="Описание свойства" variant="outlined"
                            value={item.description}
                            onChange={e => changeInfo('description', e.target.value, item.name)}
                        />
                        <DeleteIcon className={classes.icon} onClick={() => removeInfo(item.number)}/>
                    </div>
                )
            }
            <Button
                type="text"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={e => addDevice(e)}
            >
                Создать
            </Button>
            <Button
                type="text"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={onHide}
            >
                Закрыть
            </Button>
        </form>
        </div>
    );

    return (
        <Modal
            open={show}
            onClose={onHide}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    );
}

export default CreateDevice