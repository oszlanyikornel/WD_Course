import { Button, Center, Heading, VStack, Image } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const FourOFour = () => {
	return (
		<Center justifyContent="center" w="100%" h="100%">
			<VStack spacing={0}>
				<Image src="/404.svg" alt="404" h={400} />
				<VStack pb={10}>
					<Heading pb={3}>Lost In The Void</Heading>
					<Link href="/">
						<a>
							<Button
								_hover={{ bg: "green.500" }}
								_focus={{ bg: "green.500", transform: "scale(95%)" }}
								_active={{ bg: "green.500", transform: "scale(95%)" }}
								bg="green.400"
								color="white"
							>
								Fly Home
							</Button>
						</a>
					</Link>
				</VStack>
			</VStack>
		</Center>
	);
};

export default FourOFour;
