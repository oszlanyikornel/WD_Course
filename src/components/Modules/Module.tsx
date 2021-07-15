import { EmailIcon } from "@chakra-ui/icons";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	useColorModeValue,
} from "@chakra-ui/react";
import { CodeIcon } from "@heroicons/react/solid";
import React, { FC } from "react";
import Lesson from "./Lesson";
import ModuleIconFactory from "./ModuleIconFactory";
import { ModuleType } from "./Modules";
interface ModuleProps {
	module: ModuleType;
	isFirst: boolean;
	isLast: boolean;
	isPrevOpened: boolean;
}
const Module: FC<ModuleProps> = ({ module, isFirst, isLast, isPrevOpened }) => {
	const moduleTitleCol = useColorModeValue("gray.500", "gray.400");
	const moduleIconCol = useColorModeValue("gray.400", "gray.500");
	const moduleTitleFocusCol = useColorModeValue("gray.700", "gray.100");
	const moduleTitleHovCol = useColorModeValue("gray.700", "gray.100");

	return (
		<AccordionItem
			mb={0.5}
			w={250}
			outline={0}
			border="none"
			_focus={{ outline: "none" }}
			isDisabled={module.disabled}
		>
			{({ isExpanded }) => (
				<>
					<AccordionButton
						as={Button}
						variant="unstyled"
						pl={0}
						borderColor="transparent"
						outlineColor="transparent"
						style={{ outline: "none !important" }}
						color={isExpanded ? "green.400" : moduleTitleCol}
						leftIcon={
							<Box
								mr={1.5}
								w={4}
								h={4}
								color={isExpanded ? "green.400" : moduleIconCol}
							>
								{<ModuleIconFactory icon={module.icon} />}
							</Box>
						}
						_focus={
							isExpanded
								? { color: "green.400", boxShadow: "none" }
								: { color: moduleTitleFocusCol, boxShadow: "none" }
						}
						_hover={
							isExpanded ? { color: "green.400" } : { color: moduleTitleHovCol }
						}
					>
						<Box flex="1" textAlign="left">
							{module.title}
						</Box>
					</AccordionButton>

					<AccordionPanel pb={4} px={0} py={0}>
						{module.lessons.map((lesson, index) => {
							return (
								<Lesson
									isLast={module.lessons.length === index + 1}
									index={index}
									key={lesson.id}
									lesson={lesson}
								/>
							);
						})}
					</AccordionPanel>
				</>
			)}
		</AccordionItem>
	);
};

export default Module;
