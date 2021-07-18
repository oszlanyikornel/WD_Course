// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	name: string;
	id: number;
};

type SuccesData = {
	succes: boolean;
};

export default async function handler(
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
