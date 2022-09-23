import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

export const useAxios = <T,>(
  config: AxiosRequestConfig<any>,
  loadOnStart: boolean = true,
): [boolean, T | undefined, string, () => void] => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>('');

  const sendRequest = () => {
    setLoading(true);

    axios(config)
      .then(response => {
        setError('');
        setData(response.data);
      })
      .catch(er => {
        setError(er.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (loadOnStart) sendRequest();
    sendRequest();
  }, []);

  const request = () => {
    sendRequest();
  };

  return [loading, data, error, request];
};
