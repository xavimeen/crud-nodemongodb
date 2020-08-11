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

// Mostrar notas --> GET /notes/new-note
router.get('/notes/new-note', isAuthenticated, renderNotesForm );
// Crear notas --> POST /notes/new-note
router.post('/notes/new-note', isAuthenticated, createNewNote);

// Mostrar todas las notas --> GET /notes/new-note
router.get('/notes', isAuthenticated, renderNotes);

// Página para editar nota --> GET /notes/edit/:id
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);
// Editar nota --> PUT /notes/edit/:id
router.put('/notes/edit/:id', isAuthenticated, updateNote);

// Eliminar nota --> DELETE /notes/delete/:id
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;