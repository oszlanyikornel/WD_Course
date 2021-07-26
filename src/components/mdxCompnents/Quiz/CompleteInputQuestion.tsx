import {
	Box,
	Editable,
	EditableInput,
	EditablePreview,
	Input,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useFormikContext } from "formik";

const CompleteInputQuestion = ({
	question,
	active,
}: {
	question: any;
	active: any;
}) => {
	const borderColor = useColorModeValue("gray.300", "gray.600");
	const {
		values,
		setFieldValue,
	}: {
		values: any;
		setFieldValue: (field: string, val: string | string[]) => void;
	} = useFormikContext();

	return (
		<Box
			w="100%"
			pt={4}
			pb={2}
			px={6}
			border="1px"
			rounded="xl"
			borderColor={borderColor}
		>
			{question.text.split("---").map((chunk: any, index: any) => {
				return (
					<>
						<Text as="span">{chunk}</Text>
						{index !== question.text.split("---").length - 1 ? (
							<Input
								_focus={{
									borderColor: "green.400",
								}}
								borderColor={
									values[`a${active}`][index] ? "green.400" : borderColor
								}
								_hover={
									values[`a${active}`][index]
										? { borderColor: "green.400" }
										: { borderColor: "gray.300" }
								}
								size="sm"
								rounded="lg"
								value={values[`a${active}`][index]}
								onChange={(e) => {
									setFieldValue(
										`a${active}`,
										values[`a${active}`].map((v: any, i: any) => {
											if (i === index) {
												return e.target.value;
											} else {
												return v;
											}
										})
									);
								}}
								mx={2}
								mb={2}
								w={24}
								display="inline"
							/>
						) : null}
					</>
				);
			})}
		</Box>
	);
};

export default CompleteInputQuestion;
