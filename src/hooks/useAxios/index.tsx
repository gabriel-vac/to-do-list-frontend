import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { baseURL } from '../../consts';

export const useAxios = <T,>(
  config: AxiosRequestConfig<any>,
  endpoint: string,
  errorCallback: () => void,
  loadOnStart: boolean = true,
): {
  loading: boolean;
  data: T | undefined;
  error: string;
  request: () => void;
} => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>('');
  const url: string = `${baseURL}${endpoint}`;

  const sendRequest = () => {
    setError('');
    setLoading(true);

    axios({ ...config, url })
      .then(response => {
        setData(response.data);
      })
      .catch(er => {
        setError(er.message);
        errorCallback();
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (loadOnStart) sendRequest();
    else setLoading(false);
  }, []);

  const request = () => {
    sendRequest();
  };

  return { loading, data, error, request };
};
