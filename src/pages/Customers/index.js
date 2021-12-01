import Title from '../../components/Title';
import Header from '../../components/Header';
import { useState } from 'react';
import firebase from '../../services/firebaseConnection';

import { FiUser } from 'react-icons/fi';
import './customers.css';
import { toast } from 'react-toastify';

export default function Customers() {
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    async function handleAdd(e) {
        e.preventDefault();

        if (nomeFantasia !== '' && cnpj !== '' && endereco !== '') {
            await firebase.firestore().collection('customers')
            .add({
                nomeFantasia: nomeFantasia,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(() => {
                setNomeFantasia('');
                setCnpj('');
                setEndereco('');
                toast.success('Company registered successfully!');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something went wrong');
            });
        } else {
            toast.error('Not all fields are valid');
        }
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Customers">
                    <FiUser size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile customers" onSubmit={handleAdd}>
                        <label>Name</label>
                        <input type="text" value={nomeFantasia} placeholder="Company name" onChange={(e) => setNomeFantasia(e.target.value)} />
                    
                        <label>CNPJ</label>
                        <input type="text" value={cnpj} placeholder="CNPJ" onChange={(e) => setCnpj(e.target.value)} />
                        
                        <label>Address</label>
                        <input type="text" value={endereco} placeholder="Address" onChange={(e) => setEndereco(e.target.value)} />

                        <button type="submit">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
