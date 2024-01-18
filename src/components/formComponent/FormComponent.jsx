import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import "./styles.css";
import InputField from "../inputField/InputField";
import SelectField from "../selectField/SelectField";
import { useGetFilmsMutation } from "../../redux/filmApi";
import { object, string } from "yup";
import Loader from "react-js-loader";

const FormComponent = () => {
  const [films, setFilms] = useState(null);
  const [getFilms] = useGetFilmsMutation();
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const filmSchema = object({
    firstName: string().trim().required("You need to enter a first name"),
    lastName: string().trim().required("You need to enter a last name"),
    favoriteMovie: string().required("You need to select a movie"),
  });

  const getFilmNames = async () => {
    const {
      data: {
        data: {
          allFilms: { films },
        },
      },
    } = await getFilms();
    setFilms(films);
  };

  useEffect(() => {
    getFilmNames();
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      filmSchema.validateSync(values, { abortEarly: false });
      setSubmitted(true);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      setErrors(error.errors);
    }
  };

  return (
    <>
      {submitted ? (
        <div className="submit-container">
          <h3 className="title">My form</h3>
          {!loading ? (
            <h3 className="submit-txt">Thanks for submitting the form!</h3>
          ) : (
            <Loader
              type="spinner-default"
              bgColor={"#00B3FF"}
              color={"#00B3FF"}
              size={60}
            />
          )}
        </div>
      ) : (
        <div className="form-container">
          <h3 className="title">My form</h3>
          <div className="error-container">
            {errors &&
              errors.map((error, index) => (
                <p key={error + index} className="error-txt">
                  {error}
                </p>
              ))}
          </div>
          {films ? (
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                favoriteMovie: films[0]?.title,
              }}
              onSubmit={handleFormSubmit}
            >
              <Form className="form" onChange={() => setErrors([])}>
                <InputField
                  fieldName={"First Name"}
                  htmlName={"firstName"}
                  error={errors.some((error) => error.includes("first name"))}
                />
                <InputField
                  fieldName={"Last Name"}
                  htmlName={"lastName"}
                  error={errors.some((error) => error.includes("last name"))}
                />

                <SelectField
                  fieldName={"Favorite Star Wars movie"}
                  htmlName={"favoriteMovie"}
                  data={films}
                />
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </Form>
            </Formik>
          ) : (
            <Loader
              type="spinner-default"
              bgColor={"#00B3FF"}
              color={"#00B3FF"}
              size={60}
            />
          )}
        </div>
      )}
    </>
  );
};

export default FormComponent;
