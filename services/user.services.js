const { all } = require('axios');
const fs = require('fs');

class UsersService {
	async readData() {
		const data = await fs.readFileSync('data.json', 'utf8');
		const dataParse = await JSON.parse(data);
		return dataParse;
	}

	async writeData(data) {
		await fs.writeFile('data.json', JSON.stringify(dataRead), (err) => {
			if (err) {
				throw err;
			} else {
				console.log('writePostOk');
			}
		});
	}

	async getUsers() {
		return await this.readData();
	}

	async getUsersById(id) {
		const users = await this.readData();
		console.log(users.users.find((i) => i.id == id));
		return users.users.find((i) => i.id == id);
	}

	async getGenderUsers(gender) {
		const users = await this.readData();
		if (gender == 'male') return users.users.filter((i) => i.isMan);
		if (gender == 'female') return users.users.filter((i) => !i.isMan);
	}

	async putUser(data, id) {
		//читаю файл с данными
		await fs.readFile('data.json', 'utf8', async (err, datas) => {
			if (err) throw err;
			const allUsers = JSON.parse(datas);
			console.log('allUsers', allUsers);
			const us = allUsers.users;
			const putUser = us.map((i) => (i.id == id ? data : i));
			console.log('data', data);
			console.log('putUser', putUser);

			await putUser.splice(0, putUser.length, {
				users: [...putUser],
			});
			console.log('putUser', putUser[0]);
			const dataWrite = JSON.stringify(putUser[0]);
			console.log('dataWrite', dataWrite);
			console.log('typeof putUser', typeof putUser);

			return fs.writeFile('data.json', dataWrite, (err) => {
				if (err) {
					throw err;
				}
				console.log('writeOk');
				// return  fs.readFile(
				// 	'data.json',
				// 	'utf8',
				// 	async (err, datas) => {
				// 		if (err) throw err;
				// 		const allUsers = await JSON.parse(datas);
				// console.log(
				// 	'allUsers',
				// 	// allUsers.users.find((i) => i.id == id)
				// );
				// return allUsers.users.find((i) => i.id == id);
			});
		});
		return await this.getUsersById(id);
	}

	async postUser(data) {
		const dataRead = await this.readData();
		console.log('users', dataRead);
		await dataRead.users.push(data);
		console.log('dataRead', dataRead);
		await fs.writeFileSync('data.json', JSON.stringify(dataRead), (err) => {
			if (err) {
				throw err;
			} else {
				console.log('writePostOk');
			}
		});
		const datas = await fs.readFileSync('data.json', 'utf8');
		const dataParse = await JSON.parse(datas);

		return dataParse.users.at(-1);
	}

	async patchUser(data) {
		const id = data.id;
		console.log('id', id);
		const dataRead = await this.readData();
		console.log('dataRead', dataRead);

		const userData = dataRead.users;
		console.log('userData', userData);

		const userIndex = userData.findIndex((i) => i.id == id);
		console.log('userIndex', userIndex);

		const updateUser = { ...userData[userIndex], ...data };
		console.log('updateUser', updateUser);
		userData[userIndex] = updateUser;
		console.log('userData', userData);
		const writeObj = {
			users: [...userData],
		};

		console.log('writeObj', writeObj);

		await fs.writeFileSync('data.json', JSON.stringify(writeObj), (err) => {
			if (err) {
				throw err;
			} else {
				console.log('writePostOk');
			}
		});
		return data;
	}

	async deleteUser(id) {
		const dataRead = await this.readData();
		console.log('dataRead', dataRead);

		const ids = dataRead.users.findIndex((i) => i.id == id);
		dataRead.users.splice(ids, 1);
		console.log('dataRead', dataRead);
		await fs.writeFileSync('data.json', JSON.stringify(dataRead), (err) => {
			if (err) {
				throw err;
			} else {
				console.log('writePostOk');
			}
		});

		return `${id} is deleted`;
	}
}

module.exports = new UsersService();
