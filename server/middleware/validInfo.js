module.exports = (req, res, next) => {
  const { email, username, password } = req.body;

  // email validation function
  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  // if registering, make sure no fields are empty
  if (req.path === '/register') {
    if (![email, username, password].every(Boolean)) {
      return res.status(401).json('Missing Credentials');
    } else if (!validEmail(email)) {
      return res.status(401).json('Invalid Email');
    }
  } else if (req.path === '/login') {
    if (![username, password].every(Boolean)) {
      return res.status(401).json('Missing Credentials');
    }
  }
  next();
};
