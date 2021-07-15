import { Center, useColorModeValue } from "@chakra-ui/react";
import React, { FC } from "react";
import { connectStateResults } from "react-instantsearch-dom";

const Results = connectStateResults((({
	searchState,
	searchResults,
	children,
}: {
	searchState: any;
	searchResults: any;
	children: any;
}) => {
	const fullBg = useColorModeValue("white", "gray.700");
	const grayTextCol2 = useColorModeValue("gray.400", "gray.500");

	if (!searchResults || searchResults.nbHits === 0) {
		return (
			<Center color={grayTextCol2} rounded="xl" bg={fullBg} w="100%" py={6}>
				No result
			</Center>
		);
	} else if (searchState.query) {
		return children;
	} else {
		return null;
	}
}) as FC);

export default Results;
