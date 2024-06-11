import { Book } from "../../models/Book.js";

export const DeleteBook = async (req, res) => {
  try {
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

    await Book.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(204).send();
  } catch (e) {
    res.status(500).send({
      errorMessage: "Internal Server Error",
    });
  }
};
