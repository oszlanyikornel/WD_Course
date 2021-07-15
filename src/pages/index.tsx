import { Box, Center, Flex, Heading, Spinner, VStack } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";
import Content from "../components/Content/Content";
import Modules, { ModuleType } from "../components/Modules/Modules";
import SubMenu from "../components/Content/SubMenu";
import Scrollspy from "react-scrollspy";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		router.push("/known-raises");
	}, []);

	return (
		<Center w="100%" h="100%">
			<Spinner thickness="6px" color="gray.600" h={32} w={32} />
		</Center>
	);
}
