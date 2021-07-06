import { useContext } from "react";
import Input from "../../../common/Input";
import { examContainerContext } from "./Exam";
export default function Question({ dataItem }) {
  // get context
  const contextExam = useContext(examContainerContext);

  const activeAnswer = contextExam.selectedRadio.map((i) => i.answer_id);
  return (
    <div>
      <ul className="exam">
        <h4>{dataItem.name}:</h4>
        <p>{dataItem.content}</p>
        {dataItem.answers.map((i) => (
          <label
            htmlFor={`id${i.answer_id}`}
            className="exam__result"
            key={`result${i.answer_id}`}
          >
            <Input
              id={`id${i.answer_id}`}
              name={dataItem.id}
              type="radio"
              defaultChecked={activeAnswer.includes(i.answer_id)}
              onChange={() => contextExam.handleChangeResult(i)}
            />
            <label htmlFor={`id${i.answer_id}`}>{i.content_answer}</label>
          </label>
        ))}
      </ul>
    </div>
  );
}
