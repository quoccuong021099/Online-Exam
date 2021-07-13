import { makeStyles } from "@material-ui/core/styles";

export const useButton = makeStyles({
  Button: {
    backgroundColor: "#fff",
    color: "#000",
    fontWeight: "400",
    fontSize: "20px",
    width: "300px",
    "&:hover": {
      backgroundColor: "orange",
      color: "#fff",
    },
  },
});
