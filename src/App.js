import React, {useEffect, useState} from "react";
import './App.css';
import {SetCard, Sheet} from "./SetCard";
import {cleanHistory, collections, newProblemData} from "./problems";

const BASE_PATH = "/problems";

function Choice({name, onClick}) {
  return (
    <button className="Choice" onClick={onClick}>
      <span>{name}</span>
      <svg width="24px" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

function Chooser({newSet}) {
  return (
    <div className="Chooser">
      {Object.entries(collections).map(([name, _topics], index) => (
        <Choice name={name} key={index} onClick={() => newSet(name)} />
      ))}
    </div>
  );
}

function encodeObj(obj) {
  return encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(obj)))));
}
function decodeObj(str) {
  return JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(str)))));
}
function getRouteFromUrl() {
  let path = window.location.href.split("#").filter(x => x !== "");
  if (path.length === 1) {
    return [null];
  }
  return decodeObj(path[1])
}

function App() {
  const [route, setRoute] = useState(getRouteFromUrl());
  useEffect(() => {
    const handleBack = () => {
      setRoute(getRouteFromUrl());
    }
    window.addEventListener("popstate", handleBack);
    return () => {
      window.removeEventListener("popstate", handleBack);
    }
  });
  cleanHistory();
  const goto = route => {
    // eslint-disable-next-line no-unused-vars
    const [name, _problemList, _idList, mode] = route;
    if (name !== null) {
      window.history.pushState(route, "", `${BASE_PATH}#${encodeObj(route)}`);
      document.title = `${name}${mode === 0 ? "" : ` (${mode === 1 ? "worksheet" : "answers"})`} | Adrian's endless source of problems`;
    } else {
      window.history.pushState(null, "", `${BASE_PATH}`);
      document.title = "Adrian's endless source of problems";
    }
    setRoute(route)
  }
  const newSet = name => {
    let problemList = [];
    let idList = [];
    let id;
    for (let i = 0; i < 5; i++) {
      // Random problem id from the collection topics list
      id = collections[name][Math.floor(Math.random() * collections[name].length)];
      problemList.push(newProblemData(id));
      idList.push(id);
    }
    goto([name, problemList, idList, 0]);
  }
  
  const [printMode, setPrintMode] = useState(false);
  const printPage = () => {
    setPrintMode(true);
  }
  useEffect(() => {
    if (printMode) {
      window.print();
      setPrintMode(false);
    }
  }, [printMode]);
  
  return (
    <div className={"App" + (printMode ? " print" : "")}>
      <header className="App__header no-print">
        <h1>Adrian's endless source of problems</h1>
      </header>
      <main>
        {route[0] === null ? 
          <Chooser newSet={newSet} /> : 
          <>
            <nav className="no-print">
              <button className="link-button" onClick={() => window.history.back()}>
                <svg width="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back
              </button>
              <button className="link-button" onClick={() => goto([null])}>
                <svg width="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home
              </button>
            </nav>
            {route[3] === 0 ? 
              <SetCard route={route} newSet={newSet} goto={goto} /> :
              <Sheet route={route} printPage={printPage} />
            }
          </>
        }
      </main>
    </div>
  );
}

export default App;


/* TODO:
  * Mathjax
  * SVG Diagrams
  * √ Client side routing
  * Help page documentation
  * √ Generate problems in app, not setcard
  * √ Menu option to reload each problem
  * √ Menu options to generate question and answer sheets
  * √ Deploy to gh-pages
  * PDF download
*/