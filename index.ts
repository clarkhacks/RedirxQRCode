const qr = require('qr-image')

export default {
  async fetch(
    req: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(req.url)
    const text = url.searchParams.get('url') || 'https://my.redirx.top'

    if (req.method === 'GET') {
      return generateQRCode(text)
    }

    return new Response('Method not allowed', { status: 405 })
  },
}

async function generateQRCode(text: string): Promise<Response> {
  const headers = {
    'Content-Type': 'image/png',
    'Cache-Control': 'public, max-age=31536000', // 1 year cache
    'Content-Disposition': `inline; filename="qr-${text
      .replace(/^https?:\/\//, '')
      .replace(/[^a-z0-9]/gi, '_')}.png"`,
  }
  const options = {
    type: 'png',
    margin: 1,
  }
  const qr_png = qr.imageSync(text, options)
  return new Response(qr_png, { headers })
}
