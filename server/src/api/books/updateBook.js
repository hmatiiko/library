import { bookSchema } from "../../helpers/Joi/formDataSchema.js";
import { Book } from "../../models/Book.js";

export const UpdateBook = async (req, res) => {
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

    const book = await Book.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!book) {
      return res.status(404).send({
        errorMessage: "Book not found",
      });
    }

    const bookUpdated = await Book.update(
      { title, author, description, status },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true,
      }
    );
    bookUpdated[1].dataValues.status = status == 1 ? "Completed" : "Reading";

    return res.status(200).send(bookUpdated[1].dataValues);
  } catch (e) {
    res.status(500).send({
      errorMessage: "Internal Server Error",
    });
  }
};
