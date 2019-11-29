import React, { Component } from 'react';
import Header from '../../components/Header/header';

export default class gerenciamento_produtos extends Component {

    constructor() {

        super();

        this.state = {

            listarProduto: [],
            listarOferta :[]
        }

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
    }

    componentDidUpdate() {
        console.log("Pagina atualizada")
    }


    render() {
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
                        <a class="cad" href="AdicionarProduto.html">
                            Cadastrar Produto
                        <div class="icon-cad">
                                <i class="fas fa-hamburger"></i>
                                +
                        </div>
                        </a>
                        <a class="cad" href="AdicionarProduto.html">
                            Cadastrar Categoria
                        <div class="icon-cad">
                                <i class="fas fa-bars"></i>
                                +
                        </div>
                        </a>
                    </div>

                    <section class="container sessao-produtos">

                        {/* {
                            this.state.listaOfertaAtualizada.map(
                                function (Oferta) {
                                    return (
                                        <a  key={Oferta.idOferta} class ="card-item">

                                            <div class="header-card">
                                                <span class="uk-label uk-label-success .uk-position-right">{Oferta.data_vencimento}</span>
                                                <img src="img/produtos/Suco-de-Uva-Maguary-Selecao-Tinto-15l.png" alt="" />
                                                <div class="avaliacao">
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star unchecked"></span>
                                                    <span class="fa fa-star unchecked"></span>
                                                </div>
                                            </div>

                                            <div class="main-card">
                                                <p></p>
                                                <p class="preco"> <span class="local"> - Mercado Sol</span></p>
                                            </div>

                                            <div class="footer-card">
                                                <button class="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom">Adicionar a Reserva&nbsp;&nbsp;<span uk-icon="tag"></span></button>
                                            </div>

                                        </a>
                                        

                                )
                                }
                            )
                        } */}


                        {/* <a key={Oferta.idOferta} class="card-item">

                            <div class="header-card">
                                <span class="uk-label uk-label-success .uk-position-right">Vence em 30 dias</span>
                                <img src="img/produtos/9320814968862.jpg    " alt="" />
                                <div class="avaliacao">
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star unchecked"></span>
                                    <span class="fa fa-star unchecked"></span>
                                </div>
                            </div>

                            <div class="main-card">
                                <p>{Oferta.nomeOferta}</p>
                                <p class="preco">R$2,43<span class="local"> - Mercado Extra</span></p>
                            </div>

                            <div class="footer-card">
                                <button class="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom">Adicionar a Reserva&nbsp;&nbsp;<span uk-icon="tag"></span></button>
                            </div>

                        </a> */}

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