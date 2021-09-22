import axios from "axios";
import React, { useState } from "react";
import {
  InputGroup,
  Button,
  FormControl,
  Row,
  Col,
  Container,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Cek = (props) => {
  const [hasilCek, setHasilCek] = useState({});
  const [cekId, setCekId] = useState("");

  const onCekId = () => {
    axios
      .get(`https://apidaftar.herokuapp.com/form/post/${cekId}`)
      .then((res) => {
        const hasil = res.data.data;
        setHasilCek(hasil);
        // console.log(hasilCek);
      })
      .catch((err) => {
        console.log(err);
        setHasilCek({ pesan: "Kode Tersebut Tidak ada " });
        // console.log(hasilCek);
      });
  };
  return (
    <Container className="text-white">
      <div className="my-5 mx-5 text-center animate__animated animate__fadeIn">
        <h1>Cek Email</h1>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Masukan Kode"
            className="shadow"
            onChange={(e) => setCekId(e.target.value)}
          />
          <Button
            className={
              cekId === ""
                ? "bg-light bg-opacity-25 border border-light disabled"
                : "bg-light bg-opacity-25 border border-light "
            }
            style={{ width: "100px" }}
            id="button-addon2"
            onClick={onCekId}>
            Cek
          </Button>
        </InputGroup>
        {hasilCek.pesan && (
          <div className="animate__animated animate__fadeIn">
            <p className="mb-0">Hasil:</p>
            <Table className="w-auto m-auto text-white borderless my-3">
              <tbody>
                <tr>
                  <td><h5>NIM</h5></td>
                  <td><h5>:</h5></td>
                  <td><h5>{hasilCek.nim}</h5></td>
                </tr>
                <tr>
                  <td><h5>Nama</h5></td>
                  <td><h5>:</h5></td>
                  <td><h5>{hasilCek.nama_depan+" "+hasilCek.nama_belakang}</h5></td>
                </tr>
                <tr>
                  <td><h5>Email 1</h5></td>
                  <td><h5>:</h5></td>
                  <td><h5>{hasilCek.email_1+"@domain.com"}</h5></td>
                </tr>
                <tr>
                  <td><h5>Email 2</h5></td>
                  <td><h5>:</h5></td>
                  <td><h5>{hasilCek.email_2+"@domain.com"}</h5></td>
                </tr>
                <tr>
                  <td><h5>Keterangan</h5></td>
                  <td><h5>:</h5></td>
                  <td><h5>{hasilCek.pesan}</h5></td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
        <Row>
          <Col className="text-end">
            <Link to="/" className="text-white">
              Kembali
            </Link>
          </Col>
          <Col className="text-start">
            <Link to="/daftar" className="text-white">
              Daftar Email
            </Link>
          </Col>
        </Row>
        <p className="mt-3" style={{ fontWeight: "lighter" }}>
          {props.copy}
        </p>
      </div>
    </Container>
  );
};

export default Cek;
