import React, {useState} from "react";
import "./SetCard.css";
import {problems} from "./problems";
import OutsideClickDetector from "./OutsideClickDetector";

function LineBreakP(props) {
  return <p {...props}>
    {props.children.split(/(?:\r\n|\r|\n)/).map((item, index) => (
      <React.Fragment key={index}>
        {item}
        <br />
      </React.Fragment>
    ))}
  </p>
}

function DotsMenu(props) {
  const [open, setOpen] = useState(false);
  
  return <OutsideClickDetector className="DotsMenu" onClickOutside={() => setOpen(false)} active={open}>
    <button className="DotsMenu__button" onClick={() => setOpen(!open)}>
      <svg width="24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg>
    </button>
    <ul className={"DotsMenu__popup" + (open ? " open" : "")}>
      {props.items.map((item, index) => (
        <li key={index}><button onClick={() => {item[1](); setOpen(false);}}>{item[0]}</button></li>
      ))}
    </ul>
  </OutsideClickDetector>
}

function SetItem({problem}) {
  const [answerVisible, setAnswerVisible] = useState(false);
  const [expVisible, setExpVisible] = useState(false);
  return (
    <li>
      <LineBreakP className="SetItem__question">{problem.question}</LineBreakP>
      <button className="link-button" onClick={() => setAnswerVisible(!answerVisible)}>
        {answerVisible ? "Hide answer" : "Show answer"}
      </button>
      <div className={"SetItem__answer-section" + (answerVisible ? " open" : "")}>
        <LineBreakP className="SetItem__answer">{problem.answer}</LineBreakP>
        {problem.explanation && <>
          <button className="link-button" onClick={() => setExpVisible(!expVisible)}>
            {expVisible ? "Hide explanation" : "Show explanation"}
          </button>
          <LineBreakP className={"SetItem__explanation" + (expVisible ? " open" : "")}>
            {problem.explanation}
          </LineBreakP>
        </>}
      </div>
    </li>
  );
}

function SetCard({route, newSet, goto}) {
  const [name, problemList, idList] = route;
  return (
    <div className="SetCard">
      <div className="SetCard__header">
        <h2>{name}</h2>
        <DotsMenu items={[
          ["Export worksheet", () => goto([name, problemList, idList, 1])],
          ["Export answer sheet", () => goto([name, problemList, idList, 2])],
          ["Reload all problems", () => newSet(name)],
          ["I'm bored", () => console.log("d t")]
        ]}/>
      </div>
      <hr />
      <ol className="SetCard__list">
        {problemList.map((problemData, index) => {
          let problem = problems[idList[index]].format(problemData);
          return <SetItem key={problem.question} problem={problem}/>
        })}
      </ol>
    </div>
  );
}

function Sheet({route}) {
  const [name, problemList, idList, mode] = route;
  return (
    <div className="SetCard">
      <div className="SetCard__header">
        <h2>{name}</h2>
        <button className="link-button">Print</button>
      </div>
      <hr />
      <ol className="SetCard__list">
        {problemList.map((problemData, index) => {
          let problem = problems[idList[index]].format(problemData);
          let data;
          switch (mode) {
            case 1:
              data = problem.question;
              break;
            case 2:
              data = problem.answer;
              break;
            case 3:
              if (problem.explanation) {
                data = `${problem.answer}\n\n${problem.explanation}`;
              } else {
                data = problem.answer;
              }
              break;
            default:
              break;
          }
          return <li key={data}>
            <LineBreakP>{data}</LineBreakP>
          </li>
        })}
      </ol>
    </div>
  );
}

export {SetCard, Sheet};