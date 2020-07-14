const Note = require('../models/Note');

class NotesController {
    
    renderNotesForm = (req, res) => {
        res.render('notes/new-note');
    };
    
    createNewNote = async (req, res) => {
        try {
            const { title, description } = req.body;
            const newNote = new Note({title, description});
            newNote.user = req.user.id;
            await newNote.save();
            req.flash('success_msg', 'Nota creada!');
            res.redirect('/notes');
        } catch (error) {
            console.error(error);
            req.flash('error_msg', 'Ha ocurrido un error al intentar crear la nota, intente más tarde.');
            res.redirect('/notes');
        };
    }
    
    renderNotes = async (req, res) => {
        try {
            const notes = await Note.find({user: req.user.id}).sort({createdAt: 'desc'}).lean();
            res.render('notes/all-notes', {notes});
        } catch (error) {
            console.log(error);
            req.flash('error_msg', 'Ha ocurrido un error, intente más tarde.');
            res.redirect('/users/signin');
        };
    }

    renderEditForm = async (req, res) => {
        try {
            const note = await Note.findById(req.params.id).lean();
            if(note.user !== req.user.id) {
                req.flash('error', 'No estás autorizado para realizar esta acción.');
                return res.redirect('/notes');
            }
            res.render('notes/edit-notes', {note});
        } catch (error) {
            console.error(error);
            req.flash('error_msg', 'Ha ocurrido un error, intente más tarde.');
            res.redirect('/notes');
        };
    }

    updateNote = async (req, res) => {
        try {
            const {title, description} = req.body;
            await Note.findByIdAndUpdate(req.params.id, {title, description});
            req.flash('success_msg', 'Nota actualizada!');
            res.redirect('/notes');
        } catch (error) {
            console.error(error);
            req.flash('error_msg', 'Ha ocurrido un error al intentar actualizar la nota, intente más tarde.');
            res.redirect('/notes');
        };
    }

    deleteNote = async (req, res) => {
        try {
            await Note.findByIdAndDelete(req.params.id);
            req.flash('success_msg', 'Nota eliminada!');
            res.redirect('/notes');
        } catch (error) {
            console.error(error);
            req.flash('error_msg', 'Ha ocurrido un error al intentar borra la nota, intente más tarde.');
            res.redirect('/notes');
        };
    }

}

module.exports = new NotesController();