// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    
    // how to revoke token here to stop offline access request?
    // http://stackoverflow.com/questions/21405274/this-app-would-like-to-have-offline-access-when-access-type-online/29267449#29267
    // https://github.com/jaredhanson/passport/issues/42
    
    // http://www.riskcompletefailure.com/2013/12/are-you-using-approvalpromptforce.html
    
    // http://stackoverflow.com/questions/8942340/get-refresh-token-google-api
    // access type = offline? doesn't seem to be approval prompt since i'm not using it
    
    // solution? http://stackoverflow.com/questions/21097008/the-app-keeps-asking-for-permission-to-have-offline-access-why
    
    // http://stackoverflow.com/questions/21942290/passport-node-js-not-returning-refresh-token
    // accessType (capital T, NO UNDERSCORE), approvalPrompt (no underscore, capital P) ... DIDNT WORK
    
    
    // http://stackoverflow.com/questions/30637984/what-does-offline-access-in-oauth-mean
    // localhost issue?
    
    // http://stackoverflow.com/questions/34666105/google-oauth2-asking-for-offline-access
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'], accessType: 'offline', approvalPrompt: 'auto' }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
    }));
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}