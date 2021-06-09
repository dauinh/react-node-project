import { createMuiTheme } from '@material-ui/core/styles'
import { red, orange } from '@material-ui/core/colors'

export const theme = createMuiTheme({
  palette: {
    primary: orange,
    error: red
  },

  overrides: {
    MuiToolbar: {
      root: {
        justifyContent: 'space-between'
      },
      regular: {
        backgroundColor: orange[300]
      }
    },

    MuiButton: {
      root: {
        color: '#392515'
      },
      containedPrimary: {
        color: orange[50]
      }
    }
  }
})