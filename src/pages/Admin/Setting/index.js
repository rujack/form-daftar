import React, { useState } from "react";
import {
  Container,
  FloatingLabel,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";

const SettingComp = () => {
  const [typePass, setTypePass] = useState("password");

  const onCheck = () => {
    if (typePass === "password") {
      setTypePass("text");
    } else {
      setTypePass("password");
    }
  };
  return (
    <Container className=" text-white my-4">
      <div className=" col col-lg-6 m-auto text-white">
        <div className="my-5 mx-5">
          <h1>Setting</h1>
          <h5 className="animate__animated animate__flash animate__infinite animate__slow">
            Halaman Iki Durung Fungsi
          </h5>
          <FloatingLabel controlId="email" label="Email" className="mb-3 ">
            <Form.Control
              type="email"
              placeholder="email1@aku.com"
              className="shadow bg-light bg-opacity-25 text-white"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="password"
            label="Password"
            className="mb-3 ">
            <Form.Control
              type={typePass}
              placeholder="email2@aku.com"
              className="shadow bg-light bg-opacity-25 text-white"
            />
          </FloatingLabel>
          <Row>
            <Col>
              <Form.Check
                inline
                label="Show Password"
                name="password"
                type="checkbox"
                className="text-white"
                onClick={onCheck}
              />
            </Col>
            <Col className="text-end">
              <Button className="w-auto px-3 bg-light bg-opacity-25 border border-light btn btn-primary m-auto">
                Ganti
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default SettingComp;
