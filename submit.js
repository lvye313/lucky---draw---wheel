import { kv } from '@vercel/kv';

export default async (req, res) => {
  const { phone } = req.body;

  // 验证手机号格式
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    return res.status(400).json({ error: '手机号格式错误' });
  }

  try {
    // 将数据存入中央数据库
    await kv.lpush('central_submissions', JSON.stringify({
      phone,
      timestamp: new Date().toISOString(),
      device: req.headers['user-agent'] || 'unknown'
    }));

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: '提交失败，请重试' });
  }
};