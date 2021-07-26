import {
	Box,
	Grid,
	Input,
	InputGroup,
	InputLeftElement,
	useColorModeValue,
} from "@chakra-ui/react";
import { valueScaleCorrection } from "framer-motion/types/render/dom/projection/scale-correction";
import React, { FC } from "react";
import ModuleIconFactory from "../../Modules/ModuleIconFactory";
import { useFormikContext } from "formik";

interface TextInputQuestionProps {
	active: number;
	question: any;
}

const TextInputQuestion: FC<TextInputQuestionProps> = ({
	active,
	question,
}) => {
	const borderColor = useColorModeValue("gray.300", "gray.600");

	const {
		values,
		setFieldValue,
	}: {
		values: any;
		setFieldValue: (field: string, val: string | string[]) => void;
	} = useFormikContext();

	if (
		question.fields &&
		Array.isArray(question.fields) &&
		question.fields.length > 0
	) {
		return (
			<Grid
				gap={4}
				templateColumns={question.fields.length < 3 ? "1fr" : "1fr 1fr"}
			>
				{question.fields.map((field: any, index: number) => {
					return (
						<InputGroup key={field.placeholder + index} size="lg">
							<InputLeftElement pointerEvents="none">
								<Box color="gray.500" w={5} h={5} ml={1}>
									<ModuleIconFactory icon={field.icon || "hand"} />
								</Box>
							</InputLeftElement>
							<Input
								onChange={(e) => {
									if (Array.isArray(values[`a${active}`])) {
										setFieldValue(
											`a${active}`,
											values[`a${active}`].map((v: any, idx: any) => {
												if (idx === index) {
													return e.target.value;
												} else {
													return v;
												}
											})
										);
									} else {
										setFieldValue(`a${active}`, e.target.value);
									}
								}}
								value={
									Array.isArray(values[`a${active}`])
										? values[`a${active}`][index]
										: values[`a${active}`]
								}
								borderColor={
									values[`a${active}`][index] ? "green.400" : borderColor
								}
								_hover={
									values[`a${active}`][index]
										? { borderColor: "green.400" }
										: { borderColor: borderColor }
								}
								_focus={{
									borderColor: "green.400",
								}}
								w="100%"
								placeholder={question.placeholder || "Answer"}
							/>
						</InputGroup>
					);
				})}{" "}
			</Grid>
		);
	} else {
		return <div>No data</div>;
	}
};

export default TextInputQuestion;
