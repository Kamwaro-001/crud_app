

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send('No account with that email address exists.');
  }

  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await user.save();

  const mailOptions = {
    to: user.email,
    from: 'passwordreset@example.com',
    subject: 'Node.js Password Reset',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://${req.headers.host}/reset/${token}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  smtpTransport.sendMail(mailOptions, function(err) {
    console.log('mail sent');
    res.json({ message: 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
  });
});