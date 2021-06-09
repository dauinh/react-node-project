import { AppBar, Toolbar, Button } from '@material-ui/core'

const Header = ({ user, logOut}) => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <h3>{user.name}</h3>
          <Button 
            onClick={logOut}
          >
            log out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header