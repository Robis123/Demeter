const secoes = [
  {
    id: 1,
    titulo: "Informe qual seu objetivo nesse aplicativo:",
    entradaTexto: [],
    checkbox: [
      {
        id: 1,
        value: "produtor",
      },
      {
        id: 2,
        value: "varejista",
      },
    ],
  },
  {
    id: 2,
    titulo: "Insira alguns dados básicos: ",
    entradaTexto: [
      {
        id: 1,
        label: "Razão Social",
        placeholder: "Digite o nome da sua empresa",
      },
      {
        id: 2,
        label: "CNPJ",
        placeholder: "Digite o CNPJ",
      },
      {
        id: 3,
        label: "Telefone",
        placeholder: "Digite o Telefone",
      },
    ],
    checkbox: [],
  },
  {
    id: 3,
    titulo: "Insira alguns dados básicos: ",
    entradaTexto: [
      {
        id: 1,
        label: "Endereço",
        placeholder: "Digite seu CEP",
      },
      {
        id: 2,
        label: "Número",
        placeholder: "Digite o Número",
      },
      {
        id: 3,
        label: "Bairro",
        placeholder: "Digite o Bairro",
      },
      {
        id: 4,
        label: "Estado",
        placeholder: "Digite o Estado",
      },
      {
        id: 5,
        label: "Cidade",
        placeholder: "Digite a Cidade",
      },
      {
        id: 6,
        label: "CEP",
        placeholder: "Digite o CEP",
      },
    ],
    checkbox: [],
  },
];

export { secoes };
