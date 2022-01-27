import React, { useEffect, useMemo } from "react";
import { Button, Col, Modal, Form, Row, notification } from "antd";
import { Controller, useForm } from "react-hook-form";
import { isEmpty } from "lodash";
import axios from "axios";

import { userSchema } from "../usersSchema.js";

// COMPONENTS
import { InputWrapper } from "./InputWrapper.jsx";
import { generateYup } from "../utils/generateYup.js";

const NewUserModal = ({
  showModal = false,
  closeModal,
  form = null,
  label = "Create new user",
  setForm,
  updateData,
}) => {
  const { defaultValues, fields } = useMemo(() => {
    const keys = Object.keys(userSchema);
    let defaultValues = {},
      fields = [];
    for (const key of keys) {
      const { slug, type } = userSchema[key];
      fields = [...fields, { ...userSchema[key] }];
      switch (type) {
        case "boolean":
          defaultValues = { ...defaultValues, [slug]: false };
          break;
        default:
          defaultValues = { ...defaultValues, [slug]: "" };
          break;
      }
    }
    return { defaultValues, fields };
  });

  const { handleSubmit, control, reset } = useForm({ defaultValues });

  const onSubmit = async (values) => {
    try {
      await generateYup(userSchema).validate(values);
      if (isEmpty(form)) {
        const response = await axios.post(
          "http://localhost:8080/add-user",
          values
        );
        notification.success({
          message: "SUCCESS",
          description: response.data.message,
        });
        if (updateData) {
          updateData((prevData) => [
            { ...response.data.data, key: response.data.data.userId },
            ...prevData,
          ]);
        }
      } else {
        const responseUpdate = await axios.put(
          `http://localhost:8080/update-user`,
          values
        );
        notification.success({
          message: "SUCCESS",
          description: responseUpdate.data.message,
        });
        if (updateData) {
          updateData((prevData) => {
            return prevData.map((data) => {
              if (data.userId !== responseUpdate.data.data.userId) {
                return data;
              }
              return { ...data, ...responseUpdate.data.data };
            });
          });
        }
      }
      close();
    } catch (err) {
      notification.error({ message: "ERROR", description: err.message });
    }
  };
  const renderFields = ({ id, label, ...rest }) => {
    return (
      <Controller
        name={id}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Form.Item label={label}>
            <InputWrapper onChange={onChange} value={value} {...rest} />
          </Form.Item>
        )}
      />
    );
  };
  const close = () => {
    closeModal();
    if (setForm) {
      setForm({});
    }
  };

  useEffect(() => {
    if (!isEmpty(form)) reset(form);
    else reset(defaultValues);
  }, [form]);

  const colSizes = { xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 };
  const title = label ? label : !isEmpty(form) ? "Edit user" : "Add new user";
  return (
    <Modal
      visible={showModal}
      onCancel={close}
      title={title}
      footer={
        <>
          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
          <Button onClick={close}>Cancel</Button>
        </>
      }
    >
      <Form layout="vertical" requiredMark>
        <Row gutter={[16, 16]}>
          {fields.map((field) => {
            const { slug } = field;
            return (
              <Col {...colSizes}>{renderFields({ id: slug, ...field })}</Col>
            );
          })}
        </Row>
      </Form>
    </Modal>
  );
};
export default NewUserModal;
