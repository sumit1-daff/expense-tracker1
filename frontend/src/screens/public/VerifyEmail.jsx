import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = new URLSearchParams(location.search).get('token');

      try {
        const response = await axios.get(`/verify-email?token=${token}`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage('Verification failed. Invalid or expired token.');
      }
    };

    verifyEmail();
  }, [location]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default VerifyEmail;
