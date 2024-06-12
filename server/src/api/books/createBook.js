import { bookSchema } from "../../validators/book.js";
import { Book } from "../../models/Book.js";

export const CreateBook = async (req, res) => {
  try {
    const { title, author, description, status } = req.body;
    const { error: validationError } = bookSchema.validate({
      title,
      author,
      description,
      status,
    });

    if (validationError) {
      return res.status(400).send({
        error: validationError.details[0].message,
      });
    }

    const book = await Book.create({
      title: title,
      author: author,
      description: description,
      status: status,
      userId: req.user.id,
    });
    book.dataValues.status = status === 1 ? "Completed" : "Reading";

    return res.status(201).send(book.dataValues);
  } catch (error) {
    res.status(500).send({
      errorMessage: "Internal Server Error",
    });
  }
};
