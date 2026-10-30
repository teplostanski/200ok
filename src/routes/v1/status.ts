import { type Request, type Response, Router } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { ROUTES } from "../../constants.js";
import { send } from "../../utils/send.js";

export const statusRouter = Router();

const supportedCodes = new Set<number>(
  Object.values(StatusCodes).filter(
    (code): code is number => typeof code === "number",
  ),
);

const handleStatus = (req: Request, res: Response) => {
  const rawCode = req.params.code;
  const codeParam = Number(rawCode);
  if (
    typeof rawCode !== "string" ||
    !/^[1-5]\d{2}$/.test(rawCode) ||
    !supportedCodes.has(codeParam)
  ) {
    const error =
      rawCode === undefined
        ? "Missing HTTP status code. Use /status/{code} with a supported three-digit HTTP status code."
        : `Invalid HTTP status code: ${JSON.stringify(rawCode)}. Expected a supported three-digit HTTP status code.`;
    send({ res, status: 400, json: { error }, text: error });
    return;
  }
  const reasonPhrase = getReasonPhrase(codeParam);

  send({
    res,
    json: { code: codeParam, reason: reasonPhrase },
    text: `${codeParam} ${reasonPhrase}`,
    status: codeParam < 200 ? 200 : codeParam,
  });
};

statusRouter.get([ROUTES.statusRoot, ROUTES.status], handleStatus);
statusRouter.post([ROUTES.statusRoot, ROUTES.status], handleStatus);
statusRouter.put([ROUTES.statusRoot, ROUTES.status], handleStatus);
statusRouter.patch([ROUTES.statusRoot, ROUTES.status], handleStatus);
statusRouter.delete([ROUTES.statusRoot, ROUTES.status], handleStatus);
