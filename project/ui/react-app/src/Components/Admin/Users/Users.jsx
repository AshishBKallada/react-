import React, { useState, useEffect } from 'react';
import Header from '../Home/Header/Header';
import './Users.css';

function Users() {
    const [users, setUsers] = useState([]);
    const [showcreate, setShowcreate] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [searchData, setSearchData] = useState('');
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:4000/admin/users');
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data.users);
                } else {
                    console.error('Failed to fetch users:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleRemove = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/admin/removeuser/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
                console.log('User removed successfully');
            } else {
                console.error('Failed to remove user:', response.statusText);
            }
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };


    const handleCreate = async (newUserData) => {
        try {
            const response = await fetch('http://localhost:4000/admin/adduser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUserData)
            });
            if (response.ok) {
                console.log('User added successfully');
                setShowcreate(prev => !prev)
                const updatedResponse = await fetch('http://localhost:4000/admin/users');
                if (updatedResponse.ok) {
                    const updatedData = await updatedResponse.json();
                    setUsers(updatedData.users);
                } else {
                    console.error('Failed to fetch updated user list:', updatedResponse.statusText);
                }
            } else {
                console.error('Failed to add user:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const filteredUsers = users.filter((user) => {
        return (
            user.name.toLowerCase().includes(searchData.toLowerCase()) ||
            user.email.toLowerCase().includes(searchData.toLowerCase())
        );
    });

    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/admin/updateuser/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
    
            if (response.ok) {
                console.log('User updated successfully');
                const updatedUsers = users.map(user => {
                    if (user._id === id) {
                        return { ...user, email: email || user.email, password: password || user.password };
                    } else {
                        return user;
                    }
                });
                setUsers(updatedUsers);
                setEditUserId(null);
            } else {
                console.error('Failed to update user:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    
    

    return (
        <div style={{ backgroundImage: 'url("https://images2.alphacoders.com/109/1092063.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '100vh' }}>
            <Header />
            <div className="users-container">
                <h1>Users</h1>
                <button style={{ 'backgroundColor': 'blue', 'color': 'white', 'width': '200px' }} onClick={() => setShowcreate(prev => !prev)}>Create</button>
                {showcreate && (
                    <div>
                        <input type="text" style={{ 'color': 'white' }} onChange={(e) => setName(e.target.value)} />
                        <input type="text" style={{ 'color': 'white' }} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" style={{ 'color': 'white' }} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={() => handleCreate({ name, email, password })} style={{ 'backgroundColor': 'white', 'color': 'black', 'width': '200px' }}>Add User</button>
                    </div>
                )}
                <div>
                    <input type="text" placeholder='Search' onChange={(e) => setSearchData(e.target.value)} />
                </div>
                <div className="user-list">
                    {(searchData ? filteredUsers : users).map((user) => (
                        <div key={user._id} className="user-card">
                            <h3>{user.name}</h3>
                            {(editUserId === user._id) ? (
                                <>
                                    <input type="text" defaultValue={user.email} onChange={(e) => setEmail(e.target.value)} />
                                    <input type="text" defaultValue={user.password} onChange={(e) => setPassword(e.target.value)} />
                                    <button onClick={()=>handleUpdate(user._id)}>Update</button>
                                    <button onClick={() => setEditUserId(null)}>Close</button>
                                </>
                            ) : (
                                <>
                                    <p>Email: {user.email}</p>
                                    <p>Password: {user.password}</p>
                                </>
                            )}
                            {(editUserId === user._id) ? null : (
                                <>
                                    <button onClick={() => setEditUserId(user._id)}>Edit</button>
                                    <button onClick={() => handleRemove(user._id)}>Remove</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Users;
