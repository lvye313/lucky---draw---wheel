import { kv } from '@vercel/kv';

export default async (req, res) => {
  // 密码验证（简易版）
  if (req.headers.authorization !== process.env.ADMIN_PWD) {
    return res.status(403).json({ error: '无权访问' });
  }

  try {
    // 从中央数据库获取全部数据
    const data = await kv.lrange('central_submissions', 0, -1);
    res.status(200).json(data.map(JSON.parse));
  } catch (error) {
    res.status(500).json({ error: '获取数据失败' });
  }
};