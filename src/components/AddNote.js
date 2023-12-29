import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig'

const AddNote = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/notes', { title, content })
             .then(response => {
                 onAdd(response.data);
                 navigate('/');
             })
             .catch(error => console.error('There was an error!', error));
    };

    return (
        <div>
            <h2 className="mb-3">Add a New Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea className="form-control" id="content" rows="3" placeholder="Write your note here" value={content} onChange={e => setContent(e.target.value)} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Add Note</button>
            </form>
        </div>
    );
};

export default AddNote;
