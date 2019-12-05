import React, { Component } from 'react';
import Header from '../../components/Header/header';
import bootstrap, { ModalBody, Pagination } from 'react-bootstrap'
import { Button, Modal } from 'react-bootstrap';
import { MDBInput } from "mdbreact";
import api from '../../services/api';
import MaterialTable from 'material-table';

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
            listarOferta: [],


            // States de Get de /categorias
            puxaCategorias: [],

            // States de Cadastro de Produto 
            postProduto: {
                idCategoria: "",
                idUsuario: "",
                nomeProduto: "",
                descricao: "",
            },
        }
    }



    puxaCategorias = () => {
        api.get("/categoria")
            .then(data => {
                this.setState({ puxaCategorias: data.data })

            })
    }



    deletarOferta = (id) => {



        fetch("http://localhost:5000/api/oferta/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.listarOferta();
                this.setState(() => ({ lista: this.state.lista }));
            })
            .catch(error => console.log(error))

    }



    deleteProduto(id) {
        api.delete("/Produto/" + id)
            .then(response => {
                if (response === 200) {
                    console.log("Item deletado")

                    setTimeout(() => {
                        this.listaAtualizada()
                    }, 1500)
                }
            }).catch(error => {
                console.log(error);
            })

    }


    // POST (CADASTRAR) -- Produto

    cadastrarProduto = (c) => {

        c.preventDefault();



        api.post('/produto', this.state.postProduto)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Não foi possível cadastrar esse produto" });
            })

        setTimeout(() => {
            this.listaAtualizada();
        }, 1200);
    }


    cadastrarSetProduto = (input) => {
        this.setState({
            postProduto: {
                ...this.state.postProduto,
                [input.target.name]: input.target.value
            }
        })
    }


    listaAtualizada = () => {
        fetch("http://localhost:5000/api/Produto")
            .then(response => response.json())
            .then(data => this.setState({ listarProduto: data })
                , console.log(this.listarProdutos))

            .then(() => {
                console.log('Minha lista de produto: ', this.state.listarProduto)
            })

    }

    listaOfertaAtualizada = () => {
        fetch("http://localhost:5000/api/Oferta")
            .then(response => response.json())
            .then(data => this.setState({ listarOferta: data })
                , console.log(this.listarOferta));
    }

    componentDidMount() {
        console.log("Página carregada")
        this.listaAtualizada();
        this.puxaCategorias();        
    }

    componentDidUpdate() {

        console.log("Pagina atualizada")
    }


    abrirModalProduto = () => {

        this.toggleProduto();
    }

    abrirModalOferta = () => {

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
        this.setState({ [input.target.name]: input.target.value })
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

                    <div className="container">



                  
                        <MaterialTable

                            title={"Produtos Cadastrados"}

                            columns={[

                                // { title: "ID do produto", field: "ID" },
                                { title: "Nome do produto", field: "name" },
                                { title: "Categoria", field: "categoria1" },
                                { title: "Descrição", field: "descricao" },

                            ]}

                            data={
                                [
                                    ...this.state.listarProduto.map(function (produto) {
                                        return (
                                            {
                                                // ID: produto.idProduto,
                                                name: produto.nomeProduto,
                                                categoria1: produto.idCategoriaNavigation.categoria1,
                                                descricao: produto.descricao,
                                                
                                            }   
                                            
                                            
                                        )
                                    })
                                ]
                            }


                            options={{
                                // selection: true,
                                sorting: true,
                                
                            }}

                            localization={{
                                header: {
                                    actions:"Ações"
                                },
                                body: {
                                    editRow: {
                                        deleteText:"Você deseja excluir esse item ?"
                                    }
                                },
                                pagination: {
                                    labelRowsPerPage:"Linhas por página",
                                    labelRowsSelect: "Linhas por página"
                                },

                            }}

                            

                            

                            editable={{
                                onRowAdd: newData => new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        {
                                            const data = this.state.listarProduto;
                                            data.push(newData);
                                            this.setState({data}, () => resolve ());
                                
                                        }   
                                        resolve()
                                    }, 1000)
                                }),

                                onRowUpdate: (newData, oldData) =>
                                    new Promise ( (resolve, reject) => {
                                        setTimeout (() => {
                                            {
                                                const data = this.state.listarProduto;
                                                const index = data.indexOf(oldData);
                                                data[index] = newData;
                                                this.setState({data}, () => resolve());
                                            }
                                            resolve()
                                        }, 1000)
                                    }),

                                    onRowDelete: oldData => new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            {
                                                let data = this.state.listarProduto;
                                                const index = data.indexOf(oldData);
                                                data.splice(index, 1);
                                                this.setState({data}, () => resolve());
    
                                            }
                                            resolve()

                                            // listaAtualizada = () => {
                                            //     fetch("http://localhost:5000/api/Produto")
                                            //         .then(response => response.json())
                                            //         .then(data => this.setState({ listarProduto: data })
                                            //             , console.log(this.listarProdutos))
                                        
                                            //         .then(() => {
                                            //             console.log('Minha lista de produto: ', this.state.listarProduto)
                                            //         })
                                        
                                            // }
                                        }, 1000)

                                        

                                    })
                                // onRowDelete: api.delete("/Produto/"+ this.state.data)
                                // .then(response => {
                                //     if (response === 200) {
                                //         console.log("Item deletado")
                    
                                //         setTimeout(() => {
                                //             this.listaAtualizada()
                                //         }, 1500)
                                //     }
                                // }).catch(error => {
                                //     console.log(error);
                                // })

                            }}

                            // actions={[
                            //     {
                            //       tooltip: 'Remove All Selected Users',
                            //       icon: 'delete',
                            //     }
                            // ]}


                            
                                // JEITO ERRADO!
                                // DEVEMOS PREENCHER O VALOR DO DATA COM O MAP, NÃO CRIAR UMA PROPRIEDADE 'DATA' PARA CADA OBJETO
                            

                            // {

                            // ...this.state.listarProduto.map(function (produto) {
                            //     return (
                            //         data = {

                            //             name: 'testando',
                            //             surname: 'TEste2',
                            //             birthYear: 'alsdjhas',
                            //             birthCity: 'ldlkadj'

                            //         }
                            //     )
                            // }).bind(this)
                            // }

                        // ]}


                        // {
                        //     ...this.state.listarProduto.map(function(insereValor){
                        //         return(
                        // data={[
                        //         { name: '',
                        //             surname: 'TEste2', 
                        //             birthYear: 'alsdjhas', 
                        //             birthCity: 'ldlkadj'
                        //         }
                        //     ]}
                        //          )
                        //     })
                        // }



                        >
                            
                        
                        
                        </MaterialTable>
                    </div>
                 




                    <Modal show={this.state.modalProduto} toggleProduto={this.toggleProduto}>

                        <Modal.Header>
                            Cadastrar Produto
                        </Modal.Header>

                        <form onSubmit={this.cadastrarProduto}>

                            <Modal.Body show={this.state.modalProduto} toggleOferta={this.toggleProduto}>


                                <MDBInput
                                    label="Nome do Produto"
                                    id="nomeProduto"
                                    name="nomeProduto"
                                    value={this.state.postProduto.nomeProduto}
                                    size="lg"
                                    onChange={this.cadastrarSetProduto.bind(this)} />


                                <select onChange={this.cadastrarSetProduto.bind(this)} value={this.state.postProduto.idCategoria} name="idCategoria" id="idCategoria">
                                    <option>Escolha uma Categoria</option>
                                    {
                                        this.state.puxaCategorias.map(function (listaPuxada) {
                                            return (
                                                <>
                                                    <option key={listaPuxada.idCategoria} value={listaPuxada.idCategoria}>{listaPuxada.categoria1}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>

                                <MDBInput
                                    label="Descrição:"
                                    placeholder="Ex: Coca Cola 2L - Zero"
                                    id="descricao"
                                    name="descricao"
                                    value={this.state.postProduto.descricao}
                                    size="lg"
                                    onChange={this.cadastrarSetProduto.bind(this)} />


                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="submit" onClick={this.abrirModalProduto}>
                                    Cadastrar Produto
                                    </Button>
                                <Button onClick={this.abrirModalProduto}>
                                    Fechar
                                    </Button>
                            </Modal.Footer>

                        </form>
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

                    </section>

                </main>
            </div>

        )
    }
}