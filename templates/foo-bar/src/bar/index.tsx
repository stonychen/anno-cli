import { Component, Prop, Vue } from 'vue-property-decorator'
import style from './index.module.scss'
import uuid from '@/app/utils/uuid'

@Component
export default class Bar extends Vue {
  @Prop({ default: 'foo' }) public foo!: string

  private render(h: CreateElement, context: any) {
    let id = uuid()
    const linkTo = {
      path: '/demo/bar-foo',
      query: { from: 'from bar-foo,' + id }
    }

    return (
      <div class={style.container} >
        This is component Bar, I wanna go to <router-link to={linkTo}> bar foo</router-link>
      </div >
    )
  }
}
