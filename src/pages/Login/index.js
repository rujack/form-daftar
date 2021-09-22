import React, { useState } from "react";
import {
  Container,
  Form,
  FloatingLabel,
  Button,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

const Login = () => {
  const [typePass, setTypePass] = useState("password");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const { dataUser } = useSelector((state) => state.userReducer);

  const onCheck = () => {
    if (typePass === "password") {
      setTypePass("text");
    } else {
      setTypePass("password");
    }
  };

  const onLogin = () => {
    if (user === dataUser.user && password === dataUser.password) {
      // console.log("login berhasil");
      dispatch({ type: "UPDATE_ISLOGIN", payload: true });
      history.push("/administrator");
      localStorage.setItem("localdata", JSON.stringify({ user, password }));
    } else {
      // console.log("login gagal");
      setShow(true)
    }
  };

  return (
    <Container className="d-flex h-100">
      <div className="justify-content-center align-self-center col col-lg-6 m-auto text-white">
        <div className="my-5 mx-5">
          <h1>Login</h1>
          {show ? (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              Login Gagal !
            </Alert>
          ) : null}
          <FloatingLabel controlId="email" label="Email" className="mb-3 ">
            <Form.Control
              type="email"
              placeholder="email1@aku.com"
              className="shadow bg-light bg-opacity-25 text-white"
              onChange={(e) => setUser(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="password"
            label="Password"
            className="mb-3 ">
            <Form.Control
              type={typePass}
              placeholder="password"
              className="shadow bg-light bg-opacity-25 text-white"
              onChange={(e) => setPassword(e.target.value)}
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
              <Button
                className="w-auto px-3 bg-light bg-opacity-25 border border-light btn btn-primary m-auto"
                onClick={onLogin}>
                Login
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default Login;
