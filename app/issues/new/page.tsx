"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { error } from "console";



interface IssueForm{
    title: string;
    description: string;
}

export default function NewIssuePage() {
	const [description,  setDescription] = useState("");
const {register, control, handleSubmit} = useForm<IssueForm>();
const router = useRouter();

const [error, setError] = useState('');

	return (
<div className="max-w-xl">
    {error && (<Callout.Root color="red" className="mb-5"><Callout.Text>{error}</Callout.Text></Callout.Root>)}

		<form className="space-y-3" 
        onSubmit={handleSubmit(async (data)=> {
           try {
            await  axios.post('/api/issues', data);
           router.push('/issues');
           } catch (error) {
            setError('An unexpected error occured.')
           }
        })}>
			<TextField.Root placeholder="Title" {...register('title')}/>
			<Controller
            name="description"
            control={control}
            render={({field: { value, onChange }}) => 
            <SimpleMDE placeholder="Description" value={value} onChange={onChange}/>
            }
            />
			<Button>Submit New Issue</Button>
		</form>
        </div>
	);
}