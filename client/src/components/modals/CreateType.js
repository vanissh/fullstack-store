import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createType } from '../../http/deviceAPI';
import { useState } from 'react';

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
  ph: {
    fontSize: '1.3rem',
    margin: '0 auto'
  }
}));

const CreateType = ({show, onHide}) => {
    const classes = useStyles();
    const [value, setValue] = useState('')

    const addType = () => {
        createType({name: value}).then(data => setValue(''))
        onHide()
    }

    const body = (
        <div className={classes.paper}>
        <p className={classes.ph}>Создать тип</p>
        <form noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="type"
                label="Введите название типа"
                name="type"
                autoFocus
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <Button
                type="text"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={addType}
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

export default CreateType