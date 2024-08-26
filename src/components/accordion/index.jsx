import { useState } from "react";
import data from "./data";
import "./styles.css";
import darkImage from "./dark.png";
import reactLogo from "./react-1.svg";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let copyMultiple = [...multiple];
    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);

    if (findIndexOfCurrentId === -1) {
      copyMultiple.push(getCurrentId);
    } else {
      copyMultiple.splice(findIndexOfCurrentId, 1);
    }
    setMultiple(copyMultiple);
  }

  function isItemOpen(id) {
    return enableMultiSelection ? multiple.indexOf(id) !== -1 : selected === id;
  }

  return (
    <div className="wrapper">
      <a href="https://johnkunleajayi.github.io/" target="_blank" rel="noopener noreferrer">
        <img src={darkImage} alt="Dark Theme" className="dark-image" />
      </a>
      <div className="header">
        <h3 className="heading-part">React</h3>
        <img src={reactLogo} alt="React Logo" className="react-logo" />
        <h3 className="heading-part">FAQ</h3>
      </div>
      <button
        className={enableMultiSelection ? "multi-select-button active" : "multi-select-button"}
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
      >
        {enableMultiSelection ? "Disable Multiple Selection" : "Enable Multiple Selection"}
      </button>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span className="toggle-symbol">
                  {isItemOpen(dataItem.id) ? "-" : "+"}
                </span>
              </div>
              {isItemOpen(dataItem.id) && (
                <div className="content">{dataItem.answer}</div>
              )}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
