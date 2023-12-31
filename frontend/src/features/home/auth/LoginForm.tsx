import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { decodeUrl, sleep } from "utils/helpers";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useLoginMutation } from "../authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../homeSlice";


type Props = {
  modaltypehandler: any
}

const LoginForm = (props: Props) => {
  const { modaltypehandler } = props;
  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required('Email is required'),

      password: yup.string()
        .required('Password is required'),
      // .test('val','Word limit can"t be more than 500 and less than 80 words', async (val:any) => await val?.split(" ").length >= 80 && await val?.split(" ").length<=500)

    }),
    onSubmit: async (values) => {
      setErrorMessage(null);
      try {
        const userResponse: any = await login(values).unwrap();
        const { accessToken } = userResponse;
        const {UserInfo:{email}} = decodeUrl(accessToken.split(".")[1])
        localStorage.setItem("authToken",accessToken)

        dispatch(setCredentials({ token: accessToken, user: email }))

        navigate('/products')
      } catch (err) {
        setErrorMessage("Login is failed! please check the credentials")
      }


      // .then((res:any) => {
      //   const { access_token } = res.data;
      //   localStorage.setItem("authToken", access_token);


      //   formik.setSubmitting(false);
      //   sleep(1000).then(()=>{
      //     return window.location.assign("/auth/login");
      //   })        

      // }).catch((err:any) => {
      //   console.log(err);
      //   setIsError(true);
      //   formik.setSubmitting(false);
      //   return toast.error("Something went wrong");
      // })
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
          <Button type="submit" color="primary" size="md" className="py-2" disabled={!formik.isValid && !formik.dirty} block>{isLoading ? "Please wait...":"Login"}</Button>
        </FormGroup>
      </Form>
      <h1 data-testid="errormessage" style={{visibility:"hidden"}}>error</h1> {/* for testing visibility */}
      {/* {errorMessage && <Alert color="danger">
        {errorMessage}
      </Alert>} */}
    </div>
  )
}

export default LoginForm