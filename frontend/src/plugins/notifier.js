import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const notyf = new Notyf({
  duration: 3000,
  position: {
    x: 'right',
    y: 'bottom',
  },
})

export default {
  install: (app) => {
    app.config.globalProperties.$notify = (message, type = 'success') => {
      if (type === 'success') {
        notyf.success(message)
      } else if (type === 'error') {
        notyf.error(message)
      } else {
        notyf.open({ type: 'info', message })
      }
    }
  }
}
