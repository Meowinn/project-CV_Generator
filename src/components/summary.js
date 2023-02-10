import React, {Component} from 'react';

class Summary extends Component{
    constructor(props){
        super(props);

        this.editSumF = this.editSumF.bind(this);
        this.submitSumF = this.submitSumF.bind(this);
        this.cancelSumF = this.cancelSumF.bind(this);

        this.addWorkExp = this.addWorkExp.bind(this);
        this.saveExpF = this.saveExpF.bind(this);
        this.cancelExpF = this.cancelExpF.bind(this);
        this.deleteExpF = this.deleteExpF.bind(this);

        this.state = {
            newSum: '',
            sumText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae rhoncus velit. Nullam vitae nisi mauris. In quam libero, consectetur at rhoncus eget, sodales ut neque. Nullam congue augue nec viverra gravida. Nunc dapibus ut orci nec rhoncus. Quisque gravida ex nisi, nec pharetra orci tincidunt eu. Sed non neque congue metus tristique gravida eget eget mauris. Phasellus eu nibh non erat congue convallis. Praesent faucibus pretium tellus, id hendrerit libero sagittis id.',
            oldSum: '',
            
            workExps: {
                Exp: '',
            },
            expArray: [],
        }
    }

    editSumF(){
        this.setState({
            oldSum: this.state.sumText,
            newSum: this.state.oldSum,
            sumText: <SummaryForm handleChangeSum={this.handleChangeSumF} submitSum={this.submitSumF} cancelSum={this.cancelSumF} sumPlaceholder={this.state.sumText}/>
        })
        document.querySelector('#editSumbtn').classList.add('hideBtn');
    };

    handleChangeSumF = (e) => {
        this.setState({
            newSum: e.target.value,
        }) 
    };

    submitSumF(e){
        e.preventDefault();

        if(this.state.newSum == ''){
            this.setState({
                sumText: this.state.oldSum,
            })
        }else{
            this.setState({
                oldSum: this.state.newSum,
                sumText: this.state.newSum,
            })   
        }
        document.querySelector('#editSumbtn').classList.remove('hideBtn');
    };

    cancelSumF(){
        this.setState({
            sumText: this.state.oldSum,
        })
        document.querySelector('#editSumbtn').classList.remove('hideBtn');
        console.log('cancelled');
    };

    addWorkExp() {
        console.log('add work exp clicked!');

        this.setState({
            workExps: {
                Exp: <WorkExpForm saveExp={this.saveExpF} cancelExp = {this.cancelExpF}/>
            },
        })
    };

    cancelExpF(){

        this.setState({
            workExps: {
                Exp: null,
            }
        })
    };

    saveExpF(e) {
        e.preventDefault();
        console.log('saved!')

        const jobInput = document.querySelector('#jobInput');
        const companyInput = document.querySelector('#companyInput');
        const dateInput = document.querySelector('#dateInput');
        const descripInput = document.querySelector('#descripInput');

        let allValues = {
            title: jobInput.value,
            company: companyInput.value,
            dates: dateInput.value,
            description: descripInput.value,
        }
        this.setState({

            workExps: {
                Exp: null,
            },
            expArray: this.state.expArray.concat(allValues),
        })
        console.log(this.state.expArray);
    }

    deleteExpF(deleteItem) {

        const newExp = this.state.expArray.filter(otherItem => otherItem !== deleteItem);

        this.setState({
            expArray: newExp,
        })
    }

    render(){
        return(
            <div id='sumWrapper'>
                <div className='sumDiv'>
                    <div className="sumWrapper">
                        <div className='sumHeader'>Summary:</div>
                        <button className='toggleVisual' type='button' onClick={this.editSumF} id='editSumbtn'>Edit</button>
                    </div>
                    <div id='summaryText'>{this.state.sumText}</div>
                </div>
                
                <div className='workExpDiv'>
                    <div id="workWrapper">
                        <div className='workHeader'>Work Experience:</div>
                        <button className='toggleVisual' type='button' onClick={this.addWorkExp}>Add</button>
                    </div>
                    <div>{this.state.workExps.Exp}</div>
                    <ul>
                    {this.state.expArray.map((item, ind) => <Experiences key={ind} deleteExp={() => this.deleteExpF(item)}  expItems= {Object.keys(item).map((keys, i) =>
                        <div key={i}>{item[keys]}</div>)}/> )}
                    </ul>
                </div>
            </div>
        )
    }
};

class SummaryForm extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <form>
                <textarea onChange={this.props.handleChangeSum} id= 'newSummary' cols={80} rows={10} defaultValue={this.props.sumPlaceholder}></textarea>
                <div>
                    <button type='submit' onClick={this.props.submitSum}>Submit</button>
                    <button type='button' onClick={this.props.cancelSum}>Cancel</button>
                    </div>
            </form>
        )
    }
};

class WorkExpForm extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <form id='workExpForm'>
                <div>
                    <label htmlFor='jobInput'>Job Title: </label>
                    <div><input type='text' id='jobInput'></input></div>
                </div>

                <div>
                <label htmlFor='companyInput'>Company: </label>
                    <div><input type='text' id='companyInput'></input></div>
                </div>

                <div>
                <label htmlFor='dateInput'>Date Worked: (MM/YYYY - MM/YYYY) </label>
                    <div><input type='text' id='dateInput'></input></div>
                </div>

                <div>
                <label htmlFor='descripInput'>Description: </label>
                    <div><textarea id='descripInput' cols={80} rows={10} placeholder='your tasks here...'></textarea></div>
                </div>

                <button type='button' onClick={this.props.saveExp}>Save</button>
                <button type='button' onClick={this.props.cancelExp}>Cancel</button>
            </form>
        )
    }
};

class Experiences extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id='experiencesContainer'>
                <div>{this.props.expItems}</div>
                <button className='toggleVisual' id='deleteExpBtn' type='button' onClick={this.props.deleteExp}>Delete</button>
                </div>
        )
    }
};


export default Summary;

