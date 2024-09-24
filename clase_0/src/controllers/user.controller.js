import { userModel } from "../models/user.model.js";

class UserController {
  static async getAll(req, res) {
    try {
      const users = await userModel.find();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;

      const user = await userModel.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async create(req, res) {
    try {
      const { name, age, email } = req.body;

      const user = userModel({
        name,
        age,
        email,
      });

      await user.save();

      return res.json(user);
    } catch (error) {
      if (error.message.includes("Email not valid")) {
        return res.status(400).json({ error: "Email not valid" });
      }

      return res
        .status(500)
        .json({ error: "Error creating user", details: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      const userExists = await userModel.findById(id);

      if (!userExists) {
        return res.status(404).json({ error: "User not found" });
      }

      await userModel.findByIdAndDelete(id);

      return res.json({ message: "User deleted", user: userExists });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;

      const userExists = await userModel.findById(id);

      if (!userExists) {
        return res.status(404).json({ error: "User not found" });
      }

      const { name, age, email } = req.body;

      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { name, age, email },
        { new: true }
      );

      return res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

// export const userController = new UserController();
export { UserController };
