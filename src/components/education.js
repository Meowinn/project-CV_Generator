import React, { useState } from "react";

const Education = () => {

    const [educRender, setEducRender] = useState('');
    const [eduArray, setEduArray] = useState([]);

    function addEduc() {
        console.log('add Educ!')

        setEducRender(<EducForm saveForm={saveFormF} cancelForm={cancelFormF} />)
    };

    function cancelFormF() {

        setEducRender(null);
    };

    function saveFormF() {
        console.log('saved education!');

        let totalValue = {
            school: document.querySelector('#schoolInput').value,
            date: document.querySelector('#edateInput').value,
            degree: document.querySelector('#degree').value,
            course: document.querySelector('#courseInput').value,
        };

        setEducRender('');
        setEduArray(eduArray.concat(totalValue))

        console.log(eduArray)
    };

    function removeEducF(deleteItem) {
        console.log('deleted');

        const newEduc = eduArray.filter(currentItem => currentItem !== deleteItem);

        setEduArray(newEduc)
    };

    return (
        <div className="educDiv">
            <div id="educWrapper">
                <div id="educHeader">Education</div>
                <button className='toggleVisual' type="button" onClick={addEduc}>Add</button>
            </div>
            <div>{educRender}</div>
            <ul>
                {eduArray.map((item, i) => <EducationList key={i} removeEduc={() => removeEducF(item)} educItems={Object.keys(item).map((key, i) =>
                    <div key={i}>{item[key]}</div>)} />)}
            </ul>
        </div>
    )

}


const EducForm = (props) => {
    return (
        <form id="educForm">
            <label htmlFor="schoolInput">School:</label>
            <div><input type='text' id="schoolInput"></input></div>

            <label htmlFor="edateInput">Date Attended: (MM/YYYY - MM/YYYY)</label>
            <div><input type='text' id="edateInput"></input></div>

            <label htmlFor="degreeSelect">Degree:</label>
            <div>
                <select id="degree">
                    <option value="none">None</option>
                    <option value="High School or equivalent">High School or equivalent</option>
                    <option value="Associate">Associate</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="Doctorate">Doctorate</option>
                </select>
            </div>

            <label htmlFor="courseInput">Course:</label>
            <div><input type='text' id='courseInput'></input></div>

            <div id="educBtns">
                <button type="button" onClick={props.saveForm}>Save</button>
                <button type="button" onClick={props.cancelForm}>Cancel</button>
            </div>
        </form>
    )
};

const EducationList = (props) => {
    return (
        <div id='educContainer'>
            <div>{props.educItems}</div>
            <button className='toggleVisual' type="button" id="removeEducBtn" onClick={props.removeEduc}>Delete</button>
        </div>
    )
}

export default Education;