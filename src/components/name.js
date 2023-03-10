import React, { useState } from 'react';

const Name = () => {

  const [fullName, setfullName] = useState({
    nameS: 'Your',
    lname: 'Name'
  });

  const [contacts, setContacts] = useState({
    phoneNum: '123-456-789',
    emailAdd: 'totallyrealemail@foo.com'
  });

  const [hobbies, setHobbies] = useState(<DefaultHobbies />);

  const [listItem, setListItem] = useState([]);

  function nameEditF() {

    setfullName({
      nameS: <NameForm nameSubmit={nameSubmitF} namePlaceholder={fullName.nameS} lastPlaceholder={fullName.lname} />,
    })

    document.querySelector('#nameEditBtn').classList.add('hideBtn');
  };

  function contactEditF() {
    console.log('Edit has been clicked!')

    setContacts({
      phoneNum: <ContactForm contactSubmitF={contactSubmitF} contactPlaceholder={contacts.phoneNum} emailPlaceholder={contacts.emailAdd} />
    })

    document.querySelector('#contactEditBtn').classList.add('hideBtn');
  };

  function interestEditF() {

    setHobbies(
      <InterestForm interestAdd={interestAddF} clearInterest={clearInterestF} />
    )
  }

  function nameSubmitF(e) {
    e.preventDefault();
    console.log('Submitted!');

    setfullName({
      nameS: document.querySelector('#nameInput').value,
      lname: document.querySelector('#lastInput').value
    })

    document.querySelector('#nameEditBtn').classList.remove('hideBtn');
  };

  function contactSubmitF(e) {
    e.preventDefault();
    console.log('Submitted');

    setContacts({
      phoneNum: document.querySelector('#phoneInput').value,
      emailAdd: document.querySelector('#emailInput').value,
    })
    document.querySelector('#contactEditBtn').classList.remove('hideBtn');
  };

  function interestAddF(e) {
    e.preventDefault();
    console.log('interestAdded!');

    setHobbies('');
    setListItem(listItem.concat(document.querySelector('#interestInput').value));
  };

  function clearInterestF(deleteItem) {
    const newItems = listItem.filter((item => item !== deleteItem));

    setListItem(newItems);
    console.log(newItems);
  };

  return (
    <div id='personDetailsWrapper'>
      <div className='nameDiv'>
        <div className="fullName">{fullName.nameS} {fullName.lname}</div>
        <div><button className='toggleVisual' id='nameEditBtn' type='button' onClick={nameEditF}>Edit</button></div>
      </div>

      <div className='ContactsDiv'>
        <div className="contactWrapper">
          <div className='contactHeader'>Contact:</div>
          <button className='toggleVisual' type='button' id='contactEditBtn' onClick={contactEditF}>Edit</button>
        </div>
        <div>
          <div>{contacts.phoneNum}</div>
          <div>{contacts.emailAdd}</div>
        </div>
      </div>

      <div className='InterestDiv'>
        <div className="interestWrapper">
          <div className='interestHeader'>Interests:</div>
          <button type='button' className='toggleVisual' onClick={interestEditF}>Edit</button>
        </div>
        <div>{hobbies}</div>
        <ul>
          {listItem.map((item, i) =>
            <li id="interestItem" key={i}>{`${item} `}<button className='toggleVisual' type='button' onClick={() => clearInterestF(item)}>Delete</button></li>)}
        </ul>
      </div>
    </div>

  )
};
const NameForm = (props) => {
  return (
    <div className='nameForm'>
      <form>
        <label htmlFor="nameInput">First Name:</label>
        <div><input type="text" id='nameInput' defaultValue={props.namePlaceholder} ></input></div>
        <label htmlFor="lastInput">Last Name:</label>
        <div><input type="text" id='lastInput' defaultValue={props.lastPlaceholder}></input></div>
        <button type='submit' onClick={props.nameSubmit}>Submit</button>
      </form>
    </div>
  )
};

const ContactForm = (props) => {
  return (
    <div>
      <form className='contactForm'>
        <label htmlFor="phoneInput">Phone Number:</label>
        <div><input type="text" id='phoneInput' defaultValue={props.contactPlaceholder} ></input></div>
        <label htmlFor="emailInput">Email Address:</label>
        <div><input type="email" id='emailInput' defaultValue={props.emailPlaceholder}></input></div>
        <button type='submit' onClick={props.contactSubmitF}>Submit</button>
      </form>
    </div>
  )
};

const InterestForm = (props) => {
  return (
    <div>
      <form>
        <label htmlFor='interestInput'></label>
        <div><input type='text' id='interestInput' placeholder='example: cooking'></input></div>
        <div id='interestAddBtn'><button type='submit' onClick={props.interestAdd}>Add</button></div>

      </form>
    </div>
  )
};

const DefaultHobbies = () => {
  return (
    <ul>
      <li>put</li>
      <li>your</li>
      <li>hobbies</li>
      <li>here</li>
    </ul>
  )
}

export default Name;