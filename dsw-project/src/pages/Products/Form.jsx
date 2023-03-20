import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Product.css";
import { Row, Col } from "react-bootstrap";

const NewProduct = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [autoFormat, setAutoFormat] = useState(false);

  const handleImageAutoFormat = () => {
    setAutoFormat(!autoFormat);
  };

  const handleImageUpload = (event) => {
    setUploadedImages([]);
    if (autoFormat) {
      const files = Array.from(event.target.files);
      const uploadedImages = [];

      const processImage = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const image = new Image();
            image.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              const size = Math.min(image.width, image.height);
              canvas.width = size;
              canvas.height = size;
              ctx.drawImage(
                image,
                (image.width - size) / 2,
                (image.height - size) / 2,
                size,
                size,
                0,
                0,
                size,
                size
              );
              const squareImageUrl = canvas.toDataURL(file.type);
              resolve(squareImageUrl);
            };
            image.onerror = reject;
            image.src = event.target.result;
          };
          reader.readAsDataURL(file);
        });
      };

      const processImages = async () => {
        for (const file of files) {
          const squareImageUrl = await processImage(file);
          uploadedImages.push(squareImageUrl);
        }
        setUploadedImages(uploadedImages);
      };

      processImages();
    } else {
      const files = Array.from(event.target.files);
      const images = files.map((file) => URL.createObjectURL(file));
      setUploadedImages((prevImages) => [...prevImages, ...images]);
    }
  };

  //   const [
  //       {
  //         data,
  //         loading,
  //         handleChange,
  //         handleSubmit,
  //         setData,
  //         handleSelectChange,
  //         handleFileChange,
  //         setLoading
  //       }
  //     ] = useForm(useCallback, null, "", null);

  useEffect(
    () => {
      // placeholder
      const isUpdate = false;

      const fetch = async () => {
        //   setLoading(true);
        //   /** TODO */
        //   setLoading(false);
      };

      if (isUpdate)
        return () => {
          fetch();
        };
    },
    [
      // loading, setLoading
    ]
  );

  return (
    <Form>
      <section className="p-100 form-container">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="productName">
            <Form.Label>Produto</Form.Label>
            <Form.Control type="text" placeholder="Nome do produto" />
          </Form.Group>

          <Form.Group as={Col} controlId="productQuantity">
            <Form.Label>Quantidade</Form.Label>
            <Form.Control
              defaultValue="0"
              type="number"
              placeholder="Quantidade dísponivel"
              style={{ width: "150px" }}
            />
          </Form.Group>
        </Row>

        <Form.Group controlId="productImages" className="mb-3">
          <Form.Label>Imagens</Form.Label>
          <Form.Control type="file" multiple onChange={handleImageUpload} />
        </Form.Group>

        {uploadedImages.length > 0 && (
          <div
            style={{
              padding: "25px",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridGap: "5px",
              justifyContent: "spaceBetween",
            }}
          >
            {uploadedImages.map((image, index) => (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                key={index}
                src={image}
                alt={`Uploaded image ${index}`}
                style={{
                  maxWidth: "320px",
                  width: "100%",
                  border: "10px solid none",
                  borderRadius: "5px",
                  boxShadow: "rgba(100, 100, 111, 0.5) 0px 7px 29px 0px",
                }}
              />
            ))}
          </div>
        )}

        <Form.Group className="mb-3" id="reziseImages">
          <Form.Check
            onClick={handleImageAutoFormat}
            className="text-muted"
            type="checkbox"
            label="Formatar imagens automaticamente 1:1"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productColor">
          <Form.Label>Cor/Padrão</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Azul</option>
            <option>Verde</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="productDescprition">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Ex: Especificações, Fabricante, Dimensões, Peso"
          />
        </Form.Group>

        <Form.Group className="mb-3" id="productAvaliable">
          <Form.Check type="checkbox" label="Produto disponível" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </section>
    </Form>
  );
};

export default NewProduct;
