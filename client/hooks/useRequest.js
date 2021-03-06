import axios from 'axios';
import { useState } from 'react';
const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      setErrors(
        <div>
          {error.response.data.errors.map((err) => (
            <p key={err.message}>{err.message}</p>
          ))}
        </div>
      );
    }
  };

  return {
    doRequest,
    errors,
  };
};
export default useRequest;
