import {
	CloudIcon,
	CodeIcon,
	DatabaseIcon,
	DesktopComputerIcon,
	DeviceMobileIcon,
	FingerPrintIcon,
	HandIcon,
	PencilIcon,
} from "@heroicons/react/solid";
import React, { FC } from "react";
interface ModuleIconFactoryProps {
	icon: string;
}
const ModuleIconFactory: FC<ModuleIconFactoryProps> = ({ icon }) => {
	switch (icon) {
		case "code":
			return <CodeIcon />;
		case "hand":
			return <HandIcon />;
		case "about":
			return <HandIcon />;
		case "computer":
			return <DesktopComputerIcon />;
		case "cloud":
			return <CloudIcon />;
		case "database":
			return <DatabaseIcon />;
		case "mobile":
			return <DeviceMobileIcon />;
		case "auth":
			return <FingerPrintIcon />;
		case "style":
			return <PencilIcon />;
		case "html":
			return <PencilIcon />;
		default:
			return <CodeIcon />;
	}
};

export default ModuleIconFactory;

// clipboard cloud cog cube database desktop-computer device-mobile document.text filter finger-print hand home puzzle server
