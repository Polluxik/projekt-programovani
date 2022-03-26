import { InMemoryCache } from '@apollo/client'
import React from 'react'
import Anime from '../pages/anime'
import renderer from 'react-test-renderer'
import { MockedProvider } from '@apollo/client/testing'

const cache = new InMemoryCache()

describe('Anime', () => {
  it('PeepoGlad render', async () => {
    const component = renderer.create(
      <MockedProvider cache={cache}>
        <Anime />
      </MockedProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
