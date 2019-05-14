import React from 'react';
import styles from './header.module.scss';
import { Link } from 'react-router-dom'
import { Button } from 'rimble-ui';

const Header = () => (
  <div className={styles.header}>
    <nav id="menu" className="menu">
      <div className={styles.brand}>
        
      </div>
      <ul>
        <li><Link to="/" className={styles.link}> Home</Link></li>
        <li><Link to="/patient" className={styles.link}> Patient</Link></li>
        <li><Link to="/provider" className={styles.link}> Provider</Link></li>
        <li><Link to="/about" className={styles.link}> About</Link></li>
        <li><Link to="/" className={styles.link}><Button size="small">Logout</Button></Link></li>
      </ul>
    </nav>
  </div>
)

export default Header;