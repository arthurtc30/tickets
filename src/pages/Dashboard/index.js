import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Title from '../../components/Title';
import firebase from '../../services/firebaseConnection';
import { format } from "date-fns";
import Modal from "../../components/Modal";

import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi";
import './dashboard.css';

const listRef = firebase.firestore().collection('tickets').orderBy('created', 'desc');

export default function Dashboard() {
    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDoc, setLastDoc] = useState();
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();

    async function updateState(snapshot) {
        const isCollectionEmpty = snapshot.size === 0;

        if (!isCollectionEmpty) {
            let lista = [];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    type: doc.data().type,
                    customer: doc.data().customer,
                    customerId: doc.data().customerId,
                    created: doc.data().created,
                    createdFormatted: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    description: doc.data().description
                })
            });

            const lastListDoc = snapshot.docs[snapshot.docs.length - 1];

            setChamados(chamados => [...chamados, ...lista]);
            setLastDoc(lastListDoc);
        } else {
            setIsEmpty(true);
        }

        setLoadingMore(false);
    }

    useEffect(() => {
        async function loadChamados() {
            await listRef.limit(5)
                .get()
                .then((snapshot) => {
                    updateState(snapshot);
                })
                .catch((error) => {
                    console.log(error);
                    setLoadingMore(false);
                });

            setLoading(false);
        }

        loadChamados();

        return () => {

        }
    }, [])

    async function handleMore() {
        setLoadingMore(true);
        await listRef.startAfter(lastDoc).limit(5)
            .get()
            .then((snapshot) => {
                updateState(snapshot);
            });
    }

    function togglePostModal(item) {
        setShowPostModal(!showPostModal);
        setDetail(item);
    }

    if (loading) {
        return (
            <div>
                <Header />

                <div className="content">
                    <Title>
                        <FiMessageSquare size={25} />
                    </Title>

                    <div className="container dashboard">
                        <span>Loading tickets...</span>
                    </div>
                </div>
            </div>
        );
    }

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
                    <>
                        <Link to="/new" className="new">
                            <FiPlus size={25} color="#FFF" />
                            New ticket
                        </Link>

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
                                {chamados.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td data-label="Customer">{item.customer}</td>
                                            <td data-label="Type">{item.type}</td>
                                            <td data-label="Status">
                                                <span className="badge" style={{ backgroundColor: item.status === 'Open' ? '#5CB85C' : '#999' }}>{item.status}</span>
                                            </td>
                                            <td data-label="Created At">{item.createdFormatted}</td>
                                            <td data-label="#">
                                                <button className="action" onClick={() => togglePostModal(item)} style={{ backgroundColor: '#3583F6' }}>
                                                    <FiSearch color="#FFF" size={17} />
                                                </button>
                                                <Link to={`/new/${item.id}`} className="action" onClick={() => togglePostModal(item)} style={{ backgroundColor: '#F6A935' }}>
                                                    <FiEdit2 color="#FFF" size={17} />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {loadingMore &&
                            <h3 style={{ textAlign: 'center', marginTop: 15 }}>Loading data...</h3>
                        }

                        {!loadingMore && !isEmpty &&
                            <button onClick={handleMore} className="btn-more">Load more...</button>
                        }
                    </>
                )}
            </div>

            {showPostModal &&
                <Modal
                    conteudo={detail}
                    close={togglePostModal}
                />
            }
        </div>
    )
}
