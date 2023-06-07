/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

type Props = {
	Params?: ParamsDictionary;
	ResBody?: any;
	ReqBody?: any;
	ReqQuery?: ParsedQs;
};

export type SuperRequestHandler<T extends Props = {}> = RequestHandler<
	T["Params"] extends undefined ? ParamsDictionary : T["Params"],
	T["ResBody"] extends undefined ? any : T["ResBody"],
	T["ReqBody"] extends undefined ? any : T["ReqBody"],
	T["ReqQuery"] extends undefined ? ParsedQs : T["ReqQuery"]
>;
