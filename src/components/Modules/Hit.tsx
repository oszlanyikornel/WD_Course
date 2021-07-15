import {
	Box,
	Center,
	HStack,
	VStack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import { connectStateResults, Highlight } from "react-instantsearch-dom";
import ModuleIconFactory from "./ModuleIconFactory";

interface HitProps {
	hit: any;
	onClose: () => void;
}

const Hit: FC<HitProps> = ({ hit, onClose }) => {
	const grayTextCol = useColorModeValue("gray.500", "gray.500");
	const boxBg = useColorModeValue("gray.75", "gray.750");
	const IconCol = useColorModeValue("gray.400", "gray.500");
	const whiteTextCol = useColorModeValue("gray.800", "gray.100");
	const boxHovBg = useColorModeValue("gray.100", "gray.775");

	return (
		<>
			{/*JSON.stringify(hit)*/}
			<Link key={hit.objectID} href={`/${hit.lessonSlug}#${hit.subLessonSlug}`}>
				<a style={{ width: "100%" }} onClick={() => onClose()}>
					<HStack
						cursor="pointer"
						rounded="xl"
						_hover={{ bg: boxHovBg }}
						maxH="100%"
						w="100%"
						transition="all 0.2s"
						bg={boxBg}
						px={7}
						spacing={7}
						py={3}
					>
						<Center color={IconCol} h={6} w={6}>
							<ModuleIconFactory icon={hit.moduleSlug} />
						</Center>
						<VStack spacing={0} alignItems="start">
							<Text color={grayTextCol} fontWeight="normal" fontSize="sm">
								<Highlight tagName="mark" hit={hit} attribute="module" />
								{" - "}
								<Highlight tagName="mark" hit={hit} attribute="lesson" />
							</Text>
							<Text color={whiteTextCol} fontWeight="semibold" fontSize="md">
								<Highlight tagName="mark" hit={hit} attribute="subLesson" />
							</Text>
						</VStack>
					</HStack>
				</a>
			</Link>
		</>
	);
};

export default Hit;

/*
<VStack
	px={4}
	maxH={500}
	py={4}
	overflowY="auto"
	rounded="xl"
	bg={fullBg}
	w="100%"
>
	{!results || results.length === 0 ? (
		<Center maxH="100%" w="100%" py={3}>
			<Text fontWeight="semibold" color={grayTextCol2}>
				Nincs Találat
			</Text>
		</Center>
	) : (
		results.map((result) => {
			return (
				);
		})
	)}
</VStack>; */
