import { Accordion, Box } from "@chakra-ui/react";
import React, { FC } from "react";
import Module from "./Module";
import { useRouter } from "next/router";

interface ModulesProps {
	modules: ModuleType[];
	activeIndex: number;
}
export interface ModuleType {
	title: string;
	icon: string;
	lessons: LessonType[];
	disabled: boolean;
	id: string;
}
export interface LessonType {
	title: string;
	id: string;
}

const Modules: FC<ModulesProps> = ({ modules, activeIndex }) => {
	const router = useRouter();

	return (
		<Box h="100%" pb={4}>
			<Accordion
				allowMultiple={false}
				allowToggle={true}
				defaultIndex={[activeIndex === -1 ? 0 : activeIndex]}
			>
				{modules.map((module, index) => {
					return (
						<Module
							isPrevOpened={false}
							isFirst={index === 0}
							isLast={modules.length === index + 1}
							module={module}
							key={module.id}
						/>
					);
				})}
			</Accordion>
		</Box>
	);
};

export default Modules;
