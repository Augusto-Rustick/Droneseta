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
  const [gender, setGender] = useState("");
  const [sizes, setSizes] = useState([]);

  const callbackSubmit = async () => {
    console.log(data);
  };

  const initialState = {
    nomeProduto: "",
    precoProduto: "",
    imagensProduto: "",
    corProduto: "",
    descricaoProduto: "",
  };

  const handleImageAutoFormat = () => {
    setAutoFormat(!autoFormat);
  };

  const handleImageUpload = (event) => {
    setUploadedImages([]);
    if (autoFormat) {
      // ...
    } else {
      // ...
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSizeChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSizes((prevSizes) => [...prevSizes, value]);
    } else {
      setSizes((prevSizes) => prevSizes.filter((size) => size !== value));
    }
  };

  const [
    {
      data,
      loading,
      handleChange,
      handleSubmit,
      setData,
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
      <Form onSubmit={handleSubmit} loading={loading.toString()}>
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

          {/* Render uploaded images */}
          {/* ... */}

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

          {/* Gender Checkbox */}
          <Form.Group className="mb-3">
            <Form.Label>Gênero</Form.Label>
            <Form.Check
              type="checkbox"
              label="Masculino"
              value="masculino"
              checked={gender === "masculino"}
              onChange={handleGenderChange}
            />
            <Form.Check
              type="checkbox"
              label="Feminino"
              value="feminino"
              checked={gender === "feminino"}
              onChange={handleGenderChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tamanhos</Form.Label>
            <Form.Check
              type="checkbox"
              label="PP"
              value="PP"
              checked={sizes.includes("PP")}
              onChange={handleSizeChange}
            />
            <Form.Check
              type="checkbox"
              label="P"
              value="P"
              checked={sizes.includes("P")}
              onChange={handleSizeChange}
            />
            <Form.Check
              type="checkbox"
              label="M"
              value="M"
              checked={sizes.includes("M")}
              onChange={handleSizeChange}
            />
            <Form.Check
              type="checkbox"
              label="G"
              value="G"
              checked={sizes.includes("G")}
              onChange={handleSizeChange}
            />
            <Form.Check
              type="checkbox"
              label="GG"
              value="GG"
              checked={sizes.includes("GG")}
              onChange={handleSizeChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {isUpdate ? "Atualizar" : "Cadastrar"}
          </Button>
        </section>
      </Form>
    </>
  );
};

export default NewProduct;
