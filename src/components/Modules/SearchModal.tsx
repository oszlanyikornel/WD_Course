// TODO defultopen get from router query
import { SearchIcon } from "@chakra-ui/icons";
import {
	Box,
	HStack,
	Text,
	Input,
	InputGroup,
	InputLeftElement,
	Modal,
	ModalContent,
	ModalOverlay,
	useColorModeValue,
	useDisclosure,
	VStack,
	Center,
	ScaleFade,
} from "@chakra-ui/react";
import { CodeIcon } from "@heroicons/react/solid";
import algoliasearch from "algoliasearch/lite";
import Link from "next/link";
import React, { FC, useState } from "react";
import ModuleIconFactory from "./ModuleIconFactory";
import {
	InstantSearch,
	SearchBox,
	Hits,
	InfiniteHits,
	Configure,
} from "react-instantsearch-dom";
import { CustomSearchBox } from "./CustomSearchField";
import Hit from "./Hit";
import Results from "./Results";

const searchClient = algoliasearch(
	process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
	process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API || ""
);

interface SearchModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const SearchModal: FC<SearchModalProps> = ({ isOpen, onClose }) => {
	const fullBg = useColorModeValue("white", "gray.700");
	const grayTextCol2 = useColorModeValue("gray.400", "gray.500");

	return (
		<Modal size="xl" isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent
				shadow="none"
				bg="transparent"
				w="100%"
				maxH="80%"
				rounded="xl"
			>
				<VStack w="100%" maxH={600} spacing={4}>
					<InstantSearch indexName="docs" searchClient={searchClient}>
						<Configure
							hitsPerPage={20}
							attributesToRetrieve={[
								"module",
								"moduleSlug",
								"lessonSlug",
								"lesson",
								"subLesson",
								"subLessonSlug",
							]}
							attributesToHighlight={["module", "lesson", "subLesson"]}
						/>
						<CustomSearchBox />
						<Results>
							<Box px={3} py={4} pb={2} rounded="xl" w="100%" bg={fullBg}>
								<InfiniteHits
									hitComponent={(props: any) => (
										<Hit {...props} onClose={onClose} />
									)}
								/>
							</Box>
						</Results>
					</InstantSearch>
				</VStack>
			</ModalContent>
		</Modal>
	);
};

export default SearchModal;

/* 
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
								value={srcVal}
								onChange={(e) => {
									setSrcVal(e.target.value);
									if (e.target.value.length > 1) {
										runQuery(e.target.value);
										onQueryOpen();
										setShowQuery(true);
									} else {
										onQueryClose();
										setShowQuery(false);
									}
								}}
								colorScheme="green"
								size="lg"
								_focus={{ borderColor: "transpaent" }}
								placeholder="Keresés..."
								w="100%"
								variant="unstyled"
							/>
						</InputGroup>
					</Box>
					 */
