const express = require('express')
const router = express.Router({ mergeParams: false });
const {getAnswersforId,getAnswersforCategory,createAnswer,createVentAnswer,getresponsesbyuser} = require('../controllers/Answer')
const {updateResponsecount} = require('../controllers/Metadeta')
//router.route('/:question').get(getAnswersforquestion)
router.route('/getanswer').post(getAnswersforId)
router.route('/getresponses').post(getresponsesbyuser)
router.post('/',createAnswer,updateResponsecount)
router.post('/ventcreate',createVentAnswer,updateResponsecount)
//router.route('/getall').get(getAllAnswers)
router.get("/:category",getAnswersforCategory)



module.exports = router
