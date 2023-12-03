import Frutas from "../assets/image1.png";
import Hortalicas from "../assets/image2.png";
import Leguminosas from "../assets/image3.png";
import Cereais from "../assets/image4.png";
import Adubos from "../assets/image5.png";
import Mudas from "../assets/image6.png";
import Acelga from '../assets/Acelga.png';
import AduboMineral from '../assets/AduboMineral.png';
import AduboOrganico from '../assets/AduboOrganico.png';
import AduboOrganoMineral from '../assets/AduboOrganomineral.png';
import Alface from '../assets/Alface.png';
import Amendoim from '../assets/Amendoim.png';
import Arroz from '../assets/Arroz.png';
import Aveia from '../assets/Aveia.png';
import Brocolis from '../assets/Brócolis.png';
import Centeio from '../assets/Centeio.png';
import Cevada from '../assets/Cevada.png';
import Couve from '../assets/Couve.png';
import Ervilha from '../assets/Ervilha.png';
import Espinafre from '../assets/Espinafre.png';
import Feijao from '../assets/Feijão.png';
import GraoDeBico from '../assets/GrãodeBico.png';
import Lentilha from '../assets/Lentilha.png';
import Mamao from '../assets/Mamão.png';
import Milho from '../assets/Milho.png';
import Muda1 from '../assets/Muda1.png';
import Muda2 from '../assets/Muda2.png';
import Muda3 from '../assets/Muda3.png';
import Soja from '../assets/Soja.png';
import Trigo from '../assets/Trigo.png';
import Maca from '../assets/Maça.png';
import Banana from '../assets/Banana.png';
import Uva from '../assets/Uva.png';
import Pera from '../assets/Pera.png';
import Morango from '../assets/Morango.png';

const secoes = [
  
  {
    id: 1,
    titulo: "Categorias: ",
    entradaCategoria: [
      {
        id: 1,
        categoria: 'Frutas',
        image: Frutas
      },
      {
        id: 2,
        categoria: 'Hortaliças',
        image: Hortalicas
      },
      {
        id: 3,
        categoria: 'Leguminosas',
        image: Leguminosas
      },
      {
        id: 4,
        categoria: 'Cereais',
        image: Cereais
      },
      {
        id: 5,
        categoria: 'Adubo',
        image: Mudas
      },
      {
        id: 6,
        categoria: 'Mudas',
        image: Adubos
      },
    ],
  },
  {
    id: 2,
    titulo: "Produtos: ",
    entradaProdutos: [
      {
        id: 1,
        categoria: 'Frutas',
        tiposProdutos: [
          {
            id: 1,
            produto: 'Banana',
            image: Banana
          },
          {
            id: 2,
            produto: 'Maça',
            image: Maca
          },
          {
            id: 3,
            produto: 'Uva',
            image: Uva
          },
          {
            id: 4,
            produto: 'Morango',
            image: Morango
          },
          {
            id: 5,
            produto: 'Pera',
            image: Pera
          },
        ]
        

      },
      {
        id: 2,
        categoria: 'Hortaliças',
        tiposProdutos: [
          {
            id: 1,
            produto: 'Alface',
            image: Alface
          },
          {
            id: 2,
            produto: 'Couve',
            image: Couve
          },
          {
            id: 3,
            produto: 'Espinafre',
            image: Espinafre
          },
          {
            id: 4,
            produto: 'Brócoli',
            image: Brocolis
          },
          {
            id: 5,
            produto: 'Acelga',
            image: Acelga
          },
        ]

      },
      {
        id: 3,
        categoria: 'Leguminosas',
        tiposProdutos: [
          {
            id: 1,
            produto: 'Amendoim',
            image: Amendoim
          },
          {
            id: 2,
            produto: 'Grão de bico',
            image: GraoDeBico
          },
          {
            id: 3,
            produto: 'Ervilha',
            image: Ervilha
          },
          {
            id: 4,
            produto: 'Feijão',
            image: Feijao
          },
          {
            id: 5,
            produto: 'Mamão',
            image: Mamao
          },
          {
            id: 6,
            produto: 'Lentilha',
            image: Lentilha
          },
          {
            id: 7,
            produto: 'Soja',
            image: Soja
          },
        ]

      },
      {
        id: 4,
        categoria: 'Cereais',
        tiposProdutos: [
          {
            id: 1,
            produto: 'Arroz',
            image: Arroz
          },
          {
            id: 2,
            produto: 'Trigo',
            image: Trigo
          },
          {
            id: 3,
            produto: 'Milho',
            image: Milho
          },
          {
            id: 4,
            produto: 'Cevada',
            image: Cevada
          },
          {
            id: 5,
            produto: 'Aveia',
            image: Aveia
          },
          {
            id: 6,
            produto: 'Centeio',
            image: Centeio
          },
        ]

      },
      {
        id: 5,
        categoria: 'Adubo',
        tiposProdutos: [
          {
            id: 1,
            produto: 'Adubo orgânico',
            image: AduboOrganico
          },
          {
            id: 2,
            produto: 'Adubo mineral',
            image: AduboMineral
          },
          {
            id: 3,
            produto: 'Adubo organomineral',
            image: AduboOrganoMineral
          },
        ]

      },
      {
        id: 6,
        categoria: 'Mudas',
        tiposProdutos: [
          {
            id: 1,
            produto: 'Muda 1',
            image: Muda1
          },
          {
            id: 2,
            produto: 'Muda 2',
            image: Muda2
          },
          {
            id: 3,
            produto: 'Muda 3',
            image: Muda3
          },
        ]

      },
    ],
  },
  {
    id: 3,
    titulo: "Cadastro de Produto: ",
    entradaAdicionar: [
      {
        id: 1,
      },
    ],
  },
];

export { secoes };