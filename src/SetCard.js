import React, {useLayoutEffect, useState} from "react";
import "./SetCard.css";
import {getIdList, newProblem, honeypotHistory} from "./problems";
import {random} from "./utils";
import OutsideClickDetector from "./OutsideClickDetector";

function DotsMenu(props) {
  const [open, setOpen] = useState(false);
  
  return <OutsideClickDetector className="DotsMenu" onClickOutside={() => setOpen(false)} active={open}>
    <button className="DotsMenu__button" onClick={() => setOpen(!open)} title="Actions menu" aria-label="Actions menu">
      <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

async function getProblems(route) {
  const [path, seed] = route;
  let idList = await getIdList(path);
  let problemList = [];
  let restoreHistory = honeypotHistory();
  random.initialize(seed);
  for (let i = 0; i < 5; i++) {
    // Random problem id from the collection topics list
    let id = idList[Math.floor(random.random() * idList.length)];
    problemList.push(newProblem(id));
  }
  restoreHistory();
  return problemList;
}

function SetCard({route, newSet, goto}) {
  const [path, seed] = route;
  let pathComponents = path.split("/");
  let name = pathComponents[pathComponents.length - 1];
  let [problemList, setProblemList] = useState(null);
  useLayoutEffect(() => {
    getProblems(route).then(list => setProblemList(list));
  }, [route]);
  return (
    <div className="SetCard">
      <div className="SetCard__header">
        <h2>{name}</h2>
        <div className="SetCard__buttons">
          <button onClick={() => newSet(path)} title="Reload all problems" aria-label="Reload all problems">
            <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <DotsMenu items={[
            ["Export worksheet", () => goto([path, seed, 1])],
            ["Export answer sheet", () => goto([path, seed, 2])],
            ["Export answers and explanations", () => goto([path, seed, 3])],
            ["Reload all problems", () => newSet(path)]
          ]}/>
        </div>
      </div>
      <hr />
      {problemList === null ? 
      <p>Loading problems...</p> :
      <ol className="SetCard__list">
        {problemList.map(problem => {
          return <SetItem key={problem.id} problem={problem}/>
        })}
      </ol>}
    </div>
  );
}

function Sheet({route, printPage}) {
  // eslint-disable-next-line no-unused-vars
  const [path, _seed, mode] = route;
  let pathComponents = path.split("/");
  let name = pathComponents[pathComponents.length - 1];
  let [problemList, setProblemList] = useState(null);
  useLayoutEffect(() => {
    getProblems(route).then(list => setProblemList(list));
  }, [route]);
  return (
    <div className="SetCard">
      <div className="SetCard__header">
        <h2>{name}</h2>
        <button className="link-button no-print" onClick={() => printPage()}>Print</button>
      </div>
      <hr />
      {problemList === null ?
        <p>Loading problems...</p> :
        <ol className="SetCard__list">
          {problemList.map(problem => {
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
                  data = <>
                    {problem.answer}
                    <br/>
                    {problem.explanation}
                  </>
                } else {
                  data = problem.answer;
                }
                break;
              default:
                throw new Error(`Unrecognized mode: ${mode}`);
            }
            return <li key={problem.id}>
              <div>{data}</div>
            </li>
          })}
        </ol>
      }
    </div>
  );
}

export {SetCard, Sheet};