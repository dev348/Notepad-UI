import React, { useState , useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoteList from './components/NoteList';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import axios from './axiosConfig';
import './App.css'

const App = () => {
    const [notes, setNotes] = useState([]);

    const addNote = (note) => {
        axios.post('/notes', note)
             .then(response => {
                 setNotes([...notes, response.data]);
             })
             .catch(error => console.error('Error adding note', error));
    };

    const deleteNote = (id) => {
        axios.delete(`/notes/${id}`)
             .then(() => {
                 setNotes(notes.filter(note => note._id !== id)); // Assuming the note has an _id field
             })
             .catch(error => console.error('Error deleting note', error));
    };

    const updateNote = (updatedNote) => {
        axios.patch(`/notes/${updatedNote._id}`, updatedNote) // Assuming the note has an _id field
             .then(response => {
                 setNotes(notes.map(note => note._id === updatedNote._id ? response.data : note));
             })
             .catch(error => console.error('Error updating note', error));
    };

    useEffect(() => {
        axios.get('/notes')
             .then(response => {
                 setNotes(response.data);
             })
             .catch(error => console.error('There was an error!', error));
    }, []);



    return (
      <Router>
      <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <div className="container-fluid">
                  <NavLink className="navbar-brand" to="/">NoteApp</NavLink>
                  <div className="collapse navbar-collapse">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          <li className="nav-item">
                              <NavLink className="nav-link" to="/">Home</NavLink>
                          </li>
                          <li className="nav-item">
                              <NavLink className="nav-link" to="/add">Add Note</NavLink>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>
          <div className="container mt-4">
              <Routes>
                  <Route path="/" element={<NoteList notes={notes} onDelete={deleteNote} />} />
                  <Route path="/add" element={<AddNote onAdd={addNote} />} />
                  <Route path="/edit/:id" element={<EditNote notes={notes} onUpdate={updateNote} />} />
              </Routes>
          </div>
      </div>
  </Router>
    );
};

export default App;
