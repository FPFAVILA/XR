export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type, x-pushinpay-token')
      .end();
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-pushinpay-token');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validar token do webhook
    const webhookToken = req.headers['x-pushinpay-token'];
    
    if (process.env.PUSHINPAY_WEBHOOK_TOKEN && webhookToken !== process.env.PUSHINPAY_WEBHOOK_TOKEN) {
      console.warn('Invalid webhook token received');
      // Retornar 200 mesmo com token inválido para não expor informações
      return res.status(200).json({ received: true });
    }

    const { id, status, value, created_at, updated_at } = req.body;

    // Logar dados recebidos
    console.log('Webhook received:', {
      id,
      status,
      value: value / 100, // Converter de centavos para reais no log
      created_at,
      updated_at,
    });

    // Aqui você pode adicionar lógica adicional como:
    // - Atualizar banco de dados
    // - Enviar email de confirmação
    // - Notificar outros sistemas

    // Sempre retornar 200 para o webhook
    return res.status(200).json({ 
      received: true,
      transaction_id: id,
      status: status 
    });

  } catch (error) {
    console.error('Error processing webhook:', error);
    // Retornar 200 mesmo com erro para não causar retry do webhook
    return res.status(200).json({ received: true, error: error.message });
  }
}
