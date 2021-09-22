import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Table,
  Button,
  FormControl,
  InputGroup,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataRequest,
  updateToAPIForm,
} from "../../../config/Redux/action/requestAction";
import axios from "axios";

const Admin = () => {
  const [search, setSearch] = useState("");
  const [modalShowView, setModalShowView] = useState(false);
  const [id, setId] = useState("");
  const [pesan, setPesan] = useState("");

  const dispatch = useDispatch();
  const { dataRequest, modalShow } = useSelector(
    (state) => state.requestReducer,
  );

  useEffect(() => {
    dispatch(setDataRequest());
  }, [dispatch]);

  const onModalView = (e) => {
    e.stopPropagation();
    const id = e.target.id;
    setId(id);
    setModalShowView(true);
  };

  const onAcc = (e) => {
    const id = e.target.id;
    const form = { setuju: true, pesan: "Email Sudah di Buat" };
    dispatch(updateToAPIForm(form, id));
    dispatch(setDataRequest());
  };
  const onTolak = () => {
    const form = { setuju: false, pesan: pesan };
    dispatch(updateToAPIForm(form, id));
    dispatch(setDataRequest());
  };
  const onDelete = () => {
    axios
      .delete(`https://apidaftar.herokuapp.com/form/post/${id}`)
      .then((res) => {
        console.log(res);
        dispatch({ type: "SET_MODAL_REQ", payload: false });
        dispatch(setDataRequest());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className=" text-white my-4">
      <h1 className="mb-3 text-center">Permintaan</h1>
      <Card className="bg-light bg-opacity-25 text-white ">
        <InputGroup className=" w-75 m-auto mt-4">
          <FormControl
            placeholder="Masukan NIM"
            className="shadow"
            type="number"
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <Button
            className="bg-light bg-opacity-25 border border-light"
            style={{ width: "100px" }}
            id="button-addon2">
            Cari
          </Button> */}
        </InputGroup>
        <Table
          responsive="xl"
          className="text-white my-3 m-auto"
          style={{ width: "825px" }}>
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>NIM</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {dataRequest
              // eslint-disable-next-line array-callback-return
              .filter((user) => {
                if (search === "") {
                  return user;
                } else if (user.nim.toString().includes(search)) {
                  return user;
                }
              })
              .map((user, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{user.nim}</td>
                    <td>{user.nama_depan + " " + user.nama_belakang}</td>
                    <td>{user.email_1}</td>
                    <td>{user.password}</td>
                    <td className="text-center d-flex flex-column">
                      <Button
                        className="mx-2 my-1"
                        size="sm"
                        id={user._id}
                        onClick={(e) => onModalView(e)}>
                        <i id={user._id} className="far fa-eye"></i>
                      </Button>
                      <Button
                        id={user._id}
                        className="mx-2 my-1"
                        variant="success"
                        size="sm"
                        onClick={(e) => onAcc(e)}>
                        <i id={user._id} className="fas fa-check"></i>
                      </Button>
                      <Button
                        className="mx-2 my-1"
                        variant="danger"
                        size="sm"
                        id={user._id}
                        onClick={(e) => {
                          dispatch({ type: "SET_MODAL_REQ", payload: true });
                          setId(e.target.id);
                        }}>
                        <i id={user._id} className="fas fa-times"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <MyModalView
          show={modalShowView}
          onHide={() => setModalShowView(false)}
          id={id}
          data={dataRequest}
        />
        <ModalDelete
          show={modalShow}
          onHide={() => {
            dispatch({ type: "SET_MODAL_REQ", payload: false });
            setPesan("");
          }}
          id={id}
          onDelete={onDelete}
          pesan={(e) => setPesan(e.target.value)}
          onTolak={onTolak}
          isi={pesan}
        />
      </Card>
    </Container>
  );
};

function MyModalView(props) {
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
        .filter((user) => {
          if (user._id.includes(id)) {
            return user;
          }
        })
        .map((user, i) => {
          return (
            <Modal.Body key={i}>
              <Row>
                <Col xs={3}>Nim</Col>
                <Col xs={1}>:</Col>
                <Col>{user.nim}</Col>
              </Row>
              <Row>
                <Col xs={3}>Nama</Col>
                <Col xs={1}>:</Col>
                <Col>{user.nama_depan + " " + user.nama_belakang}</Col>
              </Row>
              <Row>
                <Col xs={3}>Email 1</Col>
                <Col xs={1}>:</Col>
                <Col>{user.email_1}</Col>
              </Row>
              <Row>
                <Col xs={3}>Email 2</Col>
                <Col xs={1}>:</Col>
                <Col>{user.email_2}</Col>
              </Row>
              <Row>
                <Col xs={3}>Password</Col>
                <Col xs={1}>:</Col>
                <Col>{user.password}</Col>
              </Row>
              <Row>
                <Col xs={3}>No HP</Col>
                <Col xs={1}>:</Col>
                <Col>{user.no_hp}</Col>
              </Row>
              <Row>
                <Col xs={3}>Kode</Col>
                <Col xs={1}>:</Col>
                <Col>{user._id}</Col>
              </Row>
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
        <Modal.Title>Konfirmasi Tolak</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        I will not close if you click outside me. Don't even try to press escape
        key.
        <FormControl
          placeholder="Pesan"
          className=" mt-3 border-0"
          type="text"
          onChange={(e) => {
            props.pesan(e);
          }}
        />
        <i>* Pesan harus diisi untuk tolak</i>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          className={props.isi === "" ? "disabled" : null}
          onClick={props.onTolak}>
          Tolak
        </Button>
        <Button variant="danger" onClick={props.onDelete}>
          Hapus
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Admin;
