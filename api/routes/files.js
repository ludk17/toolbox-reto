import { Router } from "express";
import { getFiles, getFormattedFiles } from "../services/fileService.js";

const router = Router();

router.get("/get", async (req, res) => {
  // do something with name and email

  res.status(200).send({});
});

router.get("/files/data", async (req, res) => {
  const files = await getFormattedFiles(req.query);
  return res.status(200).send(files);
});

router.get("/files", async (req, res) => {
  const files = await getFiles();
  return res.status(200).send(files);
});

export default router;
