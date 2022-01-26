import React, { useCallback, useMemo, useState } from "react";
import { Button, Table, Modal, Popconfirm, Space, notification } from "antd";
import {
  EditOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";

// COMPONENTS
import NewUserModal from "./NewUser";
import ViewUserModal from "./ViewUser";

// UTILS
import { userSchema } from "../usersSchema";

const CustomTable = ({ usersData = [], setUsersData }) => {
  const [form, setForm] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  console.log("usersData", usersData);
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/delete-user/${id}`
      );
      notification.success({ message: "SUCCESS", description: response.data });
      setUsersData((prevData) => {
        return prevData.filter((data) => data.userId !== id);
      });
    } catch (err) {
      notification.error({ message: "ERROR", description: err.message });
    }
  };

  const findUser = (userId) => {
    return usersData.find((user) => user.userId === userId);
  };

  const handleView = (id) => {
    const found = findUser(id);
    if (found) {
      setForm(found);
      setShowViewModal(true);
    }
  };

  const handleEdit = (id) => {
    const found = findUser(id);
    if (found) {
      setForm(found);
      setShowModal(true);
    }
  };

  const showConfirm = () => {
    Modal.confirm({
      title: "Delete multiple users",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to delete selected users?",
      async onOk() {
        try {
          const selectedIds = selectedRows.map((data) => data.userId);
          const form = { usersId: selectedIds };
          const response = await axios.delete(
            `http://localhost:8080/delete-multiple-user`,
            {
              data: form,
            }
          );
          console.log("delete multiple", response);
          // notification.success({message: 'SUCCESS', description: response.data})
          // setUsersData(prevData => {
          // 	return prevData.filter(data => data.userId !== id)
          // });
        } catch (err) {
          notification.error({ message: "ERROR", description: err.message });
        }
      },
      onCancel() {},
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => {
      return { userId: record.userId };
    },
  };
  const generateColumns = useMemo(() => {
    const keys = Object.keys(userSchema);
    return keys.map((key) => {
      const { label, slug } = userSchema[key];
      return {
        ...userSchema[key],
        key: slug,
        dataIndex: slug,
        title: label,
      };
    });
  }, [userSchema]);
  const columns = [
    {
      title: "Actions",
      dataIndex: "userId",
      key: "action",
      render: (id) => {
        return (
          <>
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => handleDelete(id)}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
            <Button
              type="text"
              onClick={(e) => {
                handleEdit(id);
              }}
            >
              <EditOutlined />
            </Button>
            <Button type="text" onClick={() => handleView(id)}>
              <EyeOutlined />
            </Button>
          </>
        );
      },
    },
    ...generateColumns,
  ];

  return (
    <div style={{ padding: 50 }}>
      <Space>
        <Button
          style={{ marginBottom: "15px" }}
          type="primary"
          onClick={() => setShowModal(true)}
        >
          Add user
        </Button>
        {selectedRows.length !== 0 && (
          <Button
            style={{ marginBottom: "15px" }}
            type="danger"
            onClick={showConfirm}
          >
            Delete Selected User
          </Button>
        )}
      </Space>
      <Table
        bordered
        dataSource={usersData}
        columns={columns}
        pagination={false}
        rowSelection={rowSelection}
      />
      <NewUserModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        form={form}
        setForm={setForm}
        updateData={setUsersData}
        label={null}
      />
      <ViewUserModal
        showModal={showViewModal}
        closeModal={() => setShowViewModal(false)}
        form={form}
        setForm={setForm}
        updateData={setUsersData}
      />
    </div>
  );
};

export default CustomTable;
