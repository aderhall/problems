import React, {useState} from "react";
import "./SetCard.css";
import {collections, newProblem, honeypotHistory, random} from "./problems";
import OutsideClickDetector from "./OutsideClickDetector";

function DotsMenu(props) {
  const [open, setOpen] = useState(false);
  
  return <OutsideClickDetector className="DotsMenu" onClickOutside={() => setOpen(false)} active={open}>
    <button className="DotsMenu__button" onClick={() => setOpen(!open)} aria-label="Actions Menu">
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
      <div className="SetItem__question">{problem.question}</div>
      <button className="link-button" onClick={() => setAnswerVisible(!answerVisible)}>
        {answerVisible ? "Hide answer" : "Show answer"}
      </button>
      <div className={"SetItem__answer-section" + (answerVisible ? " open" : "")}>
        <div className="SetItem__answer">{problem.answer}</div>
        {problem.explanation && <>
          <button className="link-button" onClick={() => setExpVisible(!expVisible)}>
            {expVisible ? "Hide explanation" : "Show explanation"}
          </button>
          <div className={"SetItem__explanation" + (expVisible ? " open" : "")}>
            {problem.explanation}
          </div>
        </>}
      </div>
    </li>
  );
}

function getProblems(route) {
  const [name, seed] = route;
  let problemList = [];
  let id;
  let restoreHistory;
  restoreHistory = honeypotHistory();
  random.initialize(seed);
  for (let i = 0; i < 5; i++) {
    // Random problem id from the collection topics list
    id = collections[name][Math.floor(random.random() * collections[name].length)];
    problemList.push(newProblem(id));
  }
  restoreHistory();
  return problemList;
}

function SetCard({route, newSet, goto}) {
  const [name, seed] = route;
  let problemList = getProblems(route);
  return (
    <div className="SetCard">
      <div className="SetCard__header">
        <h2>{name}</h2>
        <DotsMenu items={[
          ["Export worksheet", () => goto([name, seed, 1])],
          ["Export answer sheet", () => goto([name, seed, 2])],
          ["Export answers and explanations", () => goto([name, seed, 3])],
          ["Reload all problems", () => newSet(name)]
        ]}/>
      </div>
      <hr />
      <ol className="SetCard__list">
        {problemList.map((problem, index) => {
          return <SetItem key={index} problem={problem}/>
        })}
      </ol>
    </div>
  );
}

function Sheet({route, printPage}) {
  // eslint-disable-next-line no-unused-vars
  const [name, _seed, mode] = route;
  let problemList = getProblems(route);
  return (
    <div className="SetCard">
      <div className="SetCard__header">
        <h2>{name}</h2>
        <button className="link-button no-print" onClick={() => printPage()}>Print</button>
      </div>
      <hr />
      <ol className="SetCard__list">
        {problemList.map((problem, index) => {
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
              throw new Error(`Unrecognized mode: ${mode}`);
          }
          return <li key={index}>
            <div>{data}</div>
          </li>
        })}
      </ol>
    </div>
  );
}

export {SetCard, Sheet};