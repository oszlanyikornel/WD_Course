import { MoonIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Center,
	Grid,
	Heading,
	HStack,
	Text,
	VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ModuleIconFactory from "../../Modules/ModuleIconFactory";
import CompleteInputQuestion from "./CompleteInputQuestion";
import RadioQuestion from "./RadioQuestion";
import TextInputQuestion from "./TextInputQuestion";

const QuestionFactory = ({
	question,
	active,
}: {
	question: any;
	active: number;
}) => {
	switch (question.type) {
		case "radio":
			return <RadioQuestion active={active} options={question.options} />;
		case "textInput":
			return <TextInputQuestion question={question} active={active} />;
		case "complete":
			return <CompleteInputQuestion question={question} active={active} />;
		default:
			return <RadioQuestion active={active} options={question.options} />;
	}
};

export default QuestionFactory;
