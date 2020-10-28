import React, { Component } from "react";
import { withFormik } from "formik";
import Yup from "yup";
import { Link } from "react-router-dom";

import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import { styles } from "./customStylesMui";

class InnerRegistrationForm extends Component {
  render() {
    const {
      values,
      touched,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
      classes
    } = this.props;

    return (
      <span className={classes.container}>
        <h3 style={{ textAlign: "center" }}>
          新規登録
        </h3>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            placeholder="氏名を入力"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username && touched.username}
            helperText={errors.username && touched.username && errors.username}
            label="氏名"
            className={classes.textField}
            required
          />
          <TextField
            name="email"
            placeholder="メールアドレス"
            type="text"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email}
            helperText={errors.email && touched.email && errors.email}
            label="メールアドレス"
            className={classes.textField}
            required
          />
          <TextField
            name="password1"
            placeholder="パスワード"
            type="password"
            value={values.password1}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password1 && touched.password1}
            helperText={
              errors.password1 && touched.password1 && errors.password1
            }
            className={classes.textField}
            label="パスワード"
            required
          />
          <TextField
            name="password2"
            placeholder="パスワード"
            type="password"
            value={values.password2}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password2 && touched.password2}
            helperText={
              errors.password2 && touched.password2 && errors.password2
            }
            className={classes.textField}
            label="パスワードを再入力"
            required
          />

          <br />
          <Button
            className={classes.button}
            type="button"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
            variant="raised"
          >
            リセット
          </Button>
          <Button
            className={classes.button}
            type="submit"
            disabled={isSubmitting}
            variant="raised"
          >
            送信
          </Button>
        </form>
        <span>既にログインしている？</span>
        <Link to="/login" className={classes.links}>
          {" "}
          ログイン
        </Link>
      </span>
    );
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({
    username: "",
    email: "",
    password1: "",
    password2: ""
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required("氏名は必須です"),
    password1: Yup.string()
      .min(6, "パスワードは 6 文字以上である必要があります")
      .required("パスワードは必須です"),
    password2: Yup.string()
      .oneOf([Yup.ref("password1"), null], "パスワードが一致しません")
      .required("パスワードの確認は必須です"),
    email: Yup.string()
      .email("メールアドレスが間違っています")
      .required("メールアドレスは必須です")
  }),
  handleSubmit: (
    { username, email, password1 },
    { props, setSubmitting, setErrors }
  ) => {
    props
      .registerAction({ username, email, password: password1 })
      .then(resp => {
        if (
          resp.non_field_errors ||
          Array.isArray(resp.username) ||
          Array.isArray(resp.email) ||
          Array.isArray(resp.password)
        ) {
          setErrors(resp);
        } else {
          props.dispatch(props.registrationSuccessMessage());
          return props.history.push("/");
        }
      });
    setSubmitting(false);
  },
  displayName: "RegistrationForm" //hlps with react devtools
})(InnerRegistrationForm);

export const Register = withStyles(styles)(EnhancedForm);
