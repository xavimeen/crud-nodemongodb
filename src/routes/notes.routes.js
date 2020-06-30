const { Router } = require('express');
const router = Router();

const {isAuthenticated} = require('../helpers/auth');

const {
    renderNotesForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote
} = require('../controllers/notes.controller');

// Crear notas
router.get('/notes/new-note', isAuthenticated, renderNotesForm );
router.post('/notes/new-note', isAuthenticated, createNewNote);

// Obtener todas las notas
router.get('/notes', isAuthenticated, renderNotes);

// Editar nota
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);
router.put('/notes/edit/:id', isAuthenticated, updateNote);

// Eliminar nota
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;