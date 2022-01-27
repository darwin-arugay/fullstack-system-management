import { Input } from "antd";

export const InputWrapper = ({ id, type, onChange, value }) => {
  const commonProps = { id, type, onChange, value };
  switch (type) {
    case "password":
      return <Input.Password {...commonProps} />;
    default:
      return <Input {...commonProps} />;
  }
};
