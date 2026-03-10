module.exports = (req, res, next) => {
  const { email, username, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  function validUsername(name) {
    if (name.length < 3) return { valid: false, message: 'Username must be at least 3 characters' };
    if (name.length > 20) return { valid: false, message: 'Username must be 20 characters or less' };
    if (!/^[a-zA-Z0-9_.\-]+$/.test(name)) return { valid: false, message: 'Username can only contain letters, numbers, underscores, dots, and hyphens' };
    return { valid: true };
  }

  function validPassword(pw) {
    if (pw.length < 8) return { valid: false, message: 'Password must be at least 8 characters' };
    if (!/[a-zA-Z]/.test(pw)) return { valid: false, message: 'Password must contain at least one letter' };
    if (!/[0-9]/.test(pw)) return { valid: false, message: 'Password must contain at least one number' };
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw)) return { valid: false, message: 'Password must contain at least one special character' };
    return { valid: true };
  }

  if (req.path === '/register') {
    if (![email, username, password].every(Boolean)) {
      return res.status(400).json({ error: 'Missing credentials' });
    }
    if (!validEmail(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    const usernameCheck = validUsername(username);
    if (!usernameCheck.valid) {
      return res.status(400).json({ error: usernameCheck.message });
    }
    const passwordCheck = validPassword(password);
    if (!passwordCheck.valid) {
      return res.status(400).json({ error: passwordCheck.message });
    }
  } else if (req.path === '/login') {
    if (![username, password].every(Boolean)) {
      return res.status(400).json({ error: 'Missing credentials' });
    }
  }
  next();
};
