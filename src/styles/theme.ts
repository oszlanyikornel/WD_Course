// theme.ts
// 1. import `extendTheme` function
import { extendTheme, ThemeConfig } from "@chakra-ui/react";
// 2. Add your color mode config
const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: false,
};
// 3. extend the theme
const theme = extendTheme({
	config,
	colors: {
		gray: {
			75: "#F1F7FB",
			750: "#262F40",
			775: "#222A39",
		},
		// ...
	},
});
export default theme;
