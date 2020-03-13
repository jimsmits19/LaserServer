const UserRepository = require('../data-repo/user_repository')
const dao = require('../data-repo/dao')
const hash = require('pbkdf2-password')()
const userRepo = new UserRepository(dao());

class UserModel {
    constructor(dataObject) {
        if (!dataObject) dataObject = {};
        this.User = {
            UserID: dataObject.UserID,
            CompanyID: dataObject.CompanyID,
            UserName: dataObject.UserName,
            PasswordHash: dataObject.PasswordHash,
            PasswordSalt: dataObject.PasswordSalt,
            FirstName: dataObject.FirstName,
            LastName: dataObject.LastName,
            Enabled: dataObject.Enabled,
            CreatedDate: dataObject.CreatedDate,
            LastLogin: dataObject.LastLogin,
            Admin: dataObject.Admin
        }
    }

    async count(userName) {
        let count = await userRepo.count(userName);
        return count[0].Count;
    }

    create(companyId, userName, hash, salt, firstName, lastName, enabled, admin) {
        try {
            return userRepo.create(companyId, userName, hash, salt, firstName, lastName, enabled, admin);
        }
        catch (error) {
            throw error;
        }
    }

    update(user) {
        try {
            return userRepo.update(user);
        }
        catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            const userData = await userRepo.getById(id);
            return new UserModel(userData[0]).User;

        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            let users = []
            let data = await userRepo.getAll();
            for (let i = 0; i < data.length; i++) {
                users.push(new UserModel(data[i]).User);
            }
            return users;

        } catch (error) {
            throw error;
        }
    }

    async getByName(name) {
        try {
            var data = await userRepo.getByName(name);

            if (data.length === 0) {
                throw new Error("User not found.");
            }
            return new UserModel(data[0]).User
        } catch (error) {
            throw error;
        }

    }

    async authenticate(name, pass, fn) {
        try {

            const user = await this.getByName(name);

            hash({ password: pass, salt: user.PasswordSalt, }, function (error, pass, salt, hash) {
                if (error) return fn(error);
                if (hash === user.PasswordHash) return fn(null, user)
                fn(new Error('Invalid password.'));
            });
        } catch (error) {
            fn(error)
        }
    }

}

module.exports = UserModel
