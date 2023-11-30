function compararJsons(json1, json2) {
    // Criar um mapa para facilitar a comparação
    const mapaJson1 = new Map(json1.map(item => [item.nome, item.qtd]));
  
    // Iterar sobre o segundo JSON e subtrair os valores
    for (const item of json2) {
      const nome = item.nome;
      const qtdJson1 = mapaJson1.get(nome);
  
      if (qtdJson1 === undefined || typeof qtdJson1 !== 'number' || qtdJson1 - item.qtd < 0) {
        return "false";
      }
      // Atualizar a quantidade no mapa para refletir a subtração
      mapaJson1.set(nome, qtdJson1 - item.qtd);
    }
    return "true";
  }
  
  // Exemplo de uso
  const json1 = [{"nome": "banana", "qtd": 10, "vlrunit": 5}, {"nome": "maça", "qtd": 10, "vlrunit": 5}];
  const json2 = [{"nome": "uva", "qtd": 10, "vlrunit": 5}, {"nome": "maça", "qtd": 11, "vlrunit": 5}];
  
  const resultado = compararJsons(json1, json2);
  