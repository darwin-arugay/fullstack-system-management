import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Modal, Input, Form, Row, Statistic } from "antd";
import { Controller, useForm } from "react-hook-form";

import { userSchema } from "../usersSchema.js";

const ViewUser = ({ showModal = false, closeModal, form = {} }) => {
  const colSizes = { xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 };
  const renderFields = () => {
    const keys = Object.keys(userSchema);
    return keys.map((key) => {
      const { label } = userSchema[key];
      return (
        <Col {...colSizes}>
          <Statistic
            title={label}
            value={form[key]}
            formatter={(value) => {
              return (
                <span style={{ fontSize: "10pt", fontWeigth: "700" }}>
                  {value ? value : "N/A"}
                </span>
              );
            }}
          />
        </Col>
      );
    });
  };
  return (
    <Modal
      visible={showModal}
      onCancel={closeModal}
      title="View user"
      footer={null}
    >
      <Row>{renderFields()}</Row>
    </Modal>
  );
};
export default ViewUser;
