const { User } = require('../models/usersModel.js')
const bcrypt = require('bcryptjs');
exports.createUser = async (userBody) => {
  console.log(userBody);
    const salt = await bcrypt.genSalt(10);
  const { name, email, password } = userBody;
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });
  await user.save();
  console.log("added sucessfully");
};
