const { getRatingsByAppId, addComment, deleteComment } = require("#controllers/rating.controller")

const router = require("express").Router()

router.get("/:appId", getRatingsByAppId)
router.post("/", addComment)
router.delete("/", deleteComment)

module.exports = router