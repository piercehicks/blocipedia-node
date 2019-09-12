const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const secretKey = process.env.SECRET_KEY;
const publishableKey = process.env.PUBLISHABLE_KEY;
const stripe = require("stripe")(secretKey);
const wikiQueries = require("../db/queries.wikis.js");

module.exports = {
  signUp(req, res, next) {
    res.render("users/sign_up");
  },

  create(req, res, next) {
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        console.log(err);
        req.flash("error", err);
        res.redirect("/users/sign_up");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've signed up!");
          res.redirect("/");
        });
      }
    });
  },

  signInForm(req, res, next) {
    res.render("users/sign_in");
  },

  signIn(req, res, next) {
    passport.authenticate("local")(req, res, () => {
      if (!req.user) {
        req.flash("notice", "Sign in failed. Please try again.");
        res.redirect("/users/sign_in");
      } else {
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/");
      }
    });
  },

  signOut(req, res, next) {
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  },

  upgrade(req, res, next) {
    res.render("users/upgrade", { publishableKey });
  },

  payment(req, res, next) {
    let payment = 1300;
    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
      })
      .then(customer => {
        stripe.charges.create({
          amount: payment,
          description: "Blocipedia Premium Membership",
          currency: "usd",
          customer: customer.id
        });
      })
      .then(charge => {
        userQueries.upgrade(req.user.dataValues.id);
        res.render("users/payment_success");
      });
  },

  downgrade(req, res, next) {
    userQueries.downgrade(req.user.dataValues.id);
    wikiQueries.privateToPublic(req.user.dataValues.id);
    req.flash("notice", "You are no longer a premium user!");
    res.redirect("/");
  },

  showcollaborator(req, res, next){
    userQueries.getUser(req.user.id, (err, result) => {
      user = result["user"];
      collaborator = result["collaborator"];
      if(err || user == null){
        res.redirect(404, "/");
      } else {
        res.render("users/collaborators", {collaborator});
      }
    });
  }
};
