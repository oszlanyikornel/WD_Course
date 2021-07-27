/* eslint-disable react/display-name */

import {
	Heading,
	ListItem,
	OrderedList,
	Text,
	UnorderedList,
	Image,
	Center,
} from "@chakra-ui/react";
import React from "react";
import CodeBlock from "./CodeBlock";
import Quiz from "./Quiz/Quiz";
import { Widget } from "@typeform/embed-react/build";

const H2 = (props: any) => {
	const anchor = props.children.replace(/ /g, "_").toLowerCase();

	return <Heading my={8} as="h2" id={anchor} {...props} />;
};

export const mdxComponents = {
	h1: (props: any) => <Heading {...props} as="h1" />,
	h2: H2,
	h3: (props: any) => <Heading {...props} as="h3" />,
	h4: (props: any) => <Heading {...props} as="h4" />,
	h5: (props: any) => <Heading {...props} as="h5" />,
	p: (props: any) => <Text my={4} {...props} as="p" />,
	ul: (props: any) => <UnorderedList my={6} pl={4} {...props} as="ul" />,
	ol: (props: any) => <OrderedList my={6} pl={4} {...props} as="ul" />,
	li: (props: any) => <ListItem {...props} as="li" />,
	Image: ({
		alignImage,
		alt,
		...other
	}: {
		alignImage: string | undefined | null;
		alt: string | undefined | null;
	}) => (
		<Center
			my={14}
			w="100%"
			flexDirection="column"
			alignItems={alignImage || "center"}
		>
			<Image {...other} alt={alt || ""} />
		</Center>
	),
	CodeBlock: CodeBlock,
	Quiz: Quiz,
	Widget: (props: any) => <Widget {...props} />,
};
