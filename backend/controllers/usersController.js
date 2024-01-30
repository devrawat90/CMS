const Users = require("../modal/userSchema");
const usersController = {
    registerUser: async (req, res) => {
        console.log(req.body);
        try {
            const { name, email, phoneNumber, address } = req.body;
            if (!name || !email || !phoneNumber || !address) return res.status(201).json({ message: "all fields are required" });

            const emailExists = await Users.findOne({ email: email })
            if (emailExists) {
                return res.status(201).json({ message: 'Email already exists' });
            } else {
                // const encryptedPassword = await bcrypt.hash(password, 10)
                // console.log(encryptPassword);
                const user = await Users.create({
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    address: address,
                })
                const data = await user.save();
                res.status(200).json({ message: "Contact added Successfully", data: data })
            }
        } catch (error) {
            res.json({ message: "Internal Server Error" })
        }
    },
    getUsers: async (req, res) => {
        try {
            const users = await Users.find()
            if (users.length > 0) {
                res.status(200).json({ data: users, message: "users found" })
            } else {
                res.status(404).json({ message: 'No User Found' })
            }
        } catch (error) {
            res.json({ message: "Internal Server Error" })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await Users.findByIdAndDelete(id)
            if (!user) {
                return res.status(201).json({ message: "User not found" });
            }
            res.status(200).json({ message: "Deleted successfully!" });
        } catch (error) {
            res.json({ message: "Internal Server Error" })
        }
    },
    updateProfile: async (req, res) => {
        console.log(req.body);
        try {
            const user = await Users.findOne({ _id: req.params.id })
            console.log(user);
            const updatedData = await Users.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    name: req.body.name,
                    phoneNumber: req.body.phoneNumber,
                    address: req.body.address,
                    email: req.body.email,
                }
            })
            if (updatedData) {
                res.status(200).json({ message: "data updated successfully" })
            } else {
                res.status(201).json({ message: "some error occured" })
            }

        } catch (error) {
            return res.json({ message: "Internal Server Error" })
        }
    }
}

module.exports = usersController;