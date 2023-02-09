const express = require('express');
const router = express.Router();
const MessageControllers = require('../../controllers/message.controller');

router.get('/', async (req, res) => {
	try {
		const getMessage = await MessageControllers.getMessages();
		res.send(getMessage);
	} catch (err) {
		console.log(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const getMessageById = await MessageControllers.getMessageById(
			req.params.id
		);
		res.send(getMessageById);
	} catch (err) {
		console.log(err);
	}
});

// router.post('/create')
// router.put('/edit')
// router.delete('/delete')

module.exports = router;
