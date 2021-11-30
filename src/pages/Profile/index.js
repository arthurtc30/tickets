import "./profile.css";
import Header from "../../components/Header";
import Title from "../../components/Title";

import avatar from '../../assets/avatar.png';
import { FiSettings, FiUpload } from "react-icons/fi";
import { AuthContext } from '../../contexts/auth'
import { useContext, useState } from "react";

export default function Profile() {
    const { user, signOut } = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="My profile">
                    <FiSettings size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile">
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#FFF" size={25} />
                            </span>

                            <input type="file" accept="image/*" />
                            {avatarUrl === null ?
                                <img src={avatar} width="250" height="250" alt="User profile picture" />
                                :
                                <img src={avatarUrl} width="250" height="250" alt="User profile picture" />
                            }
                        </label>

                        <label>
                            Name
                        </label>

                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <input type="text" value={email} disabled={true} />

                        <button type="submit">Save</button>
                    </form>
                </div>
                <div className="container">
                    <button className="logout-btn" onClick={() => signOut()} >
                            Sign Out

                    </button>
                </div>
            </div>
        </div>
    )
}
