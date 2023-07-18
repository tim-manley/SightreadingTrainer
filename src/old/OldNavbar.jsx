import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

function Navbar(props) {
  const user = props.user;
  const signOutFunc = props.signOutFunc;
  let rightNavItems;
  if (user) {
    rightNavItems = <>
    <div className="signOut" onClick={async () => {
      const success = await signOutFunc();
      if (success) {
        alert("Successfully signed out.")
      }
    }}>
      Sign Out
      </div>
      </>;
  } else {
    rightNavItems = 
    <>
      <div className="login">
        <Link to="/login" style={{textDecoration: "none", color: "inherit"}}>Login</Link>
      </div>
      <div className="signUp">
        <Link to="/signup" style={{textDecoration: "none", color: "inherit"}}>Sign Up</Link>
      </div>
    </>
  }

  return (
    <nav className="navbar">
      <div className="navLeft">
        <div className="logo">
          <Link to="/" style={{textDecoration: "none", color: "inherit"}}>
            <FontAwesomeIcon icon={faMusic}/>
          </Link>
        </div>
      </div>
      <div className="navCenter">
        <ul className="navList">
          <li className="navListItem">
            <Link to="/home" style={{textDecoration: "none", color: "inherit"}}>
              HOME
            </Link>
          </li>
          <li className="navListItem">
            <Link to="/random" style={{textDecoration: "none", color: "inherit"}}>
              RANDOM
            </Link>
          </li>
        </ul>
      </div>
      <div className="navRight">
        {rightNavItems}
      </div>
    </nav>
  )
}

export default Navbar