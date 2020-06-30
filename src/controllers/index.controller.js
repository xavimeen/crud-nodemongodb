class indexController {

    renderIndex = (req, res) => {
        res.render('index');
    }

    renderAbout = (req, res) => {
        res.render('about');
    }

};

module.exports = new indexController();