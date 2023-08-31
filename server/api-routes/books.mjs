import express from "express";
import { body } from "express-validator";
import { requestErrorHandler } from "../helpers/helper.mjs"

import {
  deleteBook,
  getAllBooks,
  getBookById,
  registeBook,
  updateBook,
} from "../controllers/books.mjs";

const router = express.Router();

// router.use(express.urlencoded({ extended: true }));

router.get("/", requestErrorHandler(getAllBooks));


router.get("/:id",  requestErrorHandler(getBookById));

router.post(
  "/",
  body("title").notEmpty().withMessage('タイトルを入力してください。'),
  body("desc").notEmpty(),
  body("rating").notEmpty().isInt(),
  body("comment").notEmpty(),
  requestErrorHandler(registeBook)
);

router.patch(
  "/:id",
  body("title").optional().notEmpty(),
  body("desc").optional().notEmpty(),
  body("rating").optional().notEmpty().isInt(),
  body("comment").optional().notEmpty(),
  requestErrorHandler(updateBook)
);

router.delete("/:id", requestErrorHandler(deleteBook));

export default router;