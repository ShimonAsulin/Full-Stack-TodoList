const crypto = require("crypto");
const Todo = require("../models/todo");
const token = process.env.ZOOM_WEBHOOK_SECRET_TOKEN;
exports.getAllTodo = (req, res) => {
  Todo.find()
    .then((todo) => res.json(todo))
    .catch((err) =>
      res.status(404).json({ message: "Todo not found", error: err.message })
    );
};

exports.postCreateTodo = (req, res) => {
  Todo.create(req.body)
    .then((data) => res.json({ message: "Todo added successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to add todo", error: err.message })
    );
};

exports.zoomCheck = (req, res) => {
  console.log(req.body);
  console.log(req.body.object);
  console.log("req.body.object");
  console.log("req.body.payload");
  console.log(req.body.payload);
  // Webhook request event type is a challenge-response check
  if (req.body.event === "endpoint.url_validation") {
    const hashForValidate = crypto
      .createHmac("sha256", token)
      .update(req.body.payload.plainToken)
      .digest("hex");

    res.status(200);
    res.json({
      plainToken: req.body.payload.plainToken,
      encryptedToken: hashForValidate,
    });
  }
};

exports.putUpdateTodo = (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json({ message: "updated successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to update todo", error: err.message })
    );
};

exports.deleteTodo = (req, res) => {
  Todo.findByIdAndRemove(req.params.id, req.body)
    .then((data) => res.json({ message: "todo deleted successfully", data }))
    .catch((err) =>
      res.status(404).json({ message: "book not found", error: err.message })
    );
};
