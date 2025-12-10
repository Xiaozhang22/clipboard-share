// Cloudflare Pages Functions - 处理多槽位剪贴板 API

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const slot = url.searchParams.get('slot') || '1';
  
  try {
    const content = await env.CLIPBOARD_KV.get(`clipboard_${slot}`);
    return new Response(JSON.stringify({ content: content || '' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: '读取失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const slot = url.searchParams.get('slot') || '1';
  
  // 验证槽位范围
  const slotNum = parseInt(slot);
  if (isNaN(slotNum) || slotNum < 1 || slotNum > 10) {
    return new Response(JSON.stringify({ error: '无效槽位' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const { content } = await request.json();
    
    if (!content || typeof content !== 'string') {
      return new Response(JSON.stringify({ error: '无效内容' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 存储内容，设置24小时过期
    await env.CLIPBOARD_KV.put(`clipboard_${slot}`, content, {
      expirationTtl: 86400
    });
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: '保存失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
