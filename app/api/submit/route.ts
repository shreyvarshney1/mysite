// export const runtime = 'edge';

import { addRow } from '@/actions/authSheets';
import { validateEmail, validateString } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
) {
  const data = await req.json();
  const name = data.name;
  const senderEmail = data.email;
  const subject = data.subject;
  const message = data.message;
  if (!validateEmail(senderEmail)) {
    return NextResponse.json({ error: 'Invalid Email Address' });
  }
  if (!validateString(message, 5000) && !validateString(name, 500) && !validateString(subject, 500)){
    return NextResponse.json({ error: 'Invalid Input' });
  }
  const response = await addRow(data);
  if (response === null || typeof response === 'undefined') {
    return NextResponse.json({ error: 'Internal Server Error' });
  }
  return NextResponse.json({ response });
}