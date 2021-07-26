// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const allowCors = (fn: any) => async (req: any, res: any) => {
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader("Access-Control-Allow-Origin", "*");
	// another common pattern
	// res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,OPTIONS,PATCH,DELETE,POST,PUT"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
	);
	if (req.method === "OPTIONS") {
		res.status(200).end();
		return;
	}
	return await fn(req, res);
};

type Data = {
	name: string;
	id: number;
};

type SuccesData = {
	succes: boolean;
};

async function Handler(
	req: NextApiRequest,
	res: NextApiResponse<Data[] | SuccesData>
) {
	const datas: Data[] = [{ name: "John Doe", id: 1 }];
	switch (req.method) {
		case "GET":
			return res.status(200).json(datas);
		case "POST":
			const newData = req.body;
			datas.push(newData);
			return res.status(201).json({ succes: true });

		default:
			return res.status(200).json({ succes: false });
	}
}

export default allowCors(Handler);
