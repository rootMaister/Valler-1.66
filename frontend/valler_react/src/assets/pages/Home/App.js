import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

import Header from '../../components/Header/header.js';
import api from '../../services/api';

export default class App extends Component{

  constructor(){
    super();

    this.state = {
      listaOfertas: [],
      
    }
  }



  componentDidMount(){
    this.getOfertas();
    console.log("Carregou")
  }

  getOfertas = () =>{
    api.get('/Oferta')
    .then(response => {
      if(response.status === 200){
        this.setState({listaOfertas: response.data}, () => console.log(this.state.listaOfertas))
      }
    })
  }

  render(){
    return (
      <>
        <Header/>

        <Button  variant="primary">
            Teste
          </Button>
      </>
    );
  }
}

