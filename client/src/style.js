import { makeStyles } from '@material-ui/core/styles'
import { rgbToHex } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  // cssOutlinedInput: {
  //   '&$focused $notchedOutline': {
  //     borderColor: rgbToHex('rgb(205, 114, 45)')
  //   }
  // },

  // focused: {},

  // notchedOutline: {
  //   borderColor: 'black'
  // },

  submit: {
    color: rgbToHex('rgb(245, 245, 245)'),
    background: rgbToHex('rgb(205, 114, 45)'),
    '&:hover': {
      background: rgbToHex('rgb(230, 152, 96)')
    }
  }
}))