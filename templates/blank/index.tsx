import { Component, Vue } from 'vue-property-decorator'


//import style from './index.module.scss'


@Component({})
export default class Layout extends Vue {

  private render() {
    return (
      <div class="app-layout">
        This is home page
      </div>
    )
  }
}

