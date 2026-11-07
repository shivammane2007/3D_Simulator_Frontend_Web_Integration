import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { fullName, email, phone, practiceName, role, proceduresPerMonth, message, source } = body;

        if (!fullName || !email) {
            return NextResponse.json({ error: 'Full name and email are required' }, { status: 400 });
        }

        console.log('[DEMO_REQUEST_RECEIVED]', {
            fullName,
            email,
            phone,
            practiceName,
            role,
            proceduresPerMonth,
            message,
            source,
            timestamp: new Date().toISOString(),
        });

        // Forward to webhook if configured
        const webhookUrl = process.env.N8N_WEBHOOK_URL || process.env.DEMO_REQUEST_WEBHOOK_URL;
        if (webhookUrl) {
            try {
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'demo_request',
                        fullName,
                        email,
                        phone,
                        practiceName,
                        role,
                        proceduresPerMonth,
                        message,
                        source,
                        timestamp: new Date().toISOString(),
                    }),
                    signal: AbortSignal.timeout(5000),
                });
            } catch (err) {
                console.error('[DEMO_REQUEST_WEBHOOK_ERROR]', err);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[API_ERROR] demo-request:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

