import React from "react";
import { Button, Col, Form, Row, Input, notification } from "antd";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { generateYup } from "../../utils/generateYup";

const LoginPage = () => {
  const navigate = useNavigate();

  const loginSchema = {
    username: {
      type: "string",
      slug: "username",
      label: "Username",
      required: true,
    },
    password: {
      type: "password",
      slug: "password",
      label: "Password",
      required: true,
    },
  };

  const defaultValues = {
    username: "",
    password: "",
  };

  const { control, handleSubmit } = useForm({ defaultValues });
  const onSubmit = async (values) => {
    try {
      await generateYup(loginSchema).validate(values);
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
      <h1 style={{ magrinBottom: 20 }}>Welcome to SYSTEM MANAGEMENT</h1>
      <Form
        layout="vertical"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
      >
        <Row gutter={[8, 8]}>
          <Col {...colSizes}>
            <Controller
              name="username"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Form.Item
                  name="username"
                  rules={[{ required: true }]}
                  label="Username"
                >
                  <Input onChange={onChange} value={value} />
                </Form.Item>
              )}
            />
          </Col>
          <Col {...colSizes}>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Form.Item
                  name="password"
                  rules={[{ required: true }]}
                  label="Password"
                >
                  <Input.Password onChange={onChange} value={value} />
                </Form.Item>
              )}
            />
          </Col>
          <Col {...colSizes}>
            <Form.Item>
              <Button onClick={handleSubmit(onSubmit)} type="primary">
                Login
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default LoginPage;
