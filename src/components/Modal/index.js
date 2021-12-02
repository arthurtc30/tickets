import './modal.css';

import { FiX } from 'react-icons/fi';

export default function Modal({ conteudo, close }) {
  return (
    <div className="modal">
      <div className="container">
        <button className="close" onClick={close} >
          <FiX size={23} color="#FFF" />
          Go back
        </button>

        <div>
          <h2>Ticket details</h2>

          <div className="row">
            <span>
              Customer: <a>{conteudo.customer}</a>
            </span>
          </div>

          <div className="row">
            <span>
              Type: <a>{conteudo.type}</a>
            </span>
            <span>
              Created at: <a>{conteudo.createdFormatted}</a>
            </span>
          </div>

          <div className="row">
            <span>
              Status: <a style={{ color: "#FFF", backgroundColor: conteudo.status === 'Open' ? '#5CB85C' : "#999" }} >{conteudo.status}</a>
            </span>
          </div>

          {conteudo.description !== '' && (
            <>
              <h3>Description</h3>
              <p>
                {conteudo.description}
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
