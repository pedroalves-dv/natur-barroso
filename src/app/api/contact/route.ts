import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 });
  }

  const { name, email } = body as { name?: string; email?: string };

  if (!name || !email) {
    return NextResponse.json(
      { success: false, message: 'Name and email are required' },
      { status: 400 },
    );
  }

  // Resend integration wired in Phase 5
  console.log('[contact] New submission:', body);

  return NextResponse.json({ success: true, message: 'Message received' });
}
