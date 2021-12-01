import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Title from '../../components/Title';

import { FiMessageSquare, FiPlus } from "react-icons/fi";
import './dashboard.css';

export default function Dashboard() {
    const [chamados, setChamados] = useState([]);
    
    return (
        <div>
            <Header />

            <div className="content">
                <Title>
                    <FiMessageSquare size={25} />
                </Title>

                <div className="container dashboard">
                {chamados.length === 0 && (
                    <span>No ticket found...</span>
                )}

                    <Link to="/new" className="new">
                        <FiPlus size={25} color="#FFF" />
                        New ticket
                    </Link>
                </div>
            </div>
        </div>
    )
}
