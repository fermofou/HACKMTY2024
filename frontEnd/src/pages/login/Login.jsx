import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from '../../assets/constants/constants';

function Login() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    // Fetch de usuarios
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get(url + "clients");
                setUsers(response.data);
            } catch (error) {
                console.log("Error fetching users: " + error);
            }
        }
        fetchUsers();
    }, []);

    // Manejar la selección de un usuario
    const handleSelectUser = (userId) => {
        setSelectedUserId(userId);
        localStorage.setItem('selectedUserId', userId); // Guardar solo el ID en localStorage
    };

    console.log(users);

    return (
        <>
            <h2>Selecciona tu cuenta:</h2>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <button onClick={() => handleSelectUser(user._id)}>
                                {user.first_name}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Cargando usuarios...</p>
            )}

            {selectedUserId && (
                <Link to="/groups">
                    <button>Log in con ID: {selectedUserId}</button>
                </Link>
            )}
        </>
    );
}

export default Login;
