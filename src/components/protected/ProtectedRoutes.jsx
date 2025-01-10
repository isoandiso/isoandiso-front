import { Navigate, useLocation } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import Swal from 'sweetalert2';

const ProtectedRoutes = ({ children,/* role */ }) => {

    const location = useLocation();

    const { /*user,*/ isAuth, isLoading  } = useUser();

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (!isAuth) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Necesitas iniciar sesión para acceder a este sitio.",
        });
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    /*if (role && !user.role == role) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No tienes permisos para acceder a este sitio",
        });
        return <Navigate to="/" replace />;
    }*/

    return children;
}

export default ProtectedRoutes
