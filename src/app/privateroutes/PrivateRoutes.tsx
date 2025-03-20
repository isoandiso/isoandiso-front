import { Navigate, useLocation } from 'react-router-dom';
import { useCompany } from '../main/CompanyContext';
import Swal from 'sweetalert2';
import { ReactNode } from 'react';

interface PrivateRoutesProps {
    children: ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
    const location = useLocation();
    const { isAuth, isLoading } = useCompany();

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

    return children;
};

export default PrivateRoutes;