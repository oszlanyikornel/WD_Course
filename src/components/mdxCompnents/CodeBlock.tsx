import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism";
interface CodeBlockType {
	fileName: string;
	id: number;
	code: string;
	language: string;
}
interface CodeBlockProps {
	codeBlocks: CodeBlockType[];
	showNames: boolean;
	renderIndex: number;
	showLineNumbers: boolean;
}

const CodeBlock: FC<CodeBlockProps> = ({
	codeBlocks,
	showNames,
	renderIndex,
	showLineNumbers,
}) => {
	const [currentBlock, setCurrentBlock] = useState(codeBlocks[renderIndex]);

	const customStyle = {
		width: "100%",
		paddingLeft: "1.5rem",
		paddingRight: "1.5rem",
		paddingTop: "0.75rem",
		paddingBottom: "1rem",
		background: "#222A39",
		line: "#222A39",
		boxShadow: "none",
	};
	const codeString = "const Comp = () => { return <div>Hy</div>}";
	return (
		<VStack
			w="100%"
			bg="#222A39"
			rounded="lg"
			overflow="hidden"
			px={0}
			py={0}
			marginY={8}
		>
			{showNames && (
				<Files
					currentBlock={currentBlock}
					files={codeBlocks}
					setCurrentBlock={setCurrentBlock}
				/>
			)}

			<SyntaxHighlighter
				codeTagProps={{ className: "codeLine" }}
				showLineNumbers={showLineNumbers}
				wrapLines={true}
				customStyle={customStyle}
				language={currentBlock.language}
				style={materialOceanic}
			>
				{currentBlock.code}
			</SyntaxHighlighter>
		</VStack>
	);
};

const Files = ({
	files,
	currentBlock,
	setCurrentBlock,
}: {
	files: CodeBlockType[];
	currentBlock: CodeBlockType;
	setCurrentBlock: (val: CodeBlockType) => void;
}) => {
	return (
		<HStack color="gray.700" borderBottom="1px" spacing={0} w="100%">
			{files.map((file, index) => {
				const isActive = currentBlock.fileName === file.fileName;
				return (
					<Button
						onClick={() => setCurrentBlock(file)}
						color={isActive ? "gray.300" : "gray.500"}
						fontWeight="semibold"
						variant="ghost"
						rounded="none"
						borderBottom="2px"
						borderColor={isActive ? "green.400" : "transparent"}
						_active={{
							bg: "#293840",
						}}
						bg={isActive ? "transparent" : "transparent"}
						_hover={{
							bg: "#293840",
						}}
						_focus={{ outline: "none" }}
						key={index + file.fileName}
						h="100%"
						py={3}
						px={4}
					>
						{file.fileName}
					</Button>
				);
			})}
		</HStack>
	);
};

export default CodeBlock;

/*

color: rgb(195, 206, 227); background: rgb(34, 42, 57); font-family: "Roboto Mono", monospace; font-size: 1em; line-height: 1.5em; tab-size: 4; hyphens: none; overflow: auto; position: relative; margin: 0.5em 0px; padding: 0.75rem 1.5rem 1rem; width: 100%;

*/
