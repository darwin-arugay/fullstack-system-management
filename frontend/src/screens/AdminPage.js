import React, { useEffect, useState } from "react";
import CustomTable from "../components/Table";
import axios from "axios";

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.get("http://localhost:8080/get-all");
      setUsers(response.data.map((d) => ({ key: d.userId, ...d })));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <CustomTable usersData={users} setUsersData={setUsers} />;
};

export default AdminPage;
