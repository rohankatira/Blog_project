const User = require('../models/User');

// Get profile page
exports.getprofile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) return res.redirect('/signin');
    res.render('profile/profile', { user });
  } catch (error) {
    console.error(error.message);
    res.status(500).render('error', { error: 'Internal Server Error', user: req.user });
  }
};

// Render edit profile form
exports.renderEditProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) return res.redirect('/signin');
    res.render('profile/editProfile', { user, error: null });
  } catch (error) {
    console.error(error.message);
    res.status(500).render('error', { error: 'Internal Server Error', user: req.user });
  }
};

// Update profile with image upload
exports.updateProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.redirect('/signin');

    user.username = username || user.username;
    user.bio = bio || user.bio;

    if (req.file) {
      user.profilePicture = req.file.filename;
    }

    await user.save();
    res.redirect('/profile');
  } catch (error) {
    console.error(error.message);
    res.render('profile/editProfile', { user: req.body, error: 'Error updating profile' });
  }
};

// Delete profile
exports.deleteProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.clearCookie('token'); // Assuming JWT stored in cookie named 'token'
    res.redirect('/signup');
  } catch (error) {
    console.error(error.message);
    res.status(500).render('error', { error: 'Internal Server Error', user: req.user });
  }
};
