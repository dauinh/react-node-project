import { createMuiTheme } from '@material-ui/core/styles'
import { red, deepOrange, orange } from '@material-ui/core/colors'

export const theme = createMuiTheme({
  palette: {
    primary: orange,
    error: red
  },
})