import React, {Component} from 'react';
import Header from '../../components/Header/header';

export default class gerenciamento_produtos extends Component{

    constructor(){
        super();
        this.state = {
            
        }
    }

    componentDidMount(){
        console.log("Página carregada")
    }

    componentDidUpdate(){
        console.log("Pagina atualizada")
    }


        render(){
            return(
                <div>
                    <Header/>
                </div>
        )
    }
}