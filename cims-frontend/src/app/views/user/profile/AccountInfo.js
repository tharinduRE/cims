import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { BsPen } from "react-icons/bs";
import { AuthContext } from "../../../pages/auth/AuthProvider";
import { Formik } from "formik";
import * as Yup from "yup";
import fetchApi from "../../../service/Axios";
import { Typeahead } from "react-bootstrap-typeahead";
import { useHistory } from "react-router-dom";

export default function AccountInfo({ editUser }) {
  const { state: AuthState, dispatch } = React.useContext(AuthContext);
  const authUser = AuthState.user;

  const [stores, setStores] = useState([]);

  const getStores = async () => {
    const response = await fetchApi.get(`/stores`);
    setStores(response.data);
  };

  const [imageUrl, setimageUrl] = useState(process.env.PUBLIC_URL + "/images/avatar.svg");

  const updateCurrentUser = async (payload) => {
    // use POST /put for ROLE_ADMIN
    const res = await fetchApi.put(`/users`, payload);
    if (res.status === 200) dispatch({ type: "UPDATE", payload: { user: res.data } });
  };

  // eslint-disable-next-line no-unused-vars
  const updateUserAccount = async (payload) => {
    // use POST /account for ROLE_USER
    const res = await fetchApi.post(`/account`, payload);
    if (res.status === 200) {
      const response = await fetchApi.get(`/account`, payload);
      dispatch({ type: "UPDATE", payload: { user: response.data } });
    }
  };

  const uploadAvatar = async (values) => {
    const formData = new FormData();
    formData.append("file", values);
    const res = await fetchApi.post(`/account/avatar`, formData);
    if (res.status === 200) {
      return res.data;
    }
  };

  const updateAccount = async (values) => {
    if (authUser.authorities.includes("ROLE_ADMIN")) {
      await updateCurrentUser(values);
      return;
    }
    if (authUser.authorities.includes("ROLE_USER")) await updateUserAccount(values);
  };

  const history = useHistory();

  const updateUser = async (payload) => {
    // use POST /account for ROLE_USER
    const res = await fetchApi.put(`/users`, payload);
    console.log(res);
    history.push("/user/manage");
  };

  const handleUserForm = async (values) => {
    editUser ? await updateUser(values) : await updateAccount(values);
  };

  const schema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    postTitle: Yup.string().required(),
    authStores: Yup.array().min(1),
    email: Yup.string().email().required(),
  });

  useEffect(() => {
    getStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <Card.Header className="py-3">
        <h3 className="font-weight-bolder mb-0">
          {editUser ? "Edit User" : "Account Information"}
        </h3>
        <span className="text-muted font-weight-bold font-size-sm mt-1">
          {editUser ? "Change User information" : "Change your account settings"}
        </span>
      </Card.Header>
      <Card.Body>
        <Formik
          validationSchema={schema}
          enableReinitialize={true}
          initialValues={editUser ? editUser : authUser}
          onSubmit={async (values) => {
            if (values.avatar) {
              const avatarUrl = await uploadAvatar(values.avatar);
              values.avatarUrl = avatarUrl;
              await handleUserForm(values);
            } else await handleUserForm(values);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            setFieldValue,
            values,
            initialValues,
            touched,
            isSubmitting,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Avatar
                </Form.Label>
                <Col sm={6}>
                  <div
                    className="image-input image-input-outline image-input-circle"
                    style={{
                      backgroundImage: `url(${process.env.PUBLIC_URL + "/images/avatar.svg"})`,
                    }}
                  >
                    <div
                      className="image-input-wrapper"
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                      }}
                    >
                      <label className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow">
                        <BsPen />
                        <Form.File
                          className="d-none"
                          id="image-input"
                          name="avatar"
                          accept=".png, .jpg, .jpeg"
                          onChange={(e) => {
                            setFieldValue("avatar", e.target.files[0]);
                            setimageUrl(URL.createObjectURL(e.target.files[0]));
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <span className="form-text text-muted">Allowed file types: png, jpg, jpeg.</span>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  First Name
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    name="firstName"
                    type="text"
                    placeholder="FirstName"
                    className="form-control-solid"
                    value={values.firstName}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Last Name
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="form-control-solid"
                    value={values.lastName}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Position
                </Form.Label>
                <Col sm={6}>
                  <Typeahead
                    id="post-title"
                    name="postTitle"
                    newSelectionPrefix="Add a new position: "
                    placeholder="Select users' position"
                    clearButton
                    defaultInputValue={values.postTitle}
                    options={[
                      "Lecturer",
                      "Lab Staff",
                      "Temporary Demonstrator",
                      "Lab Assistant",
                      "Adminstrator",
                    ]}
                    onChange={(s) => {
                      setFieldValue("postTitle", s[0]);
                      handleChange("postTitle");
                    }}
                    isInvalid={errors.postTitle ? true : false}
                  ></Typeahead>
                  <Form.Control.Feedback type="invalid">{errors.postTitle}</Form.Control.Feedback>
                </Col>
              </Form.Group>
              <div className="separator separator-dashed mb-5"></div>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Autherized Stores
                </Form.Label>
                <Col sm={6}>
                  <Typeahead
                    id="auth-stores"
                    labelKey="name"
                    multiple
                    onChange={(s) => {
                      setFieldValue("authStores", s);
                      handleChange("authStores");
                    }}
                    options={stores}
                    placeholder="Choose autherized stores..."
                    selected={values.authStores}
                    isInvalid={errors.authStores ? true : false}
                    disabled={!authUser.authorities.includes("ROLE_ADMIN")}
                  />
                  <Form.Control.Feedback type="invalid">{errors.authStores}</Form.Control.Feedback>
                </Col>
              </Form.Group>
              <div className="separator separator-dashed mb-5"></div>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Email
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-control-solid"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="submit" variant="info" disabled={isSubmitting || (values === initialValues)}>
                    Update
                    {isSubmitting ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      ""
                    )}
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
}
