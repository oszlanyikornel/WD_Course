/* eslint-disable react/display-name */

import {
	Heading,
	ListItem,
	OrderedList,
	Text,
	UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import CodeBlock from "./CodeBlock";
import Quiz from "./Quiz/Quiz";

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
	CodeBlock: CodeBlock,
	Quiz: Quiz,
};
