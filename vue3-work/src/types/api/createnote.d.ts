// src/types/api/createnote.d.ts
//用于新建笔记以及新建文档

// 定义请求体类型（如果有需要可以根据实际情况进行定义）
export interface MessageRequest {
  title: string;      // 消息标题
  content: string;    // 消息内容
  folder_id: number;  // 文件夹 ID
}

// 定义响应体类型
export interface MessageResponse {
  code: number;         // 状态码，0表示成功
  msg: string;          // 状态消息
  data: {
    id: number;         // 消息ID
    user_id: number;    // 用户ID
    title: string;      // 消息标题
    content: string;    // 消息内容
    folder_id: number;  // 文件夹ID
    created_at: string; // 创建时间，ISO格式
  };
}
