import Image1 from "../assets/image1.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import Image4 from "../assets/image4.png";
import Image5 from "../assets/image5.png";
import Image6 from "../assets/image6.png";
import Prod1 from '../assets/prod1.png';
import Prod2 from '../assets/prod2.png';
import Prod3 from '../assets/prod3.png';
import Prod4 from '../assets/prod4.png';
import Prod5 from '../assets/prod5.png';

const secoes = [
  {
    id: 1,
    titulo: "Produtores: ",
    entradaCategoria: [
      {
        id: 1,
        categoria: 'Frutas',
        image: Image1
      },
      {
        id: 2,
        categoria: 'Hortaliças',
        image: Image2
      },
      {
        id: 3,
        categoria: 'Leguminosas',
        image: Image3
      },
      {
        id: 4,
        categoria: 'Cereais',
        image: Image4
      },
      {
        id: 5,
        categoria: 'Adubo',
        image: Image5
      },
      {
        id: 6,
        categoria: 'Mudas',
        image: Image6
      },
    ],
    entradaProdutores: [
      {
        id: 1,
        produtor: 'Diogo Demetrius',
        localizacao: 'Anta Gorda- Minas Gerais',
        Image: Prod1,
        categoria: 'Frutas',
        tiposProdutos: [
          {
            id: 1,
            produto: 'Banana',
            image: Image1
          },
          {
            id: 2,
            produto: 'Maça',
            image: Image2
          },
          {
            id: 3,
            produto: 'Uva',
            image: Image3
          },
          {
            id: 4,
            produto: 'Melancia',
            image: Image4
          },
          {
            id: 5,
            produto: 'Teste',
            image: Image5
          },
          {
            id: 6,
            produto: 'Pera',
            image: Image6
          },
        ]
        

      },
      {
        id: 2,
        produtor: 'Pablo Pires',
        localizacao: 'Barro Duro - Piauí',
        Image: Prod2,
        categoria: 'Frutas',
        tiposProdutos: [
          {
            id: 1,
            produto: 'Banana',
            image: Image1
          },
          {
            id: 2,
            produto: 'Maça',
            image: Image2
          },
          {
            id: 3,
            produto: 'Uva',
            image: Image3
          },
          {
            id: 4,
            produto: 'Melancia',
            image: Image4
          },
          {
            id: 5,
            produto: 'Teste',
            image: Image5
          },
          {
            id: 6,
            produto: 'Pera',
            image: Image6
          },
        ]
        

      },
      {
        id: 3,
        produtor: 'Tiago Thamires',
        localizacao: 'Feliz Natal - Mato Grosso',
        Image: Prod3,
        categoria: 'Frutas',
        tiposProdutos: [
          {
            id: 1,
            produto: 'Banana',
            image: Image1
          },
          {
            id: 2,
            produto: 'Maça',
            image: Image2
          },
          {
            id: 3,
            produto: 'Uva',
            image: Image3
          },
          {
            id: 4,
            produto: 'Melancia',
            image: Image4
          },
          {
            id: 5,
            produto: 'Teste',
            image: Image5
          },
          {
            id: 6,
            produto: 'Pera',
            image: Image6
          },
        ]
        

      },
      {
        id: 4,
        produtor: 'Lino Limeira',
        localizacao: 'Nenelândia - Ceará',
        Image: Prod4,
        categoria: 'Frutas',
        tiposProdutos: [
          {
            id: 1,
            produto: 'Banana',
            image: Image1
          },
          {
            id: 2,
            produto: 'Maça',
            image: Image2
          },
          {
            id: 3,
            produto: 'Uva',
            image: Image3
          },
          {
            id: 4,
            produto: 'Melancia',
            image: Image4
          },
          {
            id: 5,
            produto: 'Teste',
            image: Image5
          },
          {
            id: 6,
            produto: 'Pera',
            image: Image6
          },
        ]

      },

      {
        id: 4,
        produtor: 'Artur Alcantra',
        localizacao: 'Xique Xique - Bahia',
        Image: Prod5,
        categoria: 'Frutas',
        tiposProdutos: [
          {
            id: 1,
            produto: 'Banana',
            image: Image1
          },
          {
            id: 2,
            produto: 'Maça',
            image: Image2
          },
          {
            id: 3,
            produto: 'Uva',
            image: Image3
          },
          {
            id: 4,
            produto: 'Melancia',
            image: Image4
          },
          {
            id: 5,
            produto: 'Teste',
            image: Image5
          },
          {
            id: 6,
            produto: 'Pera',
            image: Image6
          },
        ]
        

      },
    ],
  },
  {
    id: 2,
    titulo: "Produtos do produtor: ",
    entradaProdutor: [
      {
        id: 1,

      },
    ],
  },
];

export { secoes };