import { hash } from 'bcrypt';
import prisma from '@@/prisma/client';
import { signupSchema } from '@/schemas/auth';
import { NextRequest, NextResponse } from 'next/server';
import { prismaExclude } from '@@/prisma/prisma-exclude';

export async function POST(request: NextRequest) {
  // Get request body
  const body =
    (await request
      .json()
      .catch(() => NextResponse.json({ error: 'Invalid request format' }, { status: 400 }))) ??
    null;

  const validation = signupSchema.safeParse(body);

  // If not, return error
  if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

  // Check if user already exists
  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (user) return NextResponse.json({ error: 'User already   exists' }, { status: 400 });

  const hashedPassword = await hash(body.password, 12);

  // Create new User
  await prisma.user.create({
    data: { name: body.name, email: body.email, password: hashedPassword },
  });

  // Get new user without sensitive data
  const newUser = await prisma.user.findUnique({
    where: { email: body.email },
    select: prismaExclude('User', ['password', 'role']),
  });

  return NextResponse.json(newUser, { status: 201 });
}
