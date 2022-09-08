import {
  Routes,
  Route,
} from 'react-router-dom';
import Shop from '../pages/Shop';
import { authRoutes, publicRoutes } from '../routes';
import { useSelector } from 'react-redux';


const AppRouter = () => {
    const {isAuth} = useSelector(state => state.userReducer)

    return (
            <Routes>
                {isAuth && authRoutes.map(({path, Component}) => 
                    <Route key={path} path={path} exact element={<Component/>}/>
                )}
                {publicRoutes.map(({path, Component}) => 
                    <Route key={path} path={path} exact element={<Component/>}/>
                )}
                <Route path="*" element={<Shop/>}/>
            </Routes>
    )
}

export default AppRouter