import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Title from '../../components/Title';

import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi";
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

                {chamados.length === 0 ? (
                    <div className="container dashboard">
                        <span>No ticket found...</span>
                        <Link to="/new" className="new">
                            <FiPlus size={25} color="#FFF" />
                            New ticket
                        </Link>
                    </div>
                ) : (
                    <div className="container dashboard">
                        <Link to="/new" className="new">
                            <FiPlus size={25} color="#FFF" />
                            New ticket
                        </Link>
                    </div>
                )}

                <table>
                    <thead>
                        <tr>
                            <th scope="col">Customer</th>
                            <th scope="col">Type</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created at</th>
                            <th scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Customer">Test</td>
                            <td data-label="Type">IT</td>
                            <td data-label="Status">
                                <span className="badge" style={{ backgroundColor: '#5CB85C' }}>Open</span>
                            </td>
                            <td data-label="CreatedAt">16/07/2021</td>
                            <td data-label="#">
                                <button className="action" style={{ backgroundColor: '#3583F6' }}>
                                    <FiSearch color="#FFF" size={17} />
                                </button>
                                <button className="action" style={{ backgroundColor: '#F6A935' }}>
                                    <FiEdit2 color="#FFF" size={17} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
