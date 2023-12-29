import React from 'react';
import { Link } from 'react-router-dom';

const NoteList = ({ notes, onDelete }) => {

    


    return (
        <div>
        <h2 className="mb-4">Note List</h2>
        {notes.map(note => (
            <div key={note.id} className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.content}</p>
                    <button className="btn btn-danger me-2" onClick={() => onDelete(note.id)}>Delete</button>
                    <Link to={`/edit/${note.id}`} className="btn btn-secondary">Edit</Link>
                </div>
            </div>
        ))}
    </div>
    );
};

export default NoteList;
