import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const FacultyLogout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      await axios
        .get('/api/faculty/logout')
        .then(() => {
          navigate('/', { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    logout();
  }, []);

  return <></>;
};
