import {
	Box,
	Editable,
	EditableInput,
	EditablePreview,
	Input,
	Text,
} from "@chakra-ui/react";
import React from "react";
import { useFormikContext } from "formik";

const CompleteInputQuestion = ({ question, active }) => {
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
			borderColor="gray.200"
		>
			{question.text.split("---").map((chunk, index) => {
				return (
					<>
						<Text as="span">{chunk}</Text>
						{index !== question.text.split("---").length - 1 ? (
							<Input
								_focus={{
									borderColor: "green.400",
								}}
								borderColor={
									values[`a${active}`][index] ? "green.400" : "gray.300"
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
										values[`a${active}`].map((v, i) => {
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
