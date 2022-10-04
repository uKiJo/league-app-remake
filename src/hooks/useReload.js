import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useReload = () => {
  const navigate = useNavigate();
  // const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    navigate(location.pathname);
    console.log(location.pathname);
  }, [navigate, location.pathname]);
};
