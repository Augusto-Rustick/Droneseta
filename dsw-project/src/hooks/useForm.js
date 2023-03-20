import api from "../utils/api";
import { useState, useEffect } from "react";

const useForm = (callback, initialState, url, dataFormater) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.get(url);
        if (dataFormater) {
          setData(dataFormater(result.data));
        } else {
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

  const handleChange = (event) => {
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
    } else {
      auxData[name] = value;
    }
    setData(auxData);
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    setLoading(true);
    await callback();
    setLoading(false);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const { name } = event.target;
    const tempData = { ...data };
    tempData[name] = files;
    setData(tempData);
  };

  const handleImageChange = (event, optionalEvent, optionalFiles) => {
    if (event) {
      const files = event.target.files;
      const blobFiles = [];
      Array.prototype.forEach.call(files, function (file) {
        imageToBlob(file).then((blob) => {
          blobFiles.push(blob);
        });
      });
      const { name } = event.target;
      const tempData = { ...data };
      tempData[name] = blobFiles;
      setData(tempData);
    } else {
      const files = optionalFiles;
      const { name } = optionalEvent.target;
      const tempData = { ...data };
      tempData[name] = files;
      setData(tempData);
    }

    function imageToBlob(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
              resolve(blob);
            }, file.type);
          };
        };
        reader.onerror = reject;
      });
    }

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
      handleImageChange,
      handleDateChange,
      setLoading,
      handleSelectChangeRadioOption,
    },
  ];
};

export default useForm;
