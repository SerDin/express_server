const fs = require('fs');

class UsersService {
	async readData() {
		const data = await fs.readFileSync('data.json', 'utf8');
		const dataParse = await JSON.parse(data);
		return dataParse.users;
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
		const dataUsers = await this.readData();
		return dataUsers.find((i) => i.id == id);
	}

	async getGenderUsers(gender) {
		const users = await this.readData();
		if (gender == 'male') return users.filter((i) => i.isMan);
		if (gender == 'female') return users.filter((i) => !i.isMan);
	}

	async putUser(data, id) {
		const allUsers = await this.readData();
		const putUser = await allUsers.map((i) => (i.id == id ? data : i));
		await putUser.splice(0, putUser.length, {
			users: [...putUser],
		});
		const dataWrite = JSON.stringify(putUser[0]);
		fs.writeFile('data.json', dataWrite, (err) => {
			if (err) {
				throw err;
			}
		});

		const res = await JSON.parse(dataWrite);
		return res.users.filter((i) => i.id == id);
	}

	async postUser(data) {
		const dataRead = await this.readData();
		await dataRead.push(data);
		await fs.writeFileSync(
			'data.json',
			JSON.stringify({ users: [...dataRead] }),
			(err) => {
				if (err) throw err;
			}
		);
		const datas = await fs.readFileSync('data.json', 'utf8');
		const dataParse = await JSON.parse(datas);

		return dataParse.at(-1);
	}

	async patchUser(data) {
		const id = data.id;
		const userData = await this.readData();
		const userIndex = userData.findIndex((i) => i.id == id);
		const updateUser = { ...userData[userIndex], ...data };
		userData[userIndex] = updateUser;
		const writeObj = {
			users: [...userData],
		};
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
		const deleteUser = dataRead.find((i) => i.id == id);
		const ids = dataRead.findIndex((i) => i.id == id);
		dataRead.splice(ids, 1);
		await fs.writeFileSync(
			'data.json',
			JSON.stringify({ users: [...dataRead] }),
			(err) => {
				if (err) {
					throw err;
				} else {
					console.log('writePostOk');
				}
			}
		);
		return `${deleteUser.name} is deleted`;
	}
}

module.exports = new UsersService();
