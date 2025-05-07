import { Link } from 'react-router-dom';

function Sidebar() {
  const sidebarStyle = {
    width: '250px',
    height: '100vh',
    borderRight: '1px solid #ccc',
    padding: '20px',
    boxSizing: 'border-box',
    position: 'fixed',
    backgroundColor: '#fff'
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px'
  };

  const navItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    textDecoration: 'none',
    color: 'black',
    fontSize: '16px'
  };

  const iconStyle = {
    marginRight: '10px'
  };

  return (
    <div style={sidebarStyle}>
      <div style={logoStyle}>Instagram</div>
      <nav>
        <Link to="/" style={navItemStyle}>
          <span style={iconStyle}>🏠</span> Home
        </Link>
        <Link to="/search" style={navItemStyle}>
          <span style={iconStyle}>🔍</span> Search
        </Link>
        <Link to="/explore" style={navItemStyle}>
          <span style={iconStyle}>🧭</span> Explore
        </Link>
        <Link to="/events" style={navItemStyle}>
          <span style={iconStyle}>🗓️</span> Events
        </Link>
        <Link to="/notifications" style={navItemStyle}>
          <span style={iconStyle}>❤️</span> Notifications
        </Link>
        <Link to="/create" style={navItemStyle}>
          <span style={iconStyle}>➕</span> Create
        </Link>
        <Link to="/profile/1" style={navItemStyle}>
          <span style={iconStyle}>👤</span> Profile
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
