import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Form.css";
import { Row, Col, InputGroup } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [autoFormat, setAutoFormat] = useState(false);
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const callbackSubmit = async () => {
    const tamanho = ['PP', '_P', '_M', '_G', 'GG'];

    if(!data.gender){
      alert('Escolha o Tipo antes de continuar')
      return
    }

    const url = 'http://localhost:8080/produto/insert';

    const insertProduto = async (data) => {
      try {
        const response = await axios.post(url, data);
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    };

    tamanho.forEach((tamanhoItem) => {
      const cor = data.corProduto.toUpperCase()
      const codigo = `${tamanhoItem}${data.gender}${cor}`;

      const postData = {
        nome: data.nomeProduto,
        tamanho: tamanhoItem,
        preco: data.precoProduto,
        codigo: codigo,
        tipo: data.gender,
        descricao: data.descricaoProduto
      };

      insertProduto(postData);
    })

    navigate("/home");
  };

  const initialState = {
    nomeProduto: "",
    precoProduto: "",
    imagensProduto: "",
    corProduto: "",
    descricaoProduto: "",
    gender: "",
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

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
    handleChange(event);
  };

  const [
    {
      data,
      handleChange,
      handleSubmit,
      handleImageChange,
    },
  ] = useForm(callbackSubmit, initialState);


  return (
    <>
      <Form onSubmit={handleSubmit}>
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

          <Form.Group className="mb-3" id="reziseImages">
            <Form.Check
              onClick={handleImageAutoFormat}
              className="text-muted"
              type="checkbox"
              label="Formatar imagens automaticamente 1:1"
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="productColor">
              <Form.Label>Cor</Form.Label>
              <Form.Control
                defaultValue={data.corProduto}
                type="text"
                placeholder="Cor do produto"
                onChange={handleChange}
                name="corProduto"
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="productDescprition">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              defaultValue={data.descricaoProduto}
              as="textarea"
              placeholder="Ex: Especificações, Fabricante, Dimensões, Peso"
              onChange={handleChange}
              name="descricaoProduto"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productGender">
          <Form.Label>Tipo:</Form.Label>
            <Form.Control
              defaultValue={data.gender}
              as="select"
              onChange={handleGenderChange}
              name="gender"
            >
              <option value="">Selecione o tipo</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
        </section>
      </Form>
    </>
  );
};

export default NewProduct;
