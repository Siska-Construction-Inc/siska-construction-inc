import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const EMAIL_TO = process.env.EMAIL_TO || 'contact@siskaconstructioninc.com';
const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev';

const resend = new Resend(RESEND_API_KEY);

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  if (!RESEND_API_KEY) {
    return NextResponse.json({ error: 'Missing RESEND_API_KEY on server' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { name, email, message, hp } = body || {};

    // Honeypot spam check
    if (hp) {
      return NextResponse.json({ ok: true });
    }

    if (!email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    if (email.length > 254 || message.length > 5000) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 400 });
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const subject = `Website contact${name ? ` — ${name}` : ''}`;
    const html = `
      <p><strong>From:</strong> ${escapeHtml(name || 'Anonymous')} &lt;${escapeHtml(email)}&gt;</p>
      <div>${escapeHtml(message).replace(/\n/g, '<br/>')}</div>
    `;

    await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
