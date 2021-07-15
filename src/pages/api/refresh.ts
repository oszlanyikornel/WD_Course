import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import algoliasearch from "algoliasearch";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { v4 as uuidv4 } from "uuid";

type Data = {
	result: any;
};

// connect to algolia

const client = algoliasearch(
	process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
	process.env.ALGOLIA_ADMIN_API || ""
);
const index = client.initIndex("docs");

// handlers

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		// get files in lessons dir
		const lessonsPath = path.join(process.cwd(), "src", "lessons");
		const filenames = fs.readdirSync(lessonsPath);

		// get content and metadata
		const files = filenames.map((name) => {
			const filePath = path.join(lessonsPath, name);
			const file = fs.readFileSync(filePath, "utf-8");
			const { data, content } = matter(file);
			return {
				data,
				content,
			};
		});

		// split files by h2 tags (exclude h2 tag and save it to subLesson var)
		const filesWithSubLessons = files.map((file) => {
			const lines = file.content.split("\n");
			const headerLines = lines.filter((line) => line.match(/^##*\s/));
			const headerLineIndecies = headerLines.map((hdLine) => {
				return {
					idx: lines.findIndex((ln) => ln === hdLine),
					title: hdLine.replace("## ", ""),
				};
			});
			console.log(headerLineIndecies);
			const subLessons = headerLineIndecies.map((ident, index) => {
				const nextHeaderIdx =
					headerLineIndecies.length === index + 1
						? lines.length
						: headerLineIndecies[index + 1].idx;
				console.log(
					"startIndex: " + (ident.idx + 1) + "  nextIdx: " + nextHeaderIdx
				);
				return {
					content: lines.slice(ident.idx + 1, nextHeaderIdx).join(" /n "),
					subLesson: ident.title,
					subLessonSlug: ident.title.replace(/ /g, "_").toLowerCase(),
				};
			});

			return { data: file.data, subLessons };
		});

		// format data
		const formattedData = filesWithSubLessons
			.map((file) => {
				return file.subLessons.map((subL) => {
					return {
						content: subL.content,
						subLesson: subL.subLesson,
						subLessonSlug: subL.subLessonSlug,
						lesson: file.data.title,
						lessonSlug: file.data.slug,
						module: file.data.module,
						moduleSlug: file.data.moduleSlug,
						objectID: uuidv4(),
					};
				});
			})
			.flat();

		// add data to algolia
		console.log(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID);
		console.log(process.env.ALGOLIA_ADMIN_API);
		const result = await index.replaceAllObjects(formattedData);
		res.status(200).json({ result });
	} catch (error) {
		console.error(error);
		res.status(400).json({ result: "server error" });
	}
});

export default handler;

/*
content
lesson
module
subLesson
moduleSlug
lessonSlug
subLessonSlug
*/
