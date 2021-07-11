import { useContext } from "react";
import { examContainerContext } from "./Exam";
import InputWithLabel from "../../../common/InputWithLabel";
export default function Question({ dataItem }) {
  // get context
  const contextExam = useContext(examContainerContext);

  // Hàm trả về id những câu đã được chọn
  const activeAnswer = contextExam.selectedRadio.map((i) => i.answer_id);
  return (
    <div>
      <ul className="exam">
        <h4>{dataItem.name}:</h4>
        <p>{dataItem.content}</p>
        {dataItem.answers.map((i) => (
          <InputWithLabel
            htmlFor={`id${i.answer_id}`}
            classNameLable="exam__result"
            key={`result${i.answer_id}`}
            idInput={`id${i.answer_id}`}
            nameInput={dataItem.id}
            type="radio"
            defaultChecked={activeAnswer.includes(i.answer_id)}
            onChangeInput={() => contextExam.handleChangeResult(i)}
            spanText={i.content_answer}
          />
        ))}
      </ul>
    </div>
  );
}
