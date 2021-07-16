import "./style.scss";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles({
  Button: {
    backgroundColor: "orange",
    color: "#fff",
    fontWeight: "400",
    fontSize: "20px",
    width: "300px",
    padding: "15px",
    "&:hover": {
      backgroundColor: "orange",
    },
  },
  title: {
    fontSize: "30px",
    fontWeight: "600",
  },
});

export default function ChooseTopic({ handleStart }) {
  // Classes
  const classes = useStyles();

  // get item từ localStorage
  const user = localStorage.getItem("user-info");

  return (
    <Box className="choose-topic">
      <Typography component="h1">Đề thi giữa kỳ, học kỳ</Typography>
      <Typography component="h2" className={classes.title}>
        Đề Trắc Nghiệm Lớp 6
      </Typography>
      <div className="choose-topic__step1">
        <Typography component="h3">B1: Chọn lớp và môn</Typography>
        <Box display="flex" justifyContent="space-between">
          <Box width="49%">
            <FormControl fullWidth>
              <InputLabel id="demo-controlled-open-select-label">
                Lớp
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value="20"
              >
                <MenuItem value={10}>Lớp 6</MenuItem>
                <MenuItem value={20}>Lớp 7</MenuItem>
                <MenuItem value={30}>Lớp 8</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box width="49%">
            <FormControl fullWidth>
              <InputLabel id="demo-controlled-open-select-label">
                Môn thi
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value="20"
              >
                <MenuItem value={10}>Toán</MenuItem>
                <MenuItem value={20}>Lý</MenuItem>
                <MenuItem value={30}>Hóa</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </div>
      <Box className="choose-topic__step2">
        <Typography component="h3">B2: Chọn loại đề</Typography>
        <Box className="choose-topic__step2-exam">
          <Box className="choose-topic__step2-exam-type active">
            <Typography component="h3">Đề thi giữa kỳ, học kỳ</Typography>
            <Typography component="p">50 câu/60'</Typography>
          </Box>
          <Box className="choose-topic__step2-exam-type">
            <Typography component="h3">Đề kiểm tra 1 tiết</Typography>
            <Typography component="p">30 câu/45'</Typography>
          </Box>
          <Box className="choose-topic__step2-exam-type">
            <Typography component="h3">Đề kiểm tra 15 phút</Typography>
            <Typography component="p">10 câu/15'</Typography>
          </Box>
        </Box>
      </Box>
      <Box className="choose-topic__step3">
        <Link to={user ? "/exam" : "/login"}>
          <Button className={classes.Button} size="large" onClick={handleStart}>
            BẮT ĐẦU LÀM BÀI
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
