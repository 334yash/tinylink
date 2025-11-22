import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    version: "1.0",
    uptime: performance.now(),
    timestamp: new Date().toISOString()
  });
}