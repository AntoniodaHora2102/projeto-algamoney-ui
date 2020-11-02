//irá representa pessoa
export class Pessoa {
  codigo: number;
}

//ira representa categoria
export class Categoria {
  codigo: number;
}

export class Lancamento {

  codigo: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  datapagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();

}
