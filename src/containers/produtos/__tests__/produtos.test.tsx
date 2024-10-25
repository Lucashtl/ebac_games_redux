import Produtos from '..'
import { renderizaComponentes } from '../../../utils/tests'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, waitFor } from '@testing-library/react'

const mock = [
  {
    id: 1,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['PC'],
    precoAntigo: 150,
    preco: 140,
    titulo: 'Suma Da Minha Casa'
  },
  {
    id: 2,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['PC'],
    precoAntigo: 160,
    preco: 130,
    titulo: 'Venha Visitar Minha Casa'
  },

  {
    id: 3,
    categoria: 'ação',
    imagem: '',
    plataformas: ['PC, Ps4, Xbox'],
    precoAntigo: 50,
    preco: 40,
    titulo: 'Benditas sejam minhas armas'
  },

  {
    id: 4,
    categoria: 'aventura',
    imagem: '',
    plataformas: ['PC, Ps4, Xbox'],
    precoAntigo: 200,
    preco: 160,
    titulo: 'Aventuras de um vagabundo excepcional'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mock))
    }
  )
)

describe('Testes para o container produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.listHandlers())
  afterAll(() => server.close())

  test('Deve renderizar corretamente com o texto de carregamento', () => {
    renderizaComponentes(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })
  test('Deve renderizar corretamente', async () => {
    const { debug } = renderizaComponentes(<Produtos />)
    await waitFor(() => {
      expect(
        screen.getByText('Aventuras de um vagabundo excepcional')
      ).toBeInTheDocument()
      debug()
    })
  })
})
