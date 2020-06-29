import { Component, Vue } from 'vue-property-decorator'
import style from './index.module.scss'


@Component
export default class <%= config.className %> extends Vue {

  private render() {
    return (
      <div class={style.container} id='<%= config.className %>Container'>
      </div>
    )
  }
}

