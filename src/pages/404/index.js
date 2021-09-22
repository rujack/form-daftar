import React from "react";
import { Container } from "react-bootstrap";

const NotFoundComp = () => {
  return (
    <Container className="d-flex h-100">
      <div className="justify-content-center align-self-center w-100 text-white">
        <div className="my-5 mx-5 text-center">
          <h1 className="animate__animated animate__shakeY animate__infinite animate__slower">
            404 Page Not Found
          </h1>
        </div>
      </div>
    </Container>
  );
};

export default NotFoundComp;
