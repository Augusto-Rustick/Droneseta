import api from '../services/api';
import { useState, useEffect } from 'react';

const useForm = (callback, initialState, url, dataFormater) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.get(url);
        if(dataFormater){
          setData(dataFormater(result.data));
        }else{
          setData(result.data);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    if (url) {
      fetchData();
    }
  }, [url, dataFormater]);

  const handleChange = event => {
    const { target } = event;
    const { name, value } = target;
    const auxData = { ...data };
    auxData[name] = value;
    setData(auxData);
  };

  const handleSelectChange = (event, { name, value }) => {
    const auxData = { ...data };
    auxData[name] = value;
    setData(auxData);
  };

  const handleSelectChangeRadioOption = (event, { name, value }) => {
    const auxData = { ...data };
    if (auxData[name] === value) {
      auxData[name] = null;
    }
    else {
      auxData[name] = value;
    }
    setData(auxData);
  };

  const handleSubmit = async event => {
    if (event) {
      event.preventDefault();
    }
    setLoading(true);
    await callback();
    setLoading(false);
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    const { name } = event.target;
    const tempData = { ...data };
    tempData[name] = file;
    setData(tempData);
  };

  const handleDateChange = (date, name) => {
    const tempData = { ...data };
    tempData[name] = date;
    setData(tempData);
  };

  return [
    {
      data,
      loading,
      handleChange,
      handleSubmit,
      setData,
      handleSelectChange,
      handleFileChange,
      handleDateChange,
      setLoading,
      handleSelectChangeRadioOption
    }
  ];
};

export default useForm;
