import { Component, Vue } from 'vue-property-decorator'
import style from './index.module.scss'


@Component({})
export default class <%= config.className %> extends Vue {

  private render() {
    return (
      <div class={style.home} id='text'>
        This is home page
      </div>
    )
  }
}

