import { route } from "./";
import CommentModel from "../db/CommentModel";
import { ApplicationError } from "../lib/errors";

export const create = route(async (req, res) => {
  const commentModel = new CommentModel();
  try {
    const commentInformation = req.body;

    const comment = await commentModel.create(commentInformation);

    res.send({ results: comment });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
export const get = route(async (req, res) => {
  const commentModel = new CommentModel();
  try {
    const comments = await commentModel.get();
    res.send({ results: comments });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});

export const getById = route(async (req, res) => {
  const commentModel = new CommentModel();
  try {
    let commentId = req.params.Id;
    const comment = await commentModel.getById(commentId);
    res.send({ results: comment });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
export const put = route(async (req, res) => {
  const commentModel = new CommentModel();
  try {
    let commentId = req.params.Id;
    let commentInformation = req.body.commentInformation;
    const comment = await commentModel.put(commentId, commentInformation);
    res.send({ results: comment });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
