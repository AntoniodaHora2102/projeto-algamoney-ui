//irá representa pessoa
export class Pessoa {
  codigo: number;
  nome: string;
  endereco = new Endereco();
  ativo = true;
}

export class Endereco {
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string;
  estado: string;

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
