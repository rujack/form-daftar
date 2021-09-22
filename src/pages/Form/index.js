import React, {  useState } from "react";
import {
  Form,
  FloatingLabel,
  Row,
  Col,
  Button,
  Container,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setForm, postToAPIForm, setAlert } from "../../config/Redux/action";

const FormComp = (props) => {
  const [typePass, setTypePass] = useState("password");
  const [confirm, setConfirm] = useState("disabled");
  const [errors, setErrors] = useState({});

  const { form, isLoading, alert } = useSelector(
    (state) => state.createFormReducer,
  );
  const dispatch = useDispatch();

  const findFormErrors = () => {
    const {
      nim,
      nama_depan,
      nama_belakang,
      email_1,
      email_2,
      password,
      jenis_email,
      no_hp,
    } = form;
    const newErrors = {};
    // name errors
    if (!nim || nim === "") newErrors.nim = "* Tidak Boleh Kosong";
    else if (nim.length <= 9) newErrors.nim = "Nim minimal 9";

    if (!nama_depan || nama_depan === "")
      newErrors.nama_depan = "* Tidak Boleh Kosong";
    else if (nama_depan.length <= 3)
      newErrors.nama_depan = "Nama Depan minimal 3";

    if (!nama_belakang || nama_belakang === "") {
      newErrors.nama_belakang = "* Tidak Boleh Kosong";
    } else if (nama_belakang.length <= 3) {
      newErrors.nama_belakang = "Nama Belakang minimal 3";
    }

    if (!email_1 || email_1 === "") newErrors.email_1 = "* Tidak Boleh Kosong";
    else if (email_1.length <= 5) newErrors.email_1 = "Nama Email minimal 5";

    if (!email_2 || email_2 === "") newErrors.email_2 = "* Tidak Boleh Kosong";
    else if (email_2.length <= 5) newErrors.email_2 = "Nama Email minimal 5";

    if (!password || password === "")
      newErrors.password = "* Tidak Boleh Kosong";
    else if (password.length <= 8)
      newErrors.password = "* Minimal 8 huruf dengan campuran simbol dan angka";

    if (!jenis_email || jenis_email === "Jenis Email")
      newErrors.jenis_email = "* Tidak Boleh Kosong";

    if (!no_hp || no_hp === "") newErrors.no_hp = "* Tidak Boleh Kosong";
    else if (no_hp.length <= 10) newErrors.no_hp = "Nomor HP Minimal 10";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    console.log(form.nama_belakang.length)
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      dispatch(postToAPIForm(form));
      dispatch(setForm("nim", ""));
      dispatch(setForm("nama_depan", ""));
      dispatch(setForm("nama_belakang", ""));
      dispatch(setForm("email_1", ""));
      dispatch(setForm("email_2", ""));
      dispatch(setForm("password", ""));
      dispatch(setForm("jenis_email", ""));
      dispatch(setForm("no_hp", ""));
    }
  };

  const onCheck = () => {
    if (typePass === "password") {
      setTypePass("text");
    } else {
      setTypePass("password");
    }
  };

  return (
    <Container className="text-white animate__animated animate__fadeIn">
      <div className="my-5 mx-5 ">
        <h1 className="text-center">Daftar Email</h1>
        {alert.show ? (
          <Alert
            variant={alert.variant}
            onClose={() => dispatch(setAlert("show", false))}
            dismissible>
            {alert.messege}
          </Alert>
        ) : null}
        <Form>
          <FloatingLabel controlId="nim" label="NIM" className="mb-3 ">
            <Form.Control
              type="number"
              placeholder="1234567890"
              className="shadow bg-light bg-opacity-25 text-white"
              size="sm"
              onChange={(e) => dispatch(setForm("nim", e.target.value))}
              isInvalid={!!errors.nim}
              value={form.nim}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nim}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Row>
            <Col>
              <FloatingLabel
                controlId="nama_depan"
                label="Nama Depan"
                className="mb-3 ">
                <Form.Control
                  type="text"
                  placeholder="Sueb"
                  className="shadow bg-light bg-opacity-25 text-white"
                  onChange={(e) =>
                    dispatch(setForm("nama_depan", e.target.value))
                  }
                  isInvalid={!!errors.nama_depan}
                  value={form.nama_depan}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nama_depan}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="nama_belakang"
                label="Nama Belakang"
                className="mb-3 ">
                <Form.Control
                  type="text"
                  placeholder="Nihil"
                  className="shadow bg-light bg-opacity-25 text-white"
                  onChange={(e) =>
                    dispatch(setForm("nama_belakang", e.target.value))
                  }
                  isInvalid={!!errors.nama_belakang}
                  value={form.nama_belakang}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nama_belakang}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          <i>* Masukkan Nama Email Tanpa Domain</i>
          <FloatingLabel
            controlId="email_1"
            label="Nama Email-1"
            className="mb-3 mt-1">
            <Form.Control
              type="email"
              placeholder="email1@aku.com"
              className="shadow bg-light bg-opacity-25 text-white"
              onChange={(e) => dispatch(setForm("email_1", e.target.value))}
              isInvalid={!!errors.email_1}
              value={form.email_1}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email_1}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            controlId="email_2"
            label="Nama Email-2"
            className="mb-3 ">
            <Form.Control
              type="email"
              placeholder="email2@aku.com"
              className="shadow bg-light bg-opacity-25 text-white"
              onChange={(e) => dispatch(setForm("email_2", e.target.value))}
              isInvalid={!!errors.email_2}
              value={form.email_2}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email_2}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            controlId="password"
            label="Password"
            className="mb-3 ">
            <Form.Control
              type={typePass}
              placeholder="qwertyu"
              className="shadow bg-light bg-opacity-25 text-white"
              onChange={(e) => dispatch(setForm("password", e.target.value))}
              isInvalid={!!errors.password}
              value={form.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
            <Form.Check
              inline
              id="cek"
              label="Show Password"
              name="password"
              type="checkbox"
              className="text-white mt-1"
              onClick={onCheck}
            />
          </FloatingLabel>
          <Row>
            <Col>
              <FloatingLabel
                controlId="jenis_email"
                label="Jenis"
                className="mb-3 ">
                <Form.Select
                  aria-label="Floating label select example"
                  className="shadow bg-light bg-opacity-25 text-white"
                  onChange={(e) =>
                    dispatch(setForm("jenis_email", e.target.value))
                  }
                  isInvalid={!!errors.jenis_email}>
                  <option className=" text-black">Jenis Email</option>
                  <option value="Bisnis" className=" text-black">
                    Bisnis
                  </option>
                  <option value="Biasa" className=" text-black">
                    Biasa
                  </option>
                  <option value="B aja" className=" text-black">
                    B aja
                  </option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.jenis_email}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="no_hp" label="No HP" className="mb-3 ">
                <Form.Control
                  type="number"
                  placeholder="1234567890"
                  className="shadow bg-light bg-opacity-25 text-white"
                  onChange={(e) => dispatch(setForm("no_hp", e.target.value))}
                  isInvalid={!!errors.no_hp}
                  value={form.no_hp}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.no_hp}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          <Form.Check
            inline
            id="cek2"
            label="Sudah Terisi Dengan Benar"
            name="Sudah Terisi Dengan Benar"
            type="checkbox"
            className="text-white mt-1"
            onClick={() => {
              if (confirm === "") {
                setConfirm("disabled");
              } else {
                setConfirm("");
              }
            }}
          />
          <div className="text-center">
            {isLoading ? (
              <Button
                className="bg-light bg-opacity-25 border border-light btn btn-primary"
                style={{ width: "150px" }}
                type="submit"
                disabled>
                Loading
              </Button>
            ) : (
              <Button
                className={`bg-light bg-opacity-25 border border-light btn btn-primary ${confirm}`}
                style={{ width: "150px" }}
                onClick={handleSubmit}
                type="submit">
                Daftar
              </Button>
            )}
          </div>
        </Form>
        <div className="text-center">
          <Row className="mt-3">
            <Col className="text-end">
              <Link to="/" className="text-white">
                Kembali
              </Link>
            </Col>
            <Col className="text-start">
              <Link to="/cek" className="text-white">
                Cek Email
              </Link>
            </Col>
          </Row>
        </div>
        <p className="mt-3 text-center" style={{ fontWeight: "lighter" }}>
          {props.copy}
        </p>
      </div>
    </Container>
  );
};

export default FormComp;
