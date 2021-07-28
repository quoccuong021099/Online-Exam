import Box from "@material-ui/core/Box";
import React, { useContext } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectChart } from "../../../redux/selectors/chart";
import Oclock from "../../Oclock";
import Spinner from "../../Spinner";
import { mainExam } from "../index";
import Exam from "./Exam";
import "./style.scss";

function MainLeft({ charts }) {
  // context
  const mainExamContext = useContext(mainExam);
  return (
    <Box className="main__left">
      <Box className="main__left-title">
        <Box className="left">
          <h2>Đề thi thử THPT QG năm 2021 môn Toán</h2>
          <p>Trường THPT Yên Dũng số 2 lần 3</p>
        </Box>
      </Box>
      <Box className="main__left-desc">
        <Box className="num-question">
          <span>
            <i className="fas fa-check-square" aria-hidden="true"></i>10 câu
          </span>
        </Box>
        <Box className="num-minutes">
          <span>
            <i className="fas fa-clock" aria-hidden="true"></i>
            10 phút
          </span>
        </Box>
        <Box className="num-attempt">
          <span>
            <i className="fa fa-user" aria-hidden="true"></i>
            {charts?.length} lượt thi
          </span>
        </Box>
      </Box>
      <Oclock />
      {mainExamContext.isLoading ? (
        <Spinner />
      ) : (
        <Box className="main__left-content">
          {mainExamContext.dataTest.length > 0 && <Exam />}
        </Box>
      )}
    </Box>
  );
}
const mapStateToProps = createStructuredSelector({
  charts: makeSelectChart(),
});
export default connect(mapStateToProps, null)(MainLeft);
