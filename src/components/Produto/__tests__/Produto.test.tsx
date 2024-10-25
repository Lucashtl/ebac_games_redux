import { fireEvent, screen } from '@testing-library/react'
import Produto from '..'
import { renderizaComponentes } from '../../../utils/tests'

const jogo = {
  id: 2,
  categoria: 'RPG',
  imagem: '',
  plataformas: ['PC'],
  precoAntigo: 160,
  preco: 130,
  titulo: 'Venha Visitar Minha Casa'
}

describe('Teste para o componente produto', () => {
  test('Deve renderizae corretamente', () => {
    renderizaComponentes(<Produto game={jogo} />)
    expect(screen.getByText('Venha Visitar Minha Casa')).toBeInTheDocument()
  }),
    test('Deve adcionar um item ao carrinho', () => {
      const { store } = renderizaComponentes(<Produto game={jogo} />)
      const botao = screen.getByTestId('btn-adcionar')
      fireEvent.click(botao)

      expect(store.getState().carrinho.itens).toHaveLength(1)
    })
})
