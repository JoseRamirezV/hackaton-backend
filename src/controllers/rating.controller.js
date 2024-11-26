const Rating = require('#models/rating');

const getRatingsByAppId = async (req, res) => {
   try {
      const appId = req.params.appId;
      const ratings = await Rating.find({ appId });

      res.status(200).json({ ok: true, data: ratings });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

const addComment = async (req, res) => {
   try {
      const data = req.body;
      const userId = data.user.id;
      const hasCommented = await Rating.findOne({
         appId: data.appId,
         'user.id': userId,
      });

      if(hasCommented) throw new Error("No puedes agregar mas comentarios a esta app")

      const rating = new Rating(data);

      const newRating = await rating.save();

      res.status(201).json({ ok: true, data: newRating });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

const deleteComment = async (req, res) => {
   try {
      const id = req.params.id;
      await Rating.findByIdAndDelete(id);

      res.status(200).json({ ok: true });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

module.exports = { getRatingsByAppId, addComment, deleteComment };
