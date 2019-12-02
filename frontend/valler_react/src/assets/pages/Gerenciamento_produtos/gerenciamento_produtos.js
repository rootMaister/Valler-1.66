import React, { Component } from 'react';
import Header from '../../components/Header/header';
import bootstrap, { ModalBody } from 'react-bootstrap'
import {Button, Modal} from 'react-bootstrap';
import { MDBInput } from "mdbreact";
import api from '../../services/api';

export default class gerenciamento_produtos extends Component {
    
    
    
    
    constructor() {
        
        super();
        
        this.state = {


            // States dos Modais
            modalProduto: false,
            modalOferta: false,
            show: false,

            // States de Get da Página
            listarProduto: [],
            listarOferta :[],

            // States de Get de /categorias
            puxaCategorias: [],

            // States de Cadastro de Produto 
            postProduto: {
                nomeProduto: "",
                descricao: "",
                categoria1: ""
            }


        }
    }
    
    

    puxaCategorias=()=>{
        api.get("/categoria")
        .then(data => {
            this.setState({puxaCategorias : data.data})
            console.log("Lista de Categorias puxadas", data.data)
        })
    }

    

    

    //DELETE -- Oferta

    deletarOferta = (id) => {

        console.log("Excluindo");

    fetch("http://localhost:5000/api/oferta/" + id , {
        method : "DELETE" ,
        headers : {
            "Content-Type" : "application/json"
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        this.listarOferta();
        this.setState( () => ({ lista: this.state.lista }));
    })
    .catch(error => console.log(error))
    
    }

    // POST (CADASTRAR) -- Produto

    cadastrarProduto=(c)=>{
        api.post('/produto', this.state.cadastrarProduto)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
            this.setState({erroMsg: "Não foi possível cadastrar esse produto"});
        })

        setTimeout(() => {
            this.listaAtualizada();
        }, 1200);
    }


    listaAtualizada = () => {
        fetch("http://localhost:5000/api/Produto")
            .then(response => response.json())
            .then(data => this.setState({ listarProduto: data })
                , console.log(this.listarProdutos));

    }

    listaOfertaAtualizada = () => {
        fetch("http://localhost:5000/api/Oferta")
        .then(response => response.json())
        .then(data => this.setState({ listarOferta:data })
            , console.log(this.listarOferta));
    }

    componentDidMount() {
        console.log("Página carregada")
        this.listaAtualizada();
        this.listaOfertaAtualizada();
        this.puxaCategorias();
    }

    componentDidUpdate() {
        console.log("Pagina atualizada")
    }


    abrirModalProduto =()=> {

        this.toggleProduto();
    }

    abrirModalOferta =()=> {

        this.toggleOferta();
    }


    toggleProduto = () => {
        this.setState({
            modalProduto: !this.state.modalProduto
        });

    }

    toggleOferta = () => {
        this.setState({
            modalOferta: !this.state.modalOferta
        });

    }

    atualizaEstado = (input) => {
        this.setState({ [input.target.name] : input.target.value})
    }
   

    render(){



        return (
            <div>
                <Header />

                <main>

                    <div class="search-cat">
                        <div class="barra_pesquisa-mobile">
                            <i class="fas fa-search"></i>
                            <label for="pesquisa-produtos-cadastrados">
                                <input type="search" id="pesquisa-produtos-cadastrados" name=""
                                    placeholder=" Buscar por # ou Título" />
                            </label>
                        </div>
                        <a href="#"><i class="fas fa-bars"></i>categorias</a>
                    </div>


                    <table>
                        {
                            this.state.listarProduto .map(
                                function (Produto) {
                                    return (
                                        <tr key={Produto.idProduto}>

                                            <td>{Produto.idProduto} ---</td>
                                            <td>{Produto.idCategoria} ----</td>
                                            <td>{Produto.idUsuario} ----</td>
                                            <td>{Produto.nomeProduto}-----</td>
                                            <td>{Produto.descricao}------</td>

                                        </tr>
                                    )
                                }
                            )

                        }
                    </table>


                    <table>
                        {
                            this.state.listarOferta.map(
                                function (Oferta) {
                                    return (
                                        <tr key={Oferta.idOferta}>

                                            <td>{Oferta.idOferta} ---</td>
                                            <td>{Oferta.idProduto} ----</td>
                                            <td>{Oferta.titulo} ----</td>
                                            <td>{Oferta.dataOferta}-----</td>
                                            <td>{Oferta.dataVencimento}------</td>
                                            <td>{Oferta.preco}------</td>
                                            <td>{Oferta.quantidade}------</td>
                                            <td>{Oferta.imagem}------</td>

                                        </tr>
                                    )
                                }
                            )

                        }
                    </table>





                    <div class="cads container">

                        <Button onClick={this.abrirModalProduto}>
                            Cadastrar Produto
                            <div class="icon-cad">
                                    <i class="fas fa-hamburger"></i>
                                    +
                            </div>
                        </Button>

                        <Button onClick={this.abrirModalOferta}>
                                Cadastrar Categoria
                            <div class="icon-cad">
                                    <i class="fas fa-bars"></i>
                                    +
                            </div>
                        </Button>
                    </div>

                    



                    <Modal show={this.state.modalProduto} toggleProduto={this.toggleProduto}>

                        <Modal.Header>
                            Cadastrar Produto
                        </Modal.Header>

                        <Modal.Body show={this.state.modalOferta} toggleOferta={this.toggleOferta}>
                            <MDBInput
                                label="Nome do Produto"
                                id="nomeProduto"
                                name="nomeProduto"
                                value={this.state.cadastrarProduto}
                                size="lg"/>

                            <select onChange={this.atualizaEstado} name="categoriaId" id="option_tipoevento">
                                <option>Escolha uma Categoria</option>
                                {
                                    this.state.puxaCategorias.map(function (listaPuxada){
                                        return(
                                            <>  
                                                <option key={listaPuxada.idCategoria} value={listaPuxada.idCategoria}>{listaPuxada.categoria1}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>

                            <MDBInput label="Descrição: Ex: Coca Cola 2L - Zero" size="lg"/>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">
                                Cadastrar Produto
                            </Button>
                            <Button onClick={this.abrirModalProduto}>
                                Fechar
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <Modal show={this.state.modalOferta} toggleOferta={this.toggleOferta}>
                        <Modal.Header>
                            Teste Oferta
                        </Modal.Header>

                        

                        <Modal.Footer>
                            <Button onClick={this.abrirModalOferta}>
                                Fechar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <section class="container sessao-produtos">

                        <a class="card-item">

                            <div class="header-card">
                                <span class="uk-label uk-label-warning .uk-position-right">Vence em 15 dias</span>
                                <img src="img/produtos/9476860608542.jpg" alt="" />
                                <div class="avaliacao">
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star unchecked"></span>
                                    <span class="fa fa-star unchecked"></span>
                                </div>
                            </div>

                            <div class="main-card">
                                <p>Arroz Branco Camil 5kg</p>
                                <p class="preco">R$4,43<span class="local"> - Mercado Dia</span></p>
                            </div>

                            <div class="footer-card">
                                <button class="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom">Adicionar a Reserva&nbsp;&nbsp;<span uk-icon="tag"></span></button>
                            </div>

                        </a>

                        <a class="card-item">

                            <div class="header-card">
                                <span class="uk-label uk-label-danger .uk-position-right">Vence em 7 dias</span>
                                <img src="img/produtos/Feijao-Preto-Super-Maximo-1kg.png" alt="" />
                                <div class="avaliacao">
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star unchecked"></span>
                                </div>
                            </div>

                            <div class="main-card">
                                <p>Feijão Preto Sabor Máximo - 1kg</p>
                                <p class="preco">R$2,43<span class="local"> - Mercado Extra</span></p>
                            </div>

                            <div class="footer-card">
                                <button class="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom">Adicionar a Reserva&nbsp;&nbsp;<span uk-icon="tag"></span></button>
                            </div>

                        </a>
                    </section>

                </main>
            </div>

        )
    }
}