"use client";

import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState } from "react";

export default function NewIssuePage() {
	const [description, setDescription] = useState("");

	return (
		<div className="max-w-xl space-y-3">
			<TextField.Root placeholder="Title" />
			<SimpleMDE value={description} onChange={setDescription} placeholder="Description" />
			<Button>Submit New Issue</Button>
		</div>
	);
}