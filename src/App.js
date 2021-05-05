import React, {useEffect, useState} from "react";
import './App.css';
import {SetCard, Sheet} from "./SetCard";
import {cleanHistory, collections} from "./problems";
import {SetError} from "./error";
import {random} from "./utils";

const BASE_PATH = "/problems";

export function getNameFromPath(path) {
  let pathComponents = path.split("/");
  return pathComponents[pathComponents.length - 1];
}

function Choice({name, onClick}) {
  return (
    <button className="Choice navigator-button" onClick={onClick}>
      <span>{name}</span>
      <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

function Folder({name, contents, newSet, path}) {
  const [open, setOpen] = useState(false);
  return <>
    <button className="Folder__button navigator-button" onClick={() => setOpen(!open)}>
      <svg className={open ? "open" : ""} width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
      <span>{name}</span>
    </button>
    <div className={"Folder__items" + (open ? " open" : "")}>
      <Chooser items={contents} newSet={newSet} path={path}/>
    </div>
  </>;
}

function Chooser({items, newSet, path}) {
  if (path === undefined) {
    path = "";
  } else {
    path += "/";
  }
  return (
    <div className="Chooser">
      {Object.entries(items).map(([name, contents], index) => (
        name[0] === "_" ?
        <Folder name={name.slice(1)} contents={contents} key={index} newSet={newSet} path={path + name}/> :
        <Choice name={name} contents={contents} key={index} onClick={() => newSet(path + name)} />
      ))}
    </div>
  );
}

function encodeData(seed, mode) {
  // Converts to a base-36 string
  return mode.toString() + seed.toString(36);
}
function decodeData(str) {
  return [parseInt(str.slice(1), 36), parseInt(str[0])];
}
// URL Format:
// home: `https://aderhall.github.io/${BASE_PATH}
// specific questions: `https://aderhall.github.io/${BASE_PATH}#!${name}/${data}`
function getRouteFromUrl() {
  let urlComponents = window.location.href.split("#!").filter(x => x !== "");
  if (urlComponents.length === 1) {
    return [null];
  }
  let fragments = urlComponents[1].split("/");
  try {
    let path = fragments.slice(0, fragments.length-1).map(decodeURIComponent).join("/");
    let [seed, mode] = decodeData(fragments[fragments.length - 1]);
    updateDocTitle(path, mode);
    return [path, seed, mode];
  } catch {
    console.error("Couldn't resolve url data fragment, redirecting to home.");
    navigateToRoute([null]);
    return [null];
  }
}
function navigateToRoute(route) {
  const [path, seed, mode] = route;
  if (path !== null) {
    window.history.pushState(route, "", `${BASE_PATH}#!${path}/${encodeData(seed, mode)}`);
    updateDocTitle(path, mode);
  } else {
    window.history.pushState(null, "", `${BASE_PATH}`);
    document.title = "Adrian's endless source of problems";
  }
}
function updateDocTitle(path, mode) {
  document.title = `${getNameFromPath(path)}${mode === 0 ? "" : ` (${mode === 1 ? "worksheet" : "answers"})`} | Adrian's endless source of problems`;
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
    navigateToRoute(route);
    setRoute(route);
  }
  const newSet = path => {
    let seed = random.newRandomSeed();
    goto([path, seed, 0]);
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
          <Chooser newSet={newSet} items={collections}/> : 
          <>
            <nav className="no-print">
              <button className="link-button" onClick={() => window.history.back()}>
                <svg width="15px" height="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back
              </button>
              <button className="link-button" onClick={() => goto([null])}>
                <svg width="15px" height="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home
              </button>
            </nav>
            <SetError>
              {route[2] === 0 ? 
                <SetCard route={route} newSet={newSet} goto={goto} /> :
                <Sheet route={route} printPage={printPage} />
              }
            </SetError>
          </>
        }
      </main>
    </div>
  );
}

export default App;


/* TODO:
  * √ Generate problems in app, not setcard
  * √ Menu option to reload each problem
  * √ Client-side routing
  * √ Menu options to generate question and answer sheets
  * √ Deploy to gh-pages
  * √ Seeded PRNG with seed in url fragment
  * X PDF download
  * √ Katex
  * √ Remove coefficient of 1 in formatTerm
  * √ Reload button easier to access
  * √ Error boundaries
  * √ Lazy loading problems
  * √ Folders and subfolders
  * Make noprint work more universally
  * Customize number of problems in a worksheet, store this in URL
  * Some way to limit problems that have already come up?
  * SVG Diagrams
  * Help page documentation
*/