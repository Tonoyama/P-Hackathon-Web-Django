import React, { Component } from "react";
import { withFormik } from "formik";
import Yup from "yup";

import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import { styles } from "./customStylesMui";

class InnerPwForm extends Component {
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
      classes,
      change_password
    } = this.props;

    return (
      <span className={classes.container}>
        <h3 style={{ textAlign: "center" }}>パスワードを変更</h3>
        {change_password.resp_message && (
          <div className="alert alert-success" role="alert">
            <strong>{change_password.resp_message}</strong>
          </div>
        )}
        {change_password.err && (
          <div className="alert alert-danger" role="alert">
            <strong>{change_password.err.message}</strong>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            name="current_password"
            placeholder="以前のパスワードを入力"
            type="password"
            value={values.current_password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.current_password && touched.current_password}
            helperText={
              errors.current_password &&
              touched.current_password &&
              errors.current_password
            }
            label="以前のパスワード"
            className={classes.textField}
          />

          <TextField
            name="new_password"
            placeholder="新しいパスワードを入力"
            type="password"
            value={values.new_password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.new_password && touched.new_password}
            helperText={
              errors.new_password && touched.new_password && errors.new_password
            }
            label="新しいパスワード"
            className={classes.textField}
          />
          <TextField
            name="re_new_password"
            placeholder="新しいパスワードを入力"
            type="password"
            value={values.re_new_password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.re_new_password && touched.re_new_password}
            helperText={
              errors.re_new_password &&
              touched.re_new_password &&
              errors.re_new_password
            }
            label="新しいパスワード"
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
      </span>
    );
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({
    current_password: "",
    new_password: "",
    re_new_password: ""
  }),
  validationSchema: Yup.object().shape({
    current_password: Yup.string()
      .min(6, "このフィールドは6文字以上である必要があります")
      .required("この項目は必須です"),
    new_password: Yup.string()
      .min(8, "パスワードは8文字以上である必要があります")
      .required("新しいパスワードが必要です"),
    re_new_password: Yup.string()
      .oneOf([Yup.ref("新しいパスワード"), null], "パスワードが一致しません")
      .required("パスワードの確認が必要です")
  }),
  handleSubmit: (
    { current_password, new_password, re_new_password },
    { props, setSubmitting, setErrors, resetForm }
  ) => {
    props
      .changePassword({ current_password, new_password, re_new_password })
      .then(() => window.scrollTo(0, 0))
      .then(() => resetForm());
    setSubmitting(false);
  },
  displayName: "パスワードを変更" //hlps with react devtools
})(InnerPwForm);

export const ChangePassword = withStyles(styles)(EnhancedForm);
