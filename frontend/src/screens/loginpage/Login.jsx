import React from "react";
import { Button, Col, Form, Row, Input, notification } from "antd";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const defaultValues = {
    username: "",
    password: "",
  };

  const { control, handleSubmit } = useForm({ defaultValues });
  const onSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:8080/login", values);

      const {
        data: { message, data },
      } = response;
      const isRegistered = data.filter(
        (d) => d.username === values.username && d.password === values.password
      );
      if (isRegistered.length !== 0) {
        notification.success({
          message: "SUCCESS",
          description: message,
        });
        navigate("/admin", { replace: true });
      } else {
        notification.error({
          message: "ERROR",
          description: "Wrong credentials",
        });
      }
    } catch (err) {
      notification.error({ message: "ERROR", description: err.message });
    }
  };
  const colSizes = { xs: 24, sm: 24, lg: 24, xl: 24, xxl: 24 };
  return (
    <div className="center">
      <p style={{ magrinBottom: 20 }}>
        <b>Login:</b> Please enter your username and password.
      </p>
      <Form>
        <Row gutter={[8, 8]}>
          <Col {...colSizes}>
            <Controller
              name="username"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Form.Item>
                  <Input
                    onChange={onChange}
                    placeholder="Username"
                    value={value}
                  />
                </Form.Item>
              )}
            />
          </Col>
          <Col {...colSizes}>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Form.Item>
                  <Input
                    onChange={onChange}
                    placeholder="Password"
                    value={value}
                  />
                </Form.Item>
              )}
            />
          </Col>
          <Col {...colSizes}>
            <Form.Item>
              <Button onClick={handleSubmit(onSubmit)}>Login</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default LoginPage;
