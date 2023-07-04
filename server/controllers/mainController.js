/**
 * GET/
 * Login
 */
exports.loginPage = async (req, res) => {
    const locals_login = {
        title: 'Login'
    }

    res.render('index' , {
        locals_login,
        layout: '../views/layouts/login'
    });
} 
