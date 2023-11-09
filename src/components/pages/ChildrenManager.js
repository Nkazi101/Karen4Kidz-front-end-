import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChildrenManager = ({ id }) => {
  const [children, setChildren] = useState([]);
  const [editChildId, setEditChildId] = useState(null);
  const [childForm, setChildForm] = useState({ name: '', age: '' });

  useEffect(() => {
    // Fetch the children when the component mounts
    axios.get(`http://localhost:8080/children/${id}`)
      .then(response => setChildren(response.data))
      .catch(error => console.error('Error fetching children:', error));
  }, [id]);

  const resetForm = () => setChildForm({ name: '', age: '' });

  const addChild = () => {
    axios.post(`http://localhost:8080/addChild/${id}`, childForm)
      .then(response => {
        setChildren([...children, response.data]);
        resetForm();
      })
      .catch(error => console.error('Error adding child:', error));
  };

  const editChild = childId => {
    const child = children.find(c => c.id === childId);
    setEditChildId(childId);
    setChildForm({ name: child.name, age: child.age });
  };

  const updateChild = () => {
    axios.put(`http://localhost:8080/updateChild/${id}`, childForm)
      .then(response => {
        setChildren(children.map(child => child.id === editChildId ? response.data : child));
        setEditChildId(null);
        resetForm();
      })
      .catch(error => console.error('Error updating child:', error));
  };

  const deleteChild = childId => {
    axios.delete(`http://localhost:8080/deletedChild/${id}`)
      .then(() => {
        setChildren(children.filter(child => child.id !== childId));
      })
      .catch(error => console.error('Error deleting child:', error));
  };

  return (
    <div>
      <h2>Manage Children</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={childForm.name}
          onChange={e => setChildForm({ ...childForm, name: e.target.value })}
        />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={childForm.age}
          onChange={e => setChildForm({ ...childForm, age: e.target.value })}
        />
        {editChildId ? (
          <button onClick={updateChild}>Update Child</button>
        ) : (
          <button onClick={addChild}>Add Child</button>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {children.map((child) => (
            <tr key={child.id}>
              <td>{child.name}</td>
              <td>{child.age}</td>
              <td>
                <button onClick={() => editChild(child.id)}>Edit</button>
                <button onClick={() => deleteChild(child.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChildrenManager;
