import { Center } from "@chakra-ui/react";
import React from "react";
import CodeBlock from "../components/mdxCompnents/CodeBlock";
import Quiz from "../components/mdxCompnents/Quiz/Quiz";

export const codeBlocks = [
	{
		fileName: "modules.jsx",
		code: "const Comp = () => { return <div>Hy</div>}",
		id: 0,
		language: "jsx",
	},
	{
		fileName: "styles.jsx",
		code: `const theme = { 
            name: "kornel", 
            id: 3, 
            color: "red"
        }`,
		id: 1,
		language: "javascript",
	},
];

const test = () => {
	return <Center py={10} px={10}></Center>;
};

export default test;
