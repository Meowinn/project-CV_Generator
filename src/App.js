import React, { useState } from 'react';
import './App.css';
import Name from './components/name';
import Summary from './components/summary';
import Education from './components/education';

const App = () => {

  const [toggleButtons, setToggleButtons] = useState(<ShowBtn previewBtn={previewBtnF} />);

  function previewBtnF() {
    console.log('previewed!')

    const allButtons = document.querySelectorAll('.toggleVisual');

    for (const button of allButtons) {
      button.classList.add('hideBtn');
    }
    setToggleButtons(<EditBtn editBtn={editBtnF} />)
  };

  function editBtnF() {
    console.log('edited!')

    const allButtons = document.querySelectorAll('.toggleVisual');
    for (const button of allButtons) {
      button.classList.remove('hideBtn');
    }
    setToggleButtons(<ShowBtn previewBtn={previewBtnF} />)
  };

  return (
    <div>
      <div id='header'>CV Generator</div>
      <div id='previewDiv'>{toggleButtons}</div>
      <div id="mainWrapper">
        <div id='leftWrapper'>
          <Name />
        </div>
        <div id='rightWrapper'>
          <Summary />
          <Education />
        </div>
      </div>
    </div>
  )
};

const ShowBtn = (props) => {
  return (
    <button type='button' onClick={props.previewBtn}>Show Preview</button>
  )
};

const EditBtn = (props) => {
  return (
    <button type='button' onClick={props.editBtn}>Edit Preview</button>
  )
};

export default App;
