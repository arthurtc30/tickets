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
                Chamados
            </Link>

            <Link to='/dashboard'> {/* alterar */}
                <FiUser color="#FFF" size={24} />
                Clientes
            </Link>

            <Link to='/dashboard'> {/* alterar */}
                <FiSettings color="#FFF" size={24} />
                Configurações
            </Link>
        </div>
    )
}
