import { SearchIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Input,
	InputGroup,
	InputLeftElement,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import SearchModal from "./SearchModal";

const SearchField = () => {
	const searchIconColor = useColorModeValue("gray.300", "gray.500");
	const inputCol = useColorModeValue("gray.300", "gray.600");
	const inputHovCol = useColorModeValue("gray.400", "gray.500");
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Box w="100%">
				<Button
					leftIcon={<SearchIcon mr={2} />}
					fontWeight="normal"
					onClick={() => onOpen()}
					color={inputCol}
					transition="all 0.2s"
					_hover={{
						bg: "transparent",
						color: inputHovCol,
						borderColor: inputHovCol,
					}}
					_active={{ bg: "transparent" }}
					_focus={{ bg: "transparent", borderColor: "green.400" }}
					borderColor={inputCol}
					cursor="pointer"
					colorScheme="green"
					placeholder="Keresés..."
					w="100%"
					variant="outline"
					justifyContent="start"
				>
					Keresés
				</Button>
			</Box>
			<SearchModal isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default SearchField;
