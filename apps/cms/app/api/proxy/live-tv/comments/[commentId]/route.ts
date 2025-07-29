import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

const WEB_API_URL = process.env.WEB_API_URL || 'web-sage-rho-41.vercel.app/api';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { commentId } = await params;

    const response = await fetch(`${WEB_API_URL}/live-tv/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Cookie': request.headers.get('cookie') || '',
      }
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error deleting Live TV comment:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}

// Pastikan targetUrl sudah didefinisikan, misal:
const targetUrl = "https://api.example.com/comments"; // Ganti sesuai kebutuhan

const apiResponse = await fetch(targetUrl, { /* ...existing code... */ });
const data = await apiResponse.json();
// Perbaiki penggunaan map/forEach, misal:
const comments = Array.isArray(data) ? data.map(item => {
  // ...proses item...
  return item;
}) : [];
