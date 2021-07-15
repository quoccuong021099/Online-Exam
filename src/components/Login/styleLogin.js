import { makeStyles } from "@material-ui/core";

export const useStyleLogin = makeStyles((theme) => ({
  form: {
    width: "70%",
    color: "#000",
    border: "1px solid #e1e1e1",
    borderRadius: " 10px",
    margin: "50px auto",
    padding: "20px",
  },
  BtnFb: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
  },
  h2: {
    fontSize: "30px",
    lineHeight: "40px",
    fontWeight: "400",
    color: theme.palette.common.black,
    textAlign: "center",
    userSelect: "none",
  },
  loginOr: {
    width: "100%",
    position: "relative",
  },
  h5: {
    position: "absolute",
    top: "5px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "50px",
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    textAlign: "center",
  },
  signup: {
    textAlign: "right",
    fontFamily: '"Nunito", sans-serif',
  },
  a: {
    display: "inline-block",
    lineHeight: "1.1",
    fontWeight: "600",
    color: "#2d5dcf",
    marginRight: "20px",
    marginTop: "20px",
    userSelect: "none",
  },
  groupForm: {
    padding: "20px",
    position: "relative",
    display: "flex",
    justifyContent: " space-between",
  },
  firstname: {
    flexBasis: "220px",
  },

  lastname: {
    flexBasis: "380px",
  },

  placeholerName: {
    marginLeft: "210px",
  },
}));
