import Header from "../../components/Header";
import Title from "../../components/Title";

import { FiPlus } from "react-icons/fi";
import './new.css';

export default function New() {
  function handleRegister(e) {
    e.preventDefault();
    
  }
  
  return (
    <div>
      <Header />
      
      <div className="content">
        <Title name="New ticket">
          <FiPlus size={25} />
        </Title>

        <div className="container" onSubmit={handleRegister}>
          <form className="form-profile">
            <label>Customer</label>

            <select>
              <option key={1} value={1}>1</option>
              <option key={2} value={2}>2</option>
            </select>

            <label>Type</label>
            <select>
              <option value="IT">IT</option>
              <option value="Technical visit">Technical visit</option>
              <option value="Financial">Financial</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input type="radio" name="radio" value="Open" />
              <span>Open</span>
              
              <input type="radio" name="radio" value="In progress" />
              <span>In progress</span>
              
              <input type="radio" name="radio" value="Closed" />
              <span>Closed</span>
            </div>

            <label>Description</label>
            <textarea type="text" placeholder="Optional description about your issue" />

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
