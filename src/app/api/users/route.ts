import prisma from '@@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { prismaExclude } from '@@/prisma/prisma-exclude';

import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    // Get users without sensitive data using prismaExclude function
    const users = await prisma.user.findMany({
      orderBy: { name: 'asc' },
      select: prismaExclude('User', ['password']),
    });

    // Return users list
    return NextResponse.json(users, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
  }
}
