import React, { Component } from "react";
import { withFormik } from "formik";
import Yup from "yup";
import { Link } from "react-router-dom";

import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import { styles } from "./customStylesMui";

class InnerLoginForm extends Component {
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
      <div className={classes.container}>
        <h3 style={{ textAlign: "center" }}>
          ログイン
        </h3>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            placeholder="メールアドレス / 氏名 を入力"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username && touched.username}
            helperText={errors.username && touched.username && errors.username}
            label="メールアドレス / 氏名 を入力"
            className={classes.textField}
          />

          <TextField
            name="password"
            placeholder="パスワードを入力"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password}
            helperText={errors.password && touched.password && errors.password}
            label="パスワード"
            className={classes.textField}
          />
          <br />
          <Button
            variant="raised"
            className={classes.button}
            type="button"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            リセット
          </Button>
          <Button
            variant="raised"
            className={classes.button}
            type="submit"
            disabled={isSubmitting}
          >
            送信
          </Button>
        </form>
        <span>アカウントを持っていませんか？</span>{" "}
        <Link to="/register" className={classes.links}>
          新規登録
        </Link>
        <br />
      </div>
    );
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({
    username: "",
    password: ""
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required("この項目は必須です"),
    password: Yup.string()
      .min(6, "パスワードは 6 文字以上である必要があります")
      .required("パスワードは必須です")
  }),
  handleSubmit: (
    { username, password },
    { props, setSubmitting, setErrors }
  ) => {
    props.loginAction({ username, password }).then(response => {
      if (response.non_field_errors) {
        setErrors({ password: response.non_field_errors[0] });
      } else {
        props.authenticateAction(
          response,
          props.dispatch,
          props.location.pathname,
          props.history.push
        );
      }
    });
    setSubmitting(false);
  },
  displayName: "LoginForm" //hlps with react devtools
})(InnerLoginForm);

export const Login = withStyles(styles)(EnhancedForm);
