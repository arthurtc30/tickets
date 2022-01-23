import "./profile.css";
import Header from "../../components/Header";
import Title from "../../components/Title";

import avatar from '../../assets/avatar.png';
import { FiSettings, FiUpload } from "react-icons/fi";
import { AuthContext } from '../../contexts/auth'
import { useContext, useState } from "react";
import firebase from "../../services/firebaseConnection";
import { toast } from "react-toastify";

export default function Profile() {
    const { user, signOut, setUser, storageUser } = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome);
    const [email] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);
    
    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(image));
            } else {
                alert('Only PNG or JPEG files allowed');
                setImageAvatar(null);
                return null;
            }
        }
    }

    async function handleUpload() {
        const currentUid = user.uid;
        await firebase.storage()
        .ref(`images/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then(async () => {
            toast.success('Image sent');

            await firebase.storage().ref(`images/${currentUid}`)
            .child(imageAvatar.name)
            .getDownloadURL()
            .then(async (url) => {
                let urlImg = url;

                await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    nome: nome,
                    avatarUrl: urlImg
                })
                .then(() => {
                    let data = {
                        ...user,
                        nome: nome,
                        avatarUrl: urlImg
                    }

                    setUser(data);
                    storageUser(data);
                })
                .catch((error) => {
                    // console.log(error);
                });
            });
        })
        .catch((error) => {
            // console.log(error);
        });
    }

    async function handleSave(e) {
        e.preventDefault();

        if (imageAvatar === null && nome !== "") {
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                nome: nome
            })
            .then(() => {
                let data = {
                    ...user,
                    nome: nome
                }

                setUser(data);
                storageUser(data);
            })
            .catch((error) => {
                // console.log(error);
            });
        } else if (nome !== '' && imageAvatar !== null) {
            handleUpload();
        }
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="My profile">
                    <FiSettings size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSave}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#FFF" size={25} />
                            </span>

                            <input type="file" accept="image/*" onChange={handleFile} />
                            {avatarUrl === null ?
                                <img src={avatar} width="250" height="250" alt="User profile" />
                                :
                                <img src={avatarUrl} width="250" height="250" alt="User profile" />
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
