import { validationResult } from "express-validator"
import Book from "../models/book.mjs";

//すべてのデータを取得
export async function getAllBooks(req, res) {
  const books = await Book.find().sort({ updateAt: -1});
  res.json(books);
}

//追加
export async function registeBook(req, res) {
  const errors = validationResult(req);

  //isEmptyは空、エラーだった場合の記述
  if(!errors.isEmpty()){
      const errs = errors.array();
      return res.status(400).json(errs)
  }

  const book = new Book(req.body);
  const newBook = await book.save();
  res.status(201).json(newBook);
}

//検索
export async function getBookById(req, res) {
  const _id = req.params.id;
  const books = await Book.findById({_id });

  if (book === null) return res.status(404).json({ msg: 'page not found'});
  res.json(books);
}

//更新
export async function updateBook(req, res) {
  const errors = validationResult(req);

  //isEmptyは空、エラーだった場合の記述
  if(!errors.isEmpty()){
      const errs = errors.array();
      return res.status(400).json(errs);
  }

  const { title, desc, comment, rating } = req.body;
  const _id = req.params.id;
  const book = await Book.findById({_id });

  if (book === null) return res.status(404).json({ msg: 'page not found'});

  if (title !== undefined) {
      book.title = title;
  }
  if (desc !== undefined) {
      book.desc = desc;
  }
  if (comment !== undefined) {
      book.comment = comment;
  }
  if (rating !== undefined) {
      book.rating = rating;
  }
  await book.save();
  res.json(book);
}

//削除
export async function deleteBook(req, res) {
    const _id = req.params.id;
    //不正なIDが送られてきたときの処理
    const { deletedCount } = await Book.deleteOne({_id});

    if (deletedCount === 0) return res.status(404).json({ msg: 'target book not found'});
    
    res.json({ msg: 'delete succeeded'});
}
