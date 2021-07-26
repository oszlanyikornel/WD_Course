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
import QuestionFactory from "./QuestionFactory";
import { Form, Formik } from "formik";
import { q1_1 } from "../../../quizes/1_1";

const Quiz = ({ src }: { src: any }) => {
	const [active, setActive] = useState(0);
	// TODO put quit in center of hr + instruction next to question title
	const handleFormSubmit = ({ values }: { values: any }) => {
		console.log(values);
	};

	let questions: any[];

	switch (src) {
		case "1_1":
			questions = q1_1;
		default:
			questions = q1_1;
	}

	const initV: any = {};
	questions.forEach((q, i) => {
		initV[`a${i}`] = q.initialValue;
	});

	const textColor = useColorModeValue("gray.700", "gray.200");
	const borderColor = useColorModeValue("gray.300", "gray.600");

	let correct = 0;

	return (
		<VStack alignItems="start" spacing={6} w="100%" py={8}>
			<Formik
				initialValues={initV}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
					}, 400);
				}}
			>
				{({ submitForm, isSubmitting }) => (
					<Form style={{ width: "100%" }} id="form">
						<HStack>
							<hr style={{ width: "100%" }} />
							<Text fontWeight="semibold" color="gray.400" px={8} as="span">
								Teszt
							</Text>
							<hr style={{ width: "100%" }} />
						</HStack>
						<Heading mt={12} mb={6} size="lg" pl={2}>
							{questions && questions[active] && questions[active].title}
						</Heading>
						{questions.length - 1 < active ? (
							<Center w="100%" py={4} mb={10}>
								<Text
									color="green.400"
									fontWeight="semibold"
									fontSize="xl"
									mr={2}
								>
									{correct || ""}
								</Text>
								<Text fontWeight="semibold" fontSize="xl" mr={2}>
									/
								</Text>
								<Text fontWeight="semibold" fontSize="xl" mr={2}>
									{questions.length}
								</Text>
								<Text fontWeight="semibold" fontSize="xl" mr={2}>
									pont
								</Text>
							</Center>
						) : (
							<>
								<QuestionFactory active={active} question={questions[active]} />

								<HStack mb={12} mt={6} w="100%" justifyContent="space-between">
									<Button
										fontSize="md"
										_focus={{
											borderColor: "green.400",
										}}
										onClick={() => setActive((prewIdx) => prewIdx - 1)}
										disabled={active === 0}
										variant="outline"
										borderColor={borderColor}
										color={textColor}
										size="lg"
									>
										Back
									</Button>

									<Button
										fontSize="md"
										_focus={{
											borderColor: "green.400",
										}}
										onClick={() => {
											if (!(active >= questions.length - 1)) {
												setActive((prewIdx) => prewIdx + 1);
											} else {
												submitForm();
												setActive((prewIdx) => prewIdx + 1);
											}
										}}
										variant="outline"
										borderColor={borderColor}
										color={textColor}
										size="lg"
									>
										{active >= questions.length - 1 ? "Submit" : "Next"}
									</Button>
								</HStack>
							</>
						)}
						<hr />
					</Form>
				)}
			</Formik>
		</VStack>
	);
};

export default Quiz;
