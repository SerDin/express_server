const express = require('express')
const router = express.Router()
const UserControllers = require('../../controllers/user.controller')

router.get( '/', async (req, res) => {
	try{
	const getUsers = await UserControllers.getUsers()
	res.send( getUsers )
	} catch(err){
		console.log(err);
	}
})

router.get( '/:id', async (req, res) => {
	try{
		const getBuId = await UserControllers.getUsersBuId(req.params.id)
		res.send( getBuId )
	} catch(err){
		console.log(err);
	}
})


// router.post('/create')
// router.put('/edit')
// router.delete('/delete')

module.exports = router