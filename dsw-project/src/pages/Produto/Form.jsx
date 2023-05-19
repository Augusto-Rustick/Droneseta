import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Form.css";
import { Row, Col, InputGroup } from "react-bootstrap";
import useForm from "../../hooks/useForm";

const NewProduct = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [autoFormat, setAutoFormat] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const callbackSubmit = async () => {
    console.log(data);
  };

  const initialState = {
    nomeProduto: "",
    quantidadeProduto: "",
    precoProduto: "",
    imagensProduto: "",
    corProduto: "",
    descricaoProduto: "",
    visivelProduto: true,
  };

  const handleImageAutoFormat = () => {
    setAutoFormat(!autoFormat);
  };

  const handleImageUpload = (event) => {
    setUploadedImages([]);
    if (autoFormat) {
      const files = Array.from(event.target.files);
      const uploadedImages = [];
      const squareImages = [];
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
              canvas.toBlob((blob) => {
                squareImages.push(blob);
              }, file.type);
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
        handleImageChange(undefined, event, squareImages);
        setUploadedImages(uploadedImages);
      };

      processImages();
    } else {
      const files = Array.from(event.target.files);
      handleImageChange(event);
      const images = files.map((file) => {
        return URL.createObjectURL(file);
      });
      setUploadedImages((prevImages) => [...prevImages, ...images]);
    }
  };

  const [
    {
      data,
      loading,
      handleChange,
      handleSubmit,
      setData,
      handleSelectChange,
      handleImageChange,
      setLoading,
    },
  ] = useForm(callbackSubmit, initialState);

  useEffect(() => {
    // calc isUpdate

    const fetch = async () => {
      setLoading(true);
      // setData();
      setLoading(false);
    };

    if (isUpdate)
      return () => {
        fetch();
      };
  }, [isUpdate, loading, setData, setLoading]);

  return (
    <>
      <Form onSubmit={handleSubmit} loading={loading}>
        <section className="p-100 form-container">
          <h1 className="mb-5">Novo produto</h1>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="productName">
              <Form.Label>Produto</Form.Label>
              <Form.Control
                defaultValue={data.nomeProduto}
                type="text"
                placeholder="Nome do produto"
                onChange={handleChange}
                name="nomeProduto"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="productQuantity">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                defaultValue={data.quantidadeProduto}
                type="number"
                placeholder="Quantidade dísponivel"
                onChange={handleChange}
                name="quantidadeProduto"
              />
            </Form.Group>
          </Row>

          <Form.Group controlId="productIPrice" className="mb-3">
            <Form.Label>Preço</Form.Label>
            <InputGroup>
              <InputGroup.Text>R$</InputGroup.Text>
              <Form.Control
                defaultValue={data.precoProduto}
                type="number"
                required
                onChange={handleChange}
                name="precoProduto"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="productImages" className="mb-3">
            <Form.Label>Imagens</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleImageUpload}
              name="imagensProduto"
            />
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
            <Form.Select defaultChecked={data.produtoCor} name="produtoCor">
              <option>Escolha..</option>
              <option>Azul</option>
              <option>Verde</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="productDescprition">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              defaultValue={data.descricaoProduto}
              as="textarea"
              placeholder="Ex: Especificações, Fabricante, Dimensões, Peso"
              name="descricaoProduto"
            />
          </Form.Group>

          <Form.Group className="mb-3" id="productAvaliable">
            <Form.Check
              type="checkbox"
              label="Produto disponível"
              defaultChecked={data.visivelProduto}
              name="visivelProduto"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {isUpdate? 'Atualizar' : 'Cadastrar'}
          </Button>
        </section>
      </Form>
    </>
  );
};

export default NewProduct;
