import React,{Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import CreateAmeme from './Components/CreateAmeme';
import MemeList from './Components/MemeList';
import axios from "./Services/axios";


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        Memes:[],
        loading: false,
    }
  }

  async componentDidMount() {
    this.update();
  }
  update = async () => {

    console.log("update called");
   await axios.get("/memes")
    .then((response) =>{
      this.setState({
        Memes:response.data
      })
    })
    .catch( (error) => { 
      console.log(error.response)
    });
 
  }

  render(){
    return (
      <div className="App">
        <div className="form-div">
          <h1>XMEME</h1>
          <CreateAmeme Update = {this.update} />
        </div>
        <div className ="memes-div"> 
          <MemeList Memes = {this.state.Memes} />
        </div>
      </div>
    )
  }
}

export default App;
