import regions from '@/json/regions.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(regions)
}
