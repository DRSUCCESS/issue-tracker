import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/clients';
import { createIssueSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.message, { status: 400 });

    const issue = await prisma.issue.create({
        data: { title: validation.data.title, description: validation.data.description }
    });

    return NextResponse.json(issue, { status: 201 });
}