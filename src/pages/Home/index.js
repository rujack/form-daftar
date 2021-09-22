import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <Container className="d-flex h-100">
      <div className="justify-content-center align-self-center w-100 text-white">
        <div className="my-5 mx-5 text-center">
          <h1 className="m-0 animate__animated animate__fadeInDown">
            Form Pendaftaran Email
          </h1>
          <p
            className="animate__animated animate__fadeIn"
            style={{ fontWeight: "lighter" }}>
            Silahkan Cek di User Terdaftar pada web klik tombol cek apakah sudah
            ada, jika sudah ada tidak bisa login hub. saya.
          </p>
          <Row className="mt-3">
            <Col className="text-end">
              <Link
                to="/daftar"
                className="bg-light bg-opacity-25 border border-light btn btn-primary animate__animated animate__fadeInLeft"
                style={{ width: "150px" }}>
                Daftar
              </Link>
            </Col>
            <Col className="text-start">
              <Link
                to="/cek"
                className="bg-light bg-opacity-25 border border-light btn btn-primary animate__animated animate__fadeInRight"
                style={{ width: "150px" }}>
                Cek
              </Link>
            </Col>
          </Row>
          <p
            className="mt-4 animate__animated animate__fadeInUp"
            style={{ fontWeight: "lighter" }}>
            {props.copy}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Home;
