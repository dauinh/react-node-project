import { createMuiTheme } from '@material-ui/core/styles'
import { red, amber, orange } from '@material-ui/core/colors'

export const theme = createMuiTheme({
  palette: {
    primary: orange,
    error: red
  },

  overrides: {
    MuiToolbar: {
      regular: orange[300]
    }
  }
})