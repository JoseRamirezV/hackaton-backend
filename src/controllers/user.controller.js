const User = require('#models/user');
const bcrypt = require('bcrypt');

export const login = async (req, res) => {
   try {
      const { email, password } = req.params;
      const user = await User.findOne({ email });
      if (!user) throw new Error('Usuario no encontrado');
      const isAuthenticated = bcrypt.compareSync(password, user.password);
      if (!isAuthenticated) throw new Error('Credenciales incorrectas');

      console.log(user);

      delete user.createdAt;
      delete user.updatedAt;
      delete user.password;
      // const token = generateToken({ ...user._doc });
      res.status(200).json({ user: user._doc, token });
   } catch (error) {
      res.status(400).json({ message: error });
   }
};

const signup = async (req, res) => {
   try {
      const {
         email,
         name,
         temporalToken,
         verificationUrl,
      } = req.body;
      const exists = await User.findOne({ email });
      if (exists)
         return res.json({
            error: 'Este correo electrónico ya se encuentra asociado a una cuenta nuestra',
         });
      const password = encryptPassword(req.body.password);
      const user = `${firstName} ${firstLastName}`;

      const newUser = new User({
         ...req.body,
         user,
         password,
         temporalToken,
      });
      await newUser.save();

      await sendEmail(email, 'Verificación de cuenta', 'Verification', {
         user,
         code: temporalToken,
         url: verificationUrl,
      });

      res.status(201).send({ success: 'Registrado!' });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

const encryptPassword = (password) => {
   const saltRounds = Number(process.env.SALT_ROUNDS);
   return bcrypt.hashSync(password, saltRounds);
};

/* const generateToken = (data) =>
   jwt.sign(data, process.env.SECRET_KEY, {
      expiresIn: '1d',
   }); */
