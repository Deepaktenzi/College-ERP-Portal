import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminLogout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      await axios
        .get('/api/admin/logout')
        .then(() => {
          navigate('/adminlogin', { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    logout();
  }, []);

  return <></>;
};
