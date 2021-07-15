import {
	Box,
	Heading,
	HStack,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import { MDXRemote } from "next-mdx-remote";
import React, { FC, JSXElementConstructor, ReactElement } from "react";
import { mdxComponents } from "../mdxCompnents/mdxComponents";
import { renderToString } from "react-dom/server";
import SubMenu from "./SubMenu";

interface ContentProps {
	lessonContent: any;
	content: string;
	frontMatter: Record<string, any>;
}

const Content: FC<ContentProps> = ({ lessonContent, content, frontMatter }) => {
	const cententBgColor = useColorModeValue("white", "gray.900");
	const cententColor = useColorModeValue("gray.900", "white");

	return (
		<HStack
			as="div"
			alignItems="start"
			spacing={0}
			bg={cententBgColor}
			px={20}
			py={10}
			pr={0}
			h="100%"
			w="100%"
			overflowY="auto"
			color={cententColor}
		>
			<VStack spacing={8} alignItems="start" w="100%">
				<Heading color="green.400" size="2xl" as="h1">
					{frontMatter.title}
				</Heading>
				<MDXRemote {...lessonContent} components={mdxComponents} lazy />
			</VStack>
			<SubMenu content={content} />
		</HStack>
	);
};

export default Content;
