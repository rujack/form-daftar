import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Card,
  Table,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setDataForm } from "../../config/Redux/action/homeAction";

const DataAll = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [id, setId] = useState("");
  const [setuju, setSetuju] = useState(0);
  const [tolak, setTolak] = useState(0);

  const dispatch = useDispatch();
  const { dataForm, data } = useSelector((state) => state.homeReducer);

  let counter = 0;
  useEffect(() => {
    dispatch(setDataForm());

    function filterDataProses() {
      dataForm
        // eslint-disable-next-line array-callback-return
        .filter((user) => {
          if (user.pesan.toString().includes("Proses...")) {
            return user;
          }
        })
        // eslint-disable-next-line array-callback-return
        .map((_, i) => {
          setTolak(i + 1);
        });
    }

    function filterDataSetuju() {
      dataForm
        // eslint-disable-next-line array-callback-return
        .map((user, i) => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          if (user.setuju) counter += 1;

          setSetuju(counter);
        });
    }

    filterDataSetuju();
    filterDataProses();
  }, [dataForm, dispatch]);

  const onModal = (e) => {
    const id = e.target.id;
    setId(id);
    setModalShow(true);
  };

  const onModalDelete = (e) => {
    const id = e.target.id;
    setId(id);
    setModalShowDelete(true);
  };

  const onDelete = () => {
    axios
      .delete(`http://192.168.43.238:4000/form/post/${id}`)
      .then((res) => {
        console.log(res);
        setModalShowDelete(false);
        dispatch(setDataForm());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className=" text-white my-4">
      <h1 className="mb-3 text-center">Dashboard</h1>
      <Card className="bg-light bg-opacity-25 text-white ">
        <Row className="w-75 m-auto mt-4 border py-2 rounded">
          <Col className="text-center border-end p-0">
            <p className="mb-1">Total</p>
            <span className=" fw-bold">{data.totalPost}</span>
          </Col>
          <Col className="text-center border-end p-0">
            <p className="mb-1">Di Setujui</p>
            <span className=" fw-bold">{setuju}</span>
          </Col>
          <Col className="text-center p-0">
            <p className="mb-1">Proses</p>
            <span className=" fw-bold">{tolak}</span>
          </Col>
        </Row>
        <Table
          responsive="xl"
          className="text-white mt-3  m-auto"
          style={{ width: "825px" }}>
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>NIM</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {dataForm.map((data, i) => {
              return (
                <Fragment key={i}>
                  <tr>
                    <td>
                      <i className="fas fa-dot-circle"></i>
                    </td>
                    <td>{data.nim}</td>
                    <td>{data.nama_depan + " " + data.nama_belakang}</td>
                    <td>{data.email_1}</td>
                    <td>{data.pesan}</td>
                    <td>
                      <Button
                        id={data._id}
                        size="sm"
                        className=""
                        onClick={(e) => onModal(e)}>
                        <i id={data._id} className="far fa-eye"></i>
                      </Button>
                      <span> </span>
                      <Button
                        id={data._id}
                        size="sm"
                        variant="danger"
                        onClick={(e) => onModalDelete(e)}>
                        <i id={data._id} className="fas fa-times"></i>
                      </Button>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </Table>
        <MyModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={id}
          data={dataForm}
        />
        <ModalDelete
          show={modalShowDelete}
          onHide={() => setModalShowDelete(false)}
          onDelete={onDelete}
        />
        <Row className="my-4 w-75 m-auto">
          {/* <Col className="text-end">
            {data.page > 1 ? (
              <Button
                className=" bg-transparent border border-light btn btn-primary"
                size="sm"
                disabled>
                Sebelumnya
              </Button>
            ) : (
              <Button
                className=" bg-transparent border border-light btn btn-primary"
                size="sm">
                Sebelumnya
              </Button>
            )}
          </Col>
          <Col className="text-start">
            <Button
              className=" bg-transparent border border-light btn btn-primary"
              size="sm">
              Selanjutnya
            </Button>
          </Col> */}
        </Row>
      </Card>
    </Container>
  );
};

function MyModal(props) {
  const { data, id } = props;
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Data Lengkap
        </Modal.Title>
      </Modal.Header>
      {data
        // eslint-disable-next-line array-callback-return
        .filter((data) => {
          if (data._id.includes(id)) {
            return data;
          }
        })
        .map((data, i) => {
          return (
            <Modal.Body key={i}>
              <Row>
                <Col xs={4}>Nim</Col>
                <Col xs={1}>:</Col>
                <Col>{data.nim}</Col>
              </Row>
              <Row>
                <Col xs={4}>Nama Depan</Col>
                <Col xs={1}>:</Col>
                <Col>{data.nama_depan}</Col>
              </Row>
              <Row>
                <Col xs={4}>Nama Belakang</Col>
                <Col xs={1}>:</Col>
                <Col>{data.nama_belakang}</Col>
              </Row>
              <Row>
                <Col xs={4}>Nama Lengkap</Col>
                <Col xs={1}>:</Col>
                <Col>{data.nama_depan + " " + data.nama_belakang}</Col>
              </Row>
              <Row>
                <Col xs={4}>Email 1</Col>
                <Col xs={1}>:</Col>
                <Col>{data.email_1}</Col>
              </Row>
              <Row>
                <Col xs={4}>Email 2</Col>
                <Col xs={1}>:</Col>
                <Col>{data.email_2}</Col>
              </Row>
              <Row>
                <Col xs={4}>Password</Col>
                <Col xs={1}>:</Col>
                <Col>{data.password}</Col>
              </Row>
              <Row>
                <Col xs={4}>No HP</Col>
                <Col xs={1}>:</Col>
                <Col>{data.no_hp}</Col>
              </Row>
              <Row>
                <Col xs={4}>Kode</Col>
                <Col xs={1}>:</Col>
                <Col>{data._id}</Col>
              </Row>
              <Row>
                <Col xs={4}>Di Input</Col>
                <Col xs={1}>:</Col>
                <Col>
                  {new Date(data.createdAt).toLocaleDateString() +
                    " " +
                    new Date(data.createdAt).toLocaleTimeString()}
                </Col>
              </Row>
              {data.setuju === true || data.pesan!=="Proses..."? (
                <Row>
                  <Col xs={4}>Di Update</Col>
                  <Col xs={1}>:</Col>
                  <Col>
                    {new Date(data.updatedAt).toLocaleDateString() +
                      " " +
                      new Date(data.updatedAt).toLocaleTimeString()}
                  </Col>
                </Row>
              ) : null}
            </Modal.Body>
          );
        })}
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalDelete(props) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Konfirmasi Hapus</Modal.Title>
      </Modal.Header>
      <Modal.Body>Yakin Mau Menghapus Data Ini ?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onDelete}>
          Hapus
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DataAll;
