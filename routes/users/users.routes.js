const express = require('express')
const router = express.Router()
const UserControllers = require('../../controllers/user.controller')

const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()


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
		const getById = await UserControllers.getUsersById(req.params.id)
		res.send( getById )
	} catch(err){
		console.log(err);
	}
})

router.get( '/gender/:gender', async (req, res) => {
	try{
		const getGenderUsers = await UserControllers.getGenderUsers(req.params.gender)
		res.send( getGenderUsers )
	} catch(err){
		console.log(err);
	}
})

router.post( '/create', jsonParser, async (req, res) => {
	try{
		const postUsers = await UserControllers.postUser(req.body)	
		res.send( postUsers )	
	}
	catch(err){
		console.log(err);
	}  
})

router.put( '/edit/:id', jsonParser, async (req, res) => {
	try{
		const editParametrsUsers = await UserControllers.putUser(req.body, req.params.id)	
		res.send( editParametrsUsers )	
	}
	catch(err){
		console.log(err);
	}  
})

router.patch( '/edit/:id', jsonParser, async (req, res) => {
	try{
		const editUsers = await UserControllers.editUser(req.body)	
		res.send( editUsers )	
	}
	catch(err){
		console.log(err);
	}  
})

router.delete( '/delete/:id', jsonParser, async (req, res) => {
	try{
		const deleteUser = await UserControllers.deleteUser(req.body.id)	
		res.send( deleteUser )	
	}
	catch(err){
		console.log(err);
	}  
})


module.exports = router