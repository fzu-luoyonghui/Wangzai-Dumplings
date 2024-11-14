<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// 导入接口定义
import type { GetNotefilesResponse, Notefiles } from '@/types/api/getNotefiles';

// 定义存储文件夹数据的 ref
const folders = ref<Notefiles[]>([]);

// 路由
const router = useRouter();

// 获取写作文档文件夹列表
const getFolders = async () => {
  try {
    // 调用接口获取文件夹数据
    const response = await axios.get<GetNotefilesResponse>(`${import.meta.env.VITE_API_URL}/ez-note/folder/get-all`);
    console.log(response.data); // 打印返回的数据，确保结构正确

    if (response.data.code === 0) {
      // 请求成功，更新 folders 数据
      folders.value = response.data.data;
    } else {
      // 如果接口返回 code 不是 0，弹出错误信息
      alert(response.data.msg);
    }
  } catch (error) {
    console.error("获取文件夹列表失败:", error);
    alert('请求失败，请稍后重试');
  }
};

// 跳转到文件夹详情页（管理文档）
const goToFolderDetail = (id: number) => {
  router.push({ name: 'folderDetail', params: { id } });
};

// 创建新文件夹
const createFolder = () => {
  const newFolderName = prompt('请输入文件夹名称');
  if (newFolderName) {
    // 假设 ID 以某种方式生成
    folders.value.push({
      id: folders.value.length + 1,  // 为新文件夹生成 ID（假设为下一个数字）
      user_id: 1,  // 假设用户 ID 为 1
      name: newFolderName,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
    });
  }
};

// 在组件挂载时调用 getFolders 获取文件夹列表
onMounted(() => {
  getFolders();
});
</script>

<template>
  <div class="folder-list-container">
    <h1 class="folder-list-title">我的写作文档</h1>
    <button class="create-folder-button" @click="createFolder">新建文件夹</button>
    
    <div class="folder-list">
      <div v-for="folder in folders" :key="folder.id" class="folder-item" @click="goToFolderDetail(folder.id)">
        <div class="folder-item-header">
          <h2 class="folder-name">{{ folder.name }}</h2>
          <p class="folder-date">创建于: {{ folder.created_at }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面布局 */
.folder-list-container {
  width: 80%;
  margin: 0 auto;
  padding: 30px;
  background-color: #f0f4f8;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

.folder-list-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2c3e50;
  font-weight: bold;
}

/* 文件夹列表 */
.folder-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 20px;
}

/* 单个文件夹项 */
.folder-item {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #ddd;
}

.folder-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.folder-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.folder-name {
  font-size: 1.4rem;
  font-weight: 600;
  color: #34495e;
}

.folder-date {
  font-size: 0.9rem;
  color: #7f8c8d;
}

@media (max-width: 600px) {
  .folder-list-container {
    width: 95%;
    padding: 15px;
  }

  .folder-list {
    grid-template-columns: 1fr;  /* 在小屏幕上显示单列 */
  }

  .folder-item {
    padding: 15px;
  }
}
</style>
