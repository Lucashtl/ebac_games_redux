import Header from '..'
import { screen } from '@testing-library/react'
import { renderizaComponentes } from '../../../utils/tests'

describe('Teste Para o Header', () => {
  test('Deve conter Ebac Games', () => {
    renderizaComponentes(<Header />)

    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })

  test('Deve renderizar com 2 itens no carrinho', () => {
    renderizaComponentes(<Header />, {
      preloadedState: {
        carrinho: {
          itens: [
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
            }
          ]
        }
      }
    })
    expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2 itens')
  })
})
