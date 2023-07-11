import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useSignupMutation } from "../authApiSlice";


type Props = {
  modaltypehandler:any
}

const SignupForm = (props: Props) => {
  const { modaltypehandler } = props;
  const [ signup, { isLoading } ] = useSignupMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required('Email is required'),

        password: yup
        .string()
        .required("This field is required")
        .max(25, "Password is too long")
        .test(
          "val",
          "Spaces are not allowed",
          async (val: any) => val?.indexOf(" ") < 0 ?? null
        )
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),

    }),
    onSubmit: async (values) => {      
      setErrorMessage(null);
      console.log(values)
      try {
        await signup(values).unwrap();
      } catch (err) {
        setErrorMessage("Signup is failed! please try again")
      }      
    },
  });
  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Label for="Email">Email</Label>
          <Input type="email" name="email" id="Email" placeholder="Email" className="py-2" value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
          {(formik.touched.email && formik.errors.email) ? (
            <div className="text-red-400">{formik.errors.email}</div>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label for="Password">Password</Label>
          <Input type="password" name="password" id="Password" placeholder="Password" className="py-2"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
          {(formik.touched.password && formik.errors.password) ? (
            <div className="text-red-400">{formik.errors.password}</div>
          ) : null}
        </FormGroup>
        <FormGroup className="my-4">
          <Button type="submit" color="primary" size="md" className="py-2" disabled={isLoading || !formik.isValid} block>{isLoading ? "Please wait...":"Signup"}</Button>
        </FormGroup>
      </Form>
      {errorMessage && <Alert color="danger">
        {errorMessage}
      </Alert>}
    </div>
  )
}

export default SignupForm