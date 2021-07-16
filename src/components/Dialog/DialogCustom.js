import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyleDialog = makeStyles(() => ({
  containerDialog: {
    padding: "30px",
  },
  mg: {
    margin: "15px 0 25px",
  },
  containerButon: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

export default function DialogWarning({
  dialogHeader,
  dialogClose,
  dialogContent,
  dialogOnClickSubmit,
  dialogOnClickOther,
  dialogOnClickSubmitContent,
  dialogOnClickOtherContent,
}) {
  const classes = useStyleDialog();

  return (
    <>
      <Dialog open onClose={dialogClose}>
        <Box className={classes.containerDialog}>
          <Typography component="h5" variant="h5" align="center">
            {dialogHeader}
          </Typography>
          <Typography className={classes.mg} align="center" component="p">
            {dialogContent}
          </Typography>
          <Box className={classes.containerButon}>
            {dialogOnClickSubmit && (
              <Button
                variant="contained"
                onClick={dialogOnClickSubmit}
                color="secondary"
              >
                {dialogOnClickSubmitContent}
              </Button>
            )}

            {dialogOnClickOtherContent && (
              <Button
                variant="contained"
                onClick={dialogOnClickOther}
                color="primary"
              >
                {dialogOnClickOtherContent}
              </Button>
            )}
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
