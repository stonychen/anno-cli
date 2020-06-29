import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import expect from 'expect'
import <%= config.className %> from '../../src/<%= DESTDIR %>/index.tsx'

describe('counter.tsx', () => {
  it('text should be text', async () => {
    const wrapper = shallowMount(Counter)
    expect(wrapper.find('.text').text()).toEqual('text')
  })
})
