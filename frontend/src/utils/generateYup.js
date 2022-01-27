import * as yup from "yup";

export const generateYup = (schema) => {
  let schemaValidation = {};
  Object.values({ ...schema })
    .map((d) => {
      let validation = null;
      if (d.type === "email")
        validation = yup.string().email("Email must be valid!");
      else validation = yup.string();
      if (d.required) {
        validation = validation.required(`${d.label} is required`);
      }

      if (validation)
        schemaValidation = { ...schemaValidation, [d.slug]: validation };
    })
    .filter((d) => !!d);

  return yup.object().shape(schemaValidation);
};
