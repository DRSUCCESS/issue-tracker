import { Button, Flex, TextArea, TextField } from "@radix-ui/themes";

export default function NewIssuePage() {
	return (
		<Flex gap="4" direction="column" maxWidth="25rem">
			<TextField.Root placeholder="Title" />
			<TextArea placeholder="Description" />
			<Button>Submit New Issue</Button>
		</Flex>
	);
}