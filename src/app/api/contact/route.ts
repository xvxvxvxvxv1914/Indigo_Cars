import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, phone, email, car, budget, message } = body;

  if (!name || !phone) {
    return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
  }

  const { error: dbError } = await supabase.from('contact_inquiries').insert([{
    name,
    phone,
    email: email || null,
    car: car || null,
    budget: budget || null,
    message: message || null,
  }]);

  if (dbError) {
    console.error('Supabase insert error:', dbError);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const rows = [
      email    && `<tr><td style="padding:4px 0;color:#9ca3af;font-size:13px">Имейл</td><td style="padding:4px 0 4px 16px;color:#f3f4f6;font-size:13px">${escapeHtml(email)}</td></tr>`,
      car      && `<tr><td style="padding:4px 0;color:#9ca3af;font-size:13px">Автомобил</td><td style="padding:4px 0 4px 16px;color:#f3f4f6;font-size:13px">${escapeHtml(car)}</td></tr>`,
      budget   && `<tr><td style="padding:4px 0;color:#9ca3af;font-size:13px">Бюджет</td><td style="padding:4px 0 4px 16px;color:#f3f4f6;font-size:13px">€${escapeHtml(budget)}</td></tr>`,
      message  && `<tr><td style="padding:4px 0;color:#9ca3af;font-size:13px;vertical-align:top">Съобщение</td><td style="padding:4px 0 4px 16px;color:#f3f4f6;font-size:13px">${escapeHtml(message)}</td></tr>`,
    ].filter(Boolean).join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#0f1a33;font-family:sans-serif">
        <div style="max-width:520px;margin:32px auto;background:#161e38;border:1px solid rgba(105,30,185,0.3);border-radius:12px;overflow:hidden">
          <div style="background:linear-gradient(135deg,#691EB9,#4a158a);padding:20px 24px">
            <p style="margin:0;color:rgba(255,255,255,0.7);font-size:12px;text-transform:uppercase;letter-spacing:0.08em">Indigo Cars</p>
            <h1 style="margin:4px 0 0;color:#fff;font-size:20px;font-weight:700">Ново запитване</h1>
          </div>
          <div style="padding:24px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:4px 0;color:#9ca3af;font-size:13px">Име</td><td style="padding:4px 0 4px 16px;color:#f3f4f6;font-size:13px;font-weight:600">${escapeHtml(name)}</td></tr>
              <tr><td style="padding:4px 0;color:#9ca3af;font-size:13px">Телефон</td><td style="padding:4px 0 4px 16px;font-size:14px"><a href="tel:${encodeURIComponent(phone)}" style="color:#a78bfa;font-weight:700;text-decoration:none">${escapeHtml(phone)}</a></td></tr>
              ${rows}
            </table>
            <div style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08)">
              <a href="tel:${encodeURIComponent(phone)}" style="display:inline-block;background:linear-gradient(135deg,#691EB9,#4a158a);color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:600">Обади се сега</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'leads@thestormwatcher.com',
        to: 'indigocars@atomicmail.io',
        subject: `Ново запитване${car ? ` — ${car}` : ''} от ${name}`,
        html,
      }),
    }).catch(err => console.error('Resend error:', err));
  }

  return NextResponse.json({ success: true });
}
