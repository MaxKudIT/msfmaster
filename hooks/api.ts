import axios from "axios";
import { apiusers } from "../api/v1/api";
import { useState } from "react";

export function useGetData<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (url: string, token?: string) => {
    setLoading(true);
    try {
      const response = await apiusers.get<T>(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data);
      setError(null);
       return response.data
    } catch (e: any) {
       if (e.response && e.response.data && e.response.data.error) {
        
         setError(e.response.data.error);
       } else {
        setError('Сервер не активен, приносим свои извинения...')
       }
     
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}

export function usePostData<TGet, TPost>() {
  const [data, setData] = useState<TGet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDataForPost = async (url: string, data: TPost, token?: string) => {
    setLoading(true);
    try {
      const response = await apiusers.post<TGet>(url, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
      setData(response.data);
      setError(null);
    } catch (e: any) {
      
        if (e.response && e.response.data && e.response.data.error) {
         setError(e.response.data.error);
       } else {
 
        setError('Сервер не активен, приносим свои извинения...')
       }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchDataForPost };
}
