using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Backend.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Controllers;
using System.Linq;

namespace backend.Repositories
{
    public class OfertaRepository : IOferta
    {
        public async Task<Oferta> Alterar(Oferta oferta)
        {
            using(VallerContext _contexto = new VallerContext()){
                _contexto.Entry(oferta).State = EntityState.Modified;
                await _contexto.SaveChangesAsync();
            }
            return oferta;
        }

        public async Task<Oferta> BuscarPorID(int id)
        {
            using(VallerContext _contexto = new VallerContext()){
                return await _contexto.Oferta.Select(
                    o => new Oferta() {
                        IdOferta = o.IdOferta,
                        IdProduto = o.IdProduto,
                        DataOferta = o.DataOferta,
                        DataVencimento = o.DataVencimento,
                        Imagem = o.Imagem,
                        Preco = o.Preco,
                        Quantidade = o.Quantidade,
                        Titulo = o.Titulo,
                        IdProdutoNavigation = o.IdProdutoNavigation,
                    }
                ).FirstOrDefaultAsync(o => o.IdOferta == id);
            }
        }

        public async Task<Oferta> Excluir(Oferta oferta)
        {
            using(VallerContext _contexto = new VallerContext()){
                _contexto.Oferta.Remove(oferta);
                await _contexto.SaveChangesAsync();
                return oferta;
            }
        }

        public async Task<List<Oferta>> Listar()
        {
            using(VallerContext _contexto = new VallerContext()){
                return await _contexto.Oferta.Select(

                    o => new Oferta() {
                        IdOferta = o.IdOferta,
                        IdProduto = o.IdProduto,
                        Titulo = o.Titulo,
                        DataVencimento = o.DataVencimento,
                        DataOferta = o.DataOferta,
                        Preco = o.Preco,
                        Quantidade = o.Quantidade,
                        Imagem = o.Imagem,
                        IdProdutoNavigation = o.IdProdutoNavigation,
                    }
                ).ToListAsync();
            }

        }

        public async Task<Oferta> Salvar(Oferta oferta)
        {
            using(VallerContext _contexto = new VallerContext()){

                await _contexto.AddAsync(oferta);   
                
                await _contexto.SaveChangesAsync();
                return oferta;
            }
        }
    }
}