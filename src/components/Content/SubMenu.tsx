import { Box, Heading, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Scrollspy from "react-scrollspy";

const SubMenu = ({ content }: { content: string }) => {
	const [active, setActive] = useState(0);

	const getHeadings = (source: string) => {
		const headers = source.split("\n").filter((line) => line.match(/^##*\s/));

		const headings = headers.map((header) => ({
			text: header.replace("##", ""),
			link: "#" + header.replace("## ", "").replace(/ /g, "_").toLowerCase(),
		}));

		return headings;
	};

	const headings = getHeadings(content);
	return (
		<VStack
			alignItems="start"
			spacing={0}
			h="100%"
			pt={3}
			pr={6}
			pl={20}
			w={400}
			position="sticky"
			top={0}
		>
			<Heading size="md" mb={3}>
				Tartalom
			</Heading>
			{headings?.map((head, index) => {
				return (
					<Box
						w="100%"
						py={1}
						//px={6}
						fontSize="sm"
						transition="all 0.2s"
						fontWeight="semibold"
						onClick={() => setActive(index)}
						_hover={
							active === index ? { color: "green.500" } : { color: "gray.500" }
						}
						color={active === index ? "green.400" : "gray.400"}
						//borderLeft="2px"
						//bg={active === index ? "gray.100" : "white"}
						//borderColor={active === index ? "black" : "white"}
						key={head.link}
					>
						<a href={head.link}>{head.text}</a>
					</Box>
				);
			})}
		</VStack>
	);
};

export default SubMenu;
