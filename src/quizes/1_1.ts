export const q1_1 = [
	{
		type: "radio",
		title: "What Is The Time?",
		initialValue: [],
		options: [
			{
				name: "Tewlwe o clock",
				description: "This is a very long description for test purpuses.",
				icon: "mobile",
			},
			{
				name: "Tewlwe o clock",
				description: "This is a very long description for test purpuses.",
				icon: "moon",
			},
			{
				name: "Tewlwe o clock",
				description: "This is a very long description for test purpuses.",
				icon: "hand",
			},
		],
	},
	{
		type: "radio",
		title: "How Are You?",
		initialValue: -1,
		options: [
			{
				name: "Guides",
				description: "",
				icon: "mobile",
			},
			{
				name: "Guides",
				description: "",
				icon: "moon",
			},
			{
				name: "Guides",
				description: "",
				icon: "hand",
			},
			{
				name: "Guides",
				description: "",
				icon: "computer",
			},
			{
				name: "Guides",
				description: "",
				icon: "computer",
			},
		],
	},
	{
		type: "textInput",
		title: "What is your name?",
		initialValue: ["", ""],
		fields: [
			{ placeholder: "Name", icon: "hand" },
			{ placeholder: "Age", icon: "code" },
		],
	},
	{
		type: "complete",
		initialValue: ["", ""],
		title: "Complete the sentence!",
		text: "We use the --- tag to wrap things and we style it with the --- component.",
	},
];
