import { SearchIcon } from "@chakra-ui/icons";
import {
	Box,
	Input,
	InputGroup,
	InputLeftElement,
	useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { connectSearchBox, SearchBoxProps } from "react-instantsearch-dom";

export const CustomSearchBox = connectSearchBox(
	({ currentRefinement, refine }) => {
		const fullBg = useColorModeValue("white", "gray.700");

		return (
			<Box px={10} bg={fullBg} w="100%" rounded="xl">
				<InputGroup w="100%" py={5}>
					<InputLeftElement pointerEvents="none">
						<SearchIcon
							mr={8}
							h={5}
							w={5}
							transform="translateY(13px)"
							color="green.400"
						/>
					</InputLeftElement>
					<Input
						value={currentRefinement}
						onChange={(event) => refine(event.currentTarget.value)}
						colorScheme="green"
						size="lg"
						_focus={{ borderColor: "transpaent" }}
						placeholder="Keresés..."
						w="100%"
						variant="unstyled"
					/>
				</InputGroup>
			</Box>
		);
	}
);
