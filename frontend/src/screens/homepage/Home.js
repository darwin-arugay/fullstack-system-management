import React from "react";
// import {} from 'antd'
import { Link } from "react-router-dom";

// COMPONENTS
import SignUpForm from "../../components/NewUser";

// STYLES
import "./homepage.scss";

const HomePage = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <div className="homepage center">
        <h1 className="title">Welcome to management system</h1>
        <div>
          <span>
            Create an account you may sign up{" "}
            <a onClick={() => setShowModal(true)}>here.</a>
          </span>
          <span>or</span>
          <span>
            You may login <Link to="/login">here.</Link>
          </span>
        </div>
      </div>
      <SignUpForm
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        label="Register new user"
        updateData={null}
        setForm={null}
      />
    </>
  );
};

export default HomePage;
