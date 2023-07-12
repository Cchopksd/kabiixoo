import { Navigate } from 'react-router-dom';
import { getUser } from './services/authorize';

const MemberRoute = ({Component}) => {
    return getUser() ? <Component /> : <Navigate to="/signin" />
}

export default MemberRoute;