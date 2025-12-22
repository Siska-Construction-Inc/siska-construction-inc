import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const EMAIL_TO = process.env.EMAIL_TO || 'contact@siskaconstructioninc.com';
const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev';

let resend: Resend | null = null;
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!resend) resend = new Resend(key);
  return resend;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  const client = getResend();
  if (!client) {
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

    await client.emails.send({
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
