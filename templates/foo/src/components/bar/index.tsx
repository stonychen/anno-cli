import { Component, Vue } from 'vue-property-decorator'
import style from './index.module.scss'

@Component
export default class Bar extends Vue {
  private render() {
    return <div class={style.container} id="bar-container"></div>
  }
}
