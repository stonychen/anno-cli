import { Component, Vue } from 'vue-property-decorator'
import Bar from './components/bar'
import style from './index.module.scss'

@Component
export default class <%=root.className%> extends Vue {

  private render(h: CreateElement, context: any) {
    return (
      <div class={style.container} id="<%=root.className%>">
        Welcome to <%=root.className%>
        {h(Bar, {})}
      </div>
    )
  }
}
