import { screen, fireEvent } from '@testing-library/react'

import Produto from '..'
import { renderizaComProvider } from '../../../utils/tests'

describe('Testes para o componente produto', () => {
  const jogo = {
    id: 1,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows'],
    preco: 150,
    precoAntigo: 200,
    titulo: 'Elden Ring'
  }
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Produto game={jogo} />)

    expect(screen.getByText('Elden Ring')).toBeInTheDocument()
  })

  test('Deve adicionar um item no carrinho', () => {
    renderizaComProvider(<Produto game={jogo} />)
    const botao = screen.getByTestId('btn-adicionar-produto')
    fireEvent.click(botao)
    expect(screen.getByText('Elden Ring')).toBeInTheDocument()
  })

  test('Deve adicionar um item ao carrinho', () => {
    const { store } = renderizaComProvider(<Produto game={jogo} />)
    const botao = screen.getByTestId('btn-adicionar-produto')
    fireEvent.click(botao)

    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
