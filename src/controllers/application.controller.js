const Application = require('#models/application');

const getAll = async (req, res) => {
   try {
      const applications = await Application.find().sort({ createdAt: -1 });
      res.status(200).json({ ok: true, data: applications });
   } catch (error) {
      res.status(500).json({
         ok: false,
         error,
      });
   }
};

const getById = async (req, res) => {
   try {
      const id = req.params.id;
      const app = await Application.findById(id);

      res.status(200).json({ ok: true, data: app });
   } catch (error) {
      res.status(500).json({
         ok: false,
         error,
      });
   }
};

const createApplication = async (req, res) => {
   try {
      const data = req.body;

      if (!data) throw new Error('No puede estar vacío');

      const newData = new Application(data);
      const savedData = await newData.save();

      res.status(201).json({ ok: true, data: savedData });
   } catch (error) {
      res.status(500).json({
         ok: false,
         error,
      });
   }
};

const updateApplication = async (req, res) => {
   try {
      const _id = req.params.id;
      const newData = req.body;

      if (!newData) throw new Error('No puede estar vacío');

      const updatedData = await Application.findOneAndUpdate({_id}, newData, {
         new: true,
      });

      res.status(200).json({ ok: true, data: updatedData });
   } catch (error) {
      res.status(500).json({
         ok: false,
         error,
      });
   }
};

const deleteApplication = async (req, res) => {
   try {
      const _id = req.params.id;
      await Application.deleteOne({_id});

      res.status(200).json({ok: true})
   } catch (error) {
      res.status(500).json({
         ok: false,
         error,
      });
   }
};

module.exports = {
   getAll,
   getById,
   createApplication,
   updateApplication,
   deleteApplication
};
