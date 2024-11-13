// src/types/api/createnote.d.ts
//用于新建笔记以及新建文档

// 新建笔记请求数据类型
export interface CreateNoteRequest {
  title: string;   // 笔记标题
  content: string; // 笔记内容
}

// 新建笔记响应数据类型
export interface CreateNoteResponse {
  code: number;          // 状态码，0表示成功
  msg: string;           // 状态消息
  data: {
    id: number;          // 笔记ID
    user_id: number;     // 用户ID
    title: string;       // 笔记标题
    content: string;     // 笔记内容
    created_at: string;  // 创建时间
  };
}
