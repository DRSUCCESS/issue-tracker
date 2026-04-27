"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import z from "zod";
import dynamic from "next/dynamic";
import ErrorMessage from "@/app/api/issues/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });


type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
    const router = useRouter();

    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
        defaultValues: {
            title: '',
            description: ''
        }
    });

    const [error, setError] = useState('');
    const [isSubmit, setSubmit] = useState(false);

    return (
        <div className="max-w-xl">
            {error && (<Callout.Root color="red" className="mb-5"><Callout.Text>{error}</Callout.Text></Callout.Root>)}

            <form className="space-y-3"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        setSubmit(true);
                        await axios.post('/api/issues', data);
                        router.push('/issues');
                    } catch (error) {
                        setSubmit(false);
                        setError('An unexpected error occurred.')
                    }
                })}>
                <TextField.Root placeholder="Title" {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <Controller
                    name="description"
                    control={control}
                    render={({ field: { value, onChange } }) =>
                        <SimpleMDE placeholder="Description" value={value || ""} onChange={onChange} />
                    } />

                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmit}>Submit New Issue {isSubmit && <Spinner />}</Button>
            </form>
        </div>
    );
}