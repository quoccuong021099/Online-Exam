import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Snackbar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { createStructuredSelector } from "reselect";
import { v4 } from "uuid";
import * as yup from "yup";
import { signupUser } from "../../redux/actions/login";
import { makeSelectError, makeSelectSignup } from "../../redux/selectors/login";
import { useStyleLogin } from "./styleLogin";

// validation
const schema = yup.object().shape({
  firstname: yup
    .string()
    .required("Bạn phải nhập họ!")
    .min(3, "Họ phải từ 3-30 ký tự")
    .max(30, "Họ phải từ 3-30 ký tự"),
  lastname: yup
    .string()
    .required("Bạn phải nhập tên!")
    .min(3, "Tên phải từ 3-30 ký tự")
    .max(30, "Tên phải từ 3-30 ký tự"),
  username: yup
    .string()
    .email("Email không hợp lệ")
    .required("Bạn phải nhập tên đăng nhập!"),
  password: yup
    .string()
    .required("Bạn chưa nhập trường này!")
    .min(3, "Mật khẩu phải từ 3-30 ký tự")
    .max(30, "Mật khẩu phải từ 3-30 ký tự"),
});

function SignUp({ triggerSignup, statusFlags, logs }) {
  const classes = useStyleLogin();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  // use history
  const history = useHistory();

  // use form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // submit form
  const onSubmit = async (data) => {
    data.id = v4();
    await triggerSignup(data);
    if (statusFlags.isSignupSuccess) {
      history.push("/");
    } else {
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="md">
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error">
          {logs.err}
        </Alert>
      </Snackbar>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography component="h2" className={classes.h2}>
          Đăng Ký
        </Typography>
        <Box className={classes.groupForm}>
          <Button
            variant="contained"
            className={classes.BtnFb}
            fullWidth
            size="large"
          >
            ĐĂNG KÝ BẰNG FACEBOOK
          </Button>
        </Box>
        <Box className={classes.loginOr} padding="15px 20px">
          <hr />
          <Typography component="h5" className={classes.h5}>
            hoặc
          </Typography>
        </Box>
        <Box className={classes.groupForm}>
          <Box className={classes.firstname}>
            <TextField
              autoComplete="true"
              label="Họ"
              variant="outlined"
              {...register("firstname")}
              fullWidth
              error={errors.firstname && true}
              helperText={errors.firstname && errors.firstname?.message}
            />
          </Box>
          <Box className={classes.lastname}>
            <TextField
              autoComplete="true"
              label="Tên"
              variant="outlined"
              {...register("lastname")}
              fullWidth
              error={errors.lastname && true}
              helperText={errors.lastname && errors.lastname?.message}
            />
          </Box>
        </Box>
        <Box className={classes.groupForm}>
          <TextField
            autoComplete="true"
            label="Nhập tên đăng nhập/ Email"
            variant="outlined"
            {...register("username")}
            fullWidth
            error={errors.username && true}
            helperText={errors.username && errors.username?.message}
          />
        </Box>
        <Box className={classes.groupForm}>
          <TextField
            label="Nhập mật khẩu"
            variant="outlined"
            {...register("password")}
            fullWidth
            type="password"
            autoComplete="true"
            error={errors.password && true}
            helperText={errors.password && errors.password?.message}
          />
        </Box>
        <Box className={classes.groupForm}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            type="submit"
          >
            ĐĂNG KÝ NGAY
          </Button>
        </Box>
        <Typography component="p" className={classes.signup}>
          Khi bấm Đăng ký, bạn đã đồng ý với{" "}
          <a href="/#" className={classes.a}>
            chính sách của tracnghiem.vn{" "}
          </a>
        </Typography>
      </form>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  statusFlags: makeSelectSignup(),
  logs: makeSelectError(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    triggerSignup: (userInfor) => dispatch(signupUser(userInfor)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
