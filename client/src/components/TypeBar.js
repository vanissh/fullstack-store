import { useSelector, useDispatch } from 'react-redux'
import {setSelectedType} from '../slices/deviceSlice'
import { makeStyles } from '@material-ui/core/styles';

import PhonelinkIcon from '@material-ui/icons/Phonelink';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    active: {
        background: 'rgba(0, 0, 0, 0.04)'
    }
}));

const TypeBar = () => {

    const {types, selectedType} = useSelector(state => state.deviceReducer)
    const dispatch = useDispatch()
    const classes = useStyles();

    return (
        <List component="nav" aria-label="main mailbox folders">
            {
                types && types.map((type) => 
                    <ListItem 
                        button 
                        key={type.id} 
                        className={type === selectedType ? classes.active : null}
                        onClick={() => dispatch(setSelectedType(type))}
                    >
                        <ListItemIcon>
                            <PhonelinkIcon />
                        </ListItemIcon>
                        <ListItemText primary={type.name} />
                    </ListItem>
                )
            }
        </List>
    )
}

export default TypeBar