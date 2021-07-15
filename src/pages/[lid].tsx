import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
	Box,
	Center,
	Flex,
	Heading,
	HStack,
	Spinner,
	VStack,
	Image,
	Button,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { FC, JSXElementConstructor, ReactElement } from "react";
import Content from "../components/Content/Content";
import Modules, { ModuleType } from "../components/Modules/Modules";
import SubMenu from "../components/Content/SubMenu";
import {
	ClipboardListIcon,
	CodeIcon,
	PencilIcon,
} from "@heroicons/react/solid";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { renderToString } from "react-dom/server";
import SearchField from "../components/Modules/SearchField";
import Link from "next/link";
import FourOFour from "./404";

interface LessonProps {
	source: any;
	frontMatter: Record<string, any>;
	lessons: ModuleType[];
	content: string;
}

const Lesson: FC<LessonProps> = ({ source, frontMatter, lessons, content }) => {
	const router = useRouter();
	const { colorMode, toggleColorMode } = useColorMode();
	const menuBgColor = useColorModeValue("gray.50", "gray.800");
	const headerLogoColor = useColorModeValue("gray.900", "gray.100");
	const menuBorderCol = useColorModeValue("gray.100", "gray.700");

	if (router.isFallback) {
		return (
			<>
				<Head>
					<title>Loading | Webfejlesztés</title>
					<meta name="description" content="Webfejlesztés kurzus Saminak :)" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Center w="100%" h="100%">
					<Spinner thickness="6px" color="gray.600" h={32} w={32} />
				</Center>
			</>
		);
	}

	if (!content) {
		return (
			<>
				<Head>
					<title>404 | Webfejlesztés</title>
					<meta name="description" content="Webfejlesztés kurzus Saminak :)" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<FourOFour />
			</>
		);
	}

	return (
		<Box p={0} w="100%" h="100%" bg="white">
			<Head>
				<title>
					{frontMatter.title} | {frontMatter.module}
				</title>
				<meta name="description" content="Webfejlesztés kurzus Saminak :)" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Flex direction="row" h="100%">
				<VStack
					overflowY="auto"
					px={12}
					overflowX="hidden"
					w={400}
					spacing={6}
					borderRight="1px"
					borderColor={menuBorderCol}
					alignItems="start"
					bg={menuBgColor}
				>
					<HStack
						//pr={16}
						color={headerLogoColor}
						justifyContent="space-between"
						w="100%"
						pt={8}
						px={2}
					>
						<Heading fontSize={22} mr={4}>
							Webfejlesztés
						</Heading>
						<SunIcon
							onClick={() => toggleColorMode()}
							transition="all 0.2s"
							cursor="pointer"
							_hover={{ color: "gray.500" }}
							color="gray.400"
							h={5}
							w={5}
						/>
					</HStack>
					<SearchField />

					<Modules
						modules={lessons}
						activeIndex={lessons.findIndex(
							(less) => less.id === frontMatter.moduleSlug
						)}
					/>
				</VStack>
				<Content
					frontMatter={frontMatter}
					lessonContent={source}
					content={content}
				/>
			</Flex>
		</Box>
	);
};

Lesson.defaultProps = {
	source: "",
	frontMatter: { title: "default title", summary: "summary", publishedOn: "" },
	lessons: [],
	content: "",
};

export default Lesson;

export const getStaticPaths: GetStaticPaths = () => {
	const lessonsPath = path.join(process.cwd(), "src", "lessons");
	const filenames = fs.readdirSync(lessonsPath);
	const slugs = filenames.map((name) => {
		const filePath = path.join(lessonsPath, name);
		const file = fs.readFileSync(filePath, "utf-8");
		const { data } = matter(file);
		return data;
	});

	return {
		paths: slugs.map((s) => ({ params: { lid: s.slug } })),
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
	const lessonsPath = path.join(process.cwd(), "src", "lessons");
	const filenames = fs.readdirSync(lessonsPath);
	let currentFileName;
	const slugs = filenames.map((name) => {
		const filePath = path.join(lessonsPath, name);
		const file = fs.readFileSync(filePath, "utf-8");
		const { data } = matter(file);
		if (data.slug === params?.lid) {
			currentFileName = name;
		}
		return data;
	});

	const modules = new Set(slugs.map((slg) => slg.moduleSlug));
	const lessons = Array.from(modules).map((mod) => {
		return {
			title: slugs.find((slg) => slg.moduleSlug === mod)?.module || "",
			icon: slugs.find((slg) => slg.moduleSlug === mod)?.icon || "",
			lessons: slugs
				.filter((slg) => slg.moduleSlug === mod)
				.map((slg) => ({
					title: slg.title,
					id: slg.slug,
				})),
			disabled: !slugs.filter((slg) => slg.moduleSlug === mod),
			id: slugs.find((slg) => slg.moduleSlug === mod)?.moduleSlug || "",
		};
	});

	let lesson;
	try {
		const filesPath = path.join(
			process.cwd(),
			"src",
			"lessons",
			`${currentFileName}`
		);
		lesson = fs.readFileSync(filesPath, "utf-8");
	} catch (err) {
		console.error(err);
	}

	const { data, content } = matter(lesson || "");
	const mdxSource = await serialize(content || "", { scope: data });

	return {
		props: {
			source: mdxSource,
			frontMatter: data,
			lessons: lessons,
			content,
		},
	};
};
