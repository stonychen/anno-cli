import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import expect from 'expect'
import <%=root.className %> from '../../<%=root.$PATH.split("/").map(item => "..").join("/") %>/src/<%= root.$PATH %>/index.tsx'

describe('Unit testing for page <%=root.className%>', () => {
  it('text should be text', async () => {
    const wrapper = shallowMount(<%=root.className%>)
    expect(wrapper.find('#<%=root.className%>').text()).toEqual('Welcome to <%=root.className%>')
  })
})
