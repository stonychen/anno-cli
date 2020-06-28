import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import expect from 'expect';
import Counter from '../../src/app/counter/index.tsx'

describe('test', () => {
  it('1 should be equal 1', async () => {
    expect('1').toEqual('1')
  })

})

describe('counter.tsx', () => {
  it('increments count when button is clicked', async () => {
    const wrapper = shallowMount(Counter)
    wrapper.find('button').trigger('click')
    await Vue.nextTick()
    expect(wrapper.find('.count').text()).toEqual('1')
  })

  it('text should be text', async () => {
    const wrapper = shallowMount(Counter)
    expect(wrapper.find('.text').text()).toEqual('text')
  })
})

