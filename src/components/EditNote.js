import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axiosConfig';

const EditNote = ({ notes, onUpdate }) => {
    const [note, setNote] = useState({ title: '', content: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/notes/${id}`)
             .then(response => {
                 setNote(response.data);
             })
             .catch(error => console.error('Error fetching note', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`/notes/${id}`, note)
             .then(response => {
                 onUpdate(response.data); // Update the state in the parent component
                 navigate('/'); // Redirect to home after successful update
             })
             .catch(error => console.error('Error updating note', error));
    };


    return (
        <div>
        <h2 className="mb-3">Edit Note</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control input" id="title" value={note.title} onChange={e => setNote({ ...note, title: e.target.value })} required />
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">Content</label>
                <textarea className="form-control textarea" id="content" rows="3" value={note.content} onChange={e => setNote({ ...note, content: e.target.value })} required></textarea>
            </div>
            <button type="submit" className="btn btn-success">Save Changes</button>
        </form>
    </div>
    );
};

export default EditNote;
