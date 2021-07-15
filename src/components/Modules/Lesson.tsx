import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import React, { FC } from "react";
import { LessonType } from "./Modules";
import Link from "next/link";
import { useRouter } from "next/router";

interface LessonProps {
	lesson: LessonType;
	index: number;
	isLast: boolean;
}
const Lesson: FC<LessonProps> = ({ lesson, index, isLast }) => {
	const router = useRouter();

	const lessonTitleCol = useColorModeValue("gray.400", "gray.500");

	const lessonTitleHovCol = useColorModeValue("gray.600", "gray.300");
	const lessonActiveCol = useColorModeValue("gray.600", "gray.300");

	return (
		<Link href={`/${lesson.id}`}>
			<a>
				<Text
					color={
						router.query.lid === lesson.id ? lessonActiveCol : lessonTitleCol
					}
					mb={isLast ? 2 : 0}
					transition="all 0.2s"
					fontSize="sm"
					fontWeight="semibold"
					rounded="xl"
					_hover={{ color: lessonTitleHovCol }}
					py={2}
					pl={10}
					w="100%"
				>
					{(index + 1).toString() + ". " + lesson.title}
				</Text>
			</a>
		</Link>
	);
};

export default Lesson;
