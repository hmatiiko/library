import { Book } from "../../models/Book.js";

export const GetBooks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 30;
    const offset = parseInt(req.query.offset) || 0;

    const books = await Book.findAll({
      where: {
        userId: req.user.id,
      },
      limit: limit,
      offset: offset,
    });

    res.status(200).send(books);
  } catch (e) {
    res.status(500).send({
      errorMessage: "Internal Server Error",
    });
  }
};
