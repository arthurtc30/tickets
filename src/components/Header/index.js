import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';

import './header.css';
import avatar from '../../assets/avatar.png';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';

export default function Header() {
    const { user } = useContext(AuthContext);

    return (
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt='User avatar' />
            </div>

            <Link to='/dashboard'>
                <FiHome color="#FFF" size={24} />
                Tickets
            </Link>

            <Link to='/customers'>
                <FiUser color="#FFF" size={24} />
                Customers
            </Link>

            <Link to='/profile'>
                <FiSettings color="#FFF" size={24} />
                Settings
            </Link>
        </div>
    )
}
