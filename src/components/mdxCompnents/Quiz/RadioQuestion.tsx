import { MoonIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Center,
	Grid,
	Heading,
	HStack,
	Text,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ModuleIconFactory from "../../Modules/ModuleIconFactory";
import { useFormikContext } from "formik";

const RadioQuestion = ({
	options,
	active,
}: {
	options: any[];
	active: number;
}) => {
	const {
		values,
		setFieldValue,
	}: {
		values: any;
		setFieldValue: (field: string, val: number | number[]) => void;
	} = useFormikContext();
	const textColor = useColorModeValue("gray.700", "gray.200");
	const borderColor = useColorModeValue("gray.300", "gray.600");
	const hoverColor = useColorModeValue("gray.50", "gray.800");

	return (
		<Grid
			gap={4}
			templateColumns={options.length < 5 ? "1fr 1fr" : "1fr 1fr 1fr"}
			w="100%"
		>
			{options.map((option, index) => {
				const isActive = Array.isArray(values[`a${active}`])
					? values[`a${active}`].includes(index)
					: values[`a${active}`] === index;
				return (
					<HStack
						onClick={() => {
							if (Array.isArray(values[`a${active}`])) {
								console.log(!values[`a${active}`].includes(index));
								if (!values[`a${active}`].includes(index)) {
									setFieldValue(`a${active}`, [...values[`a${active}`], index]);
								} else {
									setFieldValue(
										`a${active}`,
										values[`a${active}`].filter((v: number) => v !== index)
									);
								}
							} else {
								setFieldValue(`a${active}`, index);
							}
						}}
						transition="all 0.2s"
						_hover={{
							bg: hoverColor,
						}}
						_active={{
							bg: hoverColor,
						}}
						cursor="pointer"
						border="1px"
						borderColor={isActive ? "green.400" : borderColor}
						spacing={6}
						px={5}
						py={4}
						rounded="xl"
						alignItems="center"
						key={index}
					>
						<Center
							transition="all 0.2s"
							bg={isActive ? "rgba(72, 187, 120, 0.25)" : "transparent"}
							color={isActive ? "green.400" : "gray.400"}
							p={4}
							rounded="xl"
						>
							<Box w={6} h={6}>
								<ModuleIconFactory icon={option.icon} />
							</Box>
						</Center>
						<VStack spacing={1} alignItems="start">
							<Text
								fontSize={!option.description ? "lg" : "sm"}
								color={textColor}
								fontWeight="semibold"
							>
								{option.name}
							</Text>
							{option.description && (
								<Text fontSize="xs" color="gray.500" fontWeight="normal">
									{option.description}
								</Text>
							)}
						</VStack>
					</HStack>
				);
			})}
		</Grid>
	);
};

export default RadioQuestion;
