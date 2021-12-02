import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import Header from "../../components/Header";
import Title from "../../components/Title";
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';

import { FiPlus } from "react-icons/fi";
import './new.css';

export default function New() {
  const [clientes, setClientes] = useState([]);
  const [loadingClientes, setLoadingClientes] = useState(true);
  const [clienteSelecionado, setClienteSelecionado] = useState(0);
  const [tipo, setTipo] = useState('IT');
  const [status, setStatus] = useState('Open');
  const [descricao, setDescricao] = useState('');

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadCustomers() {
      await firebase.firestore().collection('customers')
        .get()
        .then((snapshot) => {
          let lista = [];
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia
            })
          })

          if (lista.length === 0) {
            console.log('No customer found');
            setClientes([{ id: 1, nomeFantasia: '' }]);
            setLoadingClientes(false);
            return;
          }

          setClientes(lista);
          setLoadingClientes(false);

        })
        .catch((error) => {
          console.log(error);
          setLoadingClientes(false);
          setClientes([{ id: 1, nomeFantasia: '' }]);
        });
    }

    loadCustomers();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();

    await firebase.firestore().collection('tickets')
      .add({
        created: new Date(),
        customer: clientes[clienteSelecionado].nomeFantasia,
        customerId: clientes[clienteSelecionado].id,
        type: tipo,
        status: status,
        description: descricao,
        ticketCallerId: user.uid
      })
      .then(() => {
        toast.success('Ticket created!');
        setDescricao('');
        setClienteSelecionado(0);
      })
      .catch((error) => {
        toast.error('Something went wrong...');
        console.log(error);
      });
  }

  function handleChangeSelect(e) {
    setTipo(e.target.value);
  }

  function handleOptionChange(e) {
    setStatus(e.target.value);
  }

  function handleChangeCliente(e) {
    setClienteSelecionado(e.target.value);
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="New ticket">
          <FiPlus size={25} />
        </Title>

        <div className="container" onSubmit={handleRegister} >
          <form className="form-profile">
            <label>Customer</label>

            {loadingClientes ? (
              <input type="text" disabled={true} value="Loading customers..." />
            ) : (
              <select value={clienteSelecionado} onChange={handleChangeCliente}>
                {clientes.map((item, index) => {
                  return (
                    <option key={item.id} value={index}>
                      {item.nomeFantasia}
                    </option>
                  );
                })}
              </select>
            )}

            <label>Type</label>
            <select value={tipo} onChange={handleChangeSelect} >
              <option value="IT">IT</option>
              <option value="Technical visit">Technical visit</option>
              <option value="Financial">Financial</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input type="radio" name="radio" value="Open" onChange={handleOptionChange} checked={status === 'Open'} />
              <span>Open</span>

              <input type="radio" name="radio" value="In progress" onChange={handleOptionChange} checked={status === 'In progress'} />
              <span>In progress</span>

              <input type="radio" name="radio" value="Closed" onChange={handleOptionChange} checked={status === 'Closed'} />
              <span>Closed</span>
            </div>

            <label>Description</label>
            <textarea type="text" placeholder="Optional descricao about your issue" value={descricao} onChange={(e) => setDescricao(e.target.value)} />

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
