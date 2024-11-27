const jwt = require("jsonwebtoken");

const User = require("#models/user");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.params;
    const user = await User.findOne({ email }, "");
    if (!user) throw new Error("Usuario no encontrado");
    const isAuthenticated = bcrypt.compareSync(password, user.password);
    if (!isAuthenticated) throw new Error("Credenciales incorrectas");

    user.updatedAt = undefined;
    user.password = undefined;
    const token = generateToken({ ...user });
    res.status(200).json({ ok: true, user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { email } = req.body;
    const exists = await User.findOne({ email });
    if (exists)
      throw new Error(
        "Este correo electrónico ya se encuentra asociado a una cuenta nuestra"
      );

    const password = encryptPassword(req.body.password);

    const newUser = new User({
      ...req.body,
      password,
    });
    await newUser.save();

    res.status(201).send({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ ok: true, updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const encryptPassword = (password) => {
  const saltRounds = Number(process.env.SALT_ROUNDS);
  return bcrypt.hashSync(password, saltRounds);
};

const generateToken = (data) =>
  jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

module.exports = {
  login,
  signup,
  update,
};
