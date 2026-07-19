<script setup>
import { ref, onMounted, computed } from 'vue'
import { useData } from 'vitepress'
import BaseButton from './BaseButton.vue'

const { frontmatter } = useData()

// 用文章的 contentId 作为隔离 Key
const commentKey = computed(() => `blog-comments-${frontmatter.value.contentId || 'global'}`)

const comments = ref([])
const activeReplyId = ref(null)

// 发表主评论表单
const authorName = ref('')
const authorRole = ref('client') // 'client' 客户 / 'author' 作者自己
const commentText = ref('')

// 回复表单
const replyName = ref('')
const replyRole = ref('author') // 默认回复为作者自己
const replyText = ref('')

// 模拟初始化数据，让页面不空旷
const getMockComments = () => {
  return [
    {
      id: 1,
      author: '客户_李总',
      role: 'client',
      content: '这个工作流在实际项目对接中太有用了，规范化视觉建档能规避掉很多反复沟通的成本！',
      createdAt: '2026-07-18 16:30',
      replies: [
        {
          id: 101,
          author: '作者',
          role: 'author',
          content: '是的李总！其实第一步和第二步整理好之后，后续的工作量能减少 80%，也能更好地保证品牌调性的稳定。',
          createdAt: '2026-07-18 17:15'
        }
      ]
    }
  ]
}

// 从 localStorage 加载评论
const loadComments = () => {
  if (typeof window === 'undefined') return
  try {
    const saved = localStorage.getItem(commentKey.value)
    comments.value = saved ? JSON.parse(saved) : getMockComments()
  } catch (e) {
    comments.value = getMockComments()
  }
}

// 保存评论
const saveComments = () => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(commentKey.value, JSON.stringify(comments.value))
  } catch (e) {
    console.error('保存评论失败:', e)
  }
}

// 提交主评论
const submitComment = () => {
  if (!authorName.value.trim() || !commentText.value.trim()) return

  const newComment = {
    id: Date.now(),
    author: authorName.value.trim(),
    role: authorRole.value,
    content: commentText.value.trim(),
    createdAt: formatDateTime(new Date()),
    replies: []
  }

  comments.value.unshift(newComment)
  saveComments()

  commentText.value = ''
  // 保持名字，方便连续发帖，只清空内容
}

// 提交回复
const submitReply = (parentId) => {
  if (!replyName.value.trim() || !replyText.value.trim()) return

  const parentComment = comments.value.find(c => c.id === parentId)
  if (!parentComment) return

  const newReply = {
    id: Date.now(),
    author: replyName.value.trim(),
    role: replyRole.value,
    content: replyText.value.trim(),
    createdAt: formatDateTime(new Date())
  }

  parentComment.replies.push(newReply)
  saveComments()

  replyText.value = ''
  activeReplyId.value = null
}

const toggleReplyForm = (commentId) => {
  if (activeReplyId.value === commentId) {
    activeReplyId.value = null
  } else {
    activeReplyId.value = commentId
    replyText.value = ''
    // 自动为回复者代入作者名字
    if (!replyName.value) {
      replyName.value = '作者'
    }
  }
}

const formatDateTime = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}`
}

onMounted(() => {
  loadComments()
})
</script>

<template>
  <div class="comment-section">
    <h3 class="comment-title">
      发表讨论 <span class="comment-count">({{ comments.length }} 条)</span>
    </h3>

    <!-- 评论输入区域 -->
    <div class="comment-form-container">
      <div class="comment-form-meta">
        <input 
          v-model="authorName" 
          type="text" 
          placeholder="您的昵称..." 
          class="comment-input comment-input--name"
          required
        />
        
        <div class="role-selector">
          <label class="role-option">
            <input 
              v-model="authorRole" 
              type="radio" 
              value="client" 
              name="authorRole"
            />
            <span class="role-label client-label">客户</span>
          </label>
          <label class="role-option">
            <input 
              v-model="authorRole" 
              type="radio" 
              value="author" 
              name="authorRole"
            />
            <span class="role-label author-label">作者</span>
          </label>
        </div>
      </div>

      <textarea 
        v-model="commentText" 
        placeholder="写下您的意见或讨论内容..." 
        class="comment-textarea"
        rows="3"
        required
      ></textarea>

      <div class="comment-form-submit">
        <BaseButton variant="primary" size="sm" @click="submitComment">
          发表意见
        </BaseButton>
      </div>
    </div>

    <!-- 评论展示列表 -->
    <div v-if="comments.length === 0" class="comment-empty">
      暂无讨论内容，欢迎留下您的建议！
    </div>

    <div v-else class="comment-list">
      <div v-for="comment in comments" :key="comment.id" class="comment-card">
        <!-- 评论主信息 -->
        <div class="comment-header">
          <div class="comment-user">
            <span class="user-avatar">{{ comment.author.slice(0, 1) }}</span>
            <span class="user-name">{{ comment.author }}</span>
            <span 
              class="user-badge" 
              :class="`user-badge--${comment.role}`"
            >
              {{ comment.role === 'author' ? '作者' : '客户' }}
            </span>
          </div>
          <span class="comment-date">{{ comment.createdAt }}</span>
        </div>

        <p class="comment-body">{{ comment.content }}</p>

        <!-- 操作区 -->
        <div class="comment-actions">
          <button class="action-btn reply-btn" @click="toggleReplyForm(comment.id)">
            💬 回复
          </button>
        </div>

        <!-- 回复输入表单 -->
        <div v-if="activeReplyId === comment.id" class="reply-form-container">
          <div class="reply-form-meta">
            <input 
              v-model="replyName" 
              type="text" 
              placeholder="您的昵称..." 
              class="comment-input comment-input--name comment-input--sm"
            />
            <div class="role-selector">
              <label class="role-option">
                <input 
                  v-model="replyRole" 
                  type="radio" 
                  value="client" 
                  :name="`replyRole-${comment.id}`"
                />
                <span class="role-label client-label">客户</span>
              </label>
              <label class="role-option">
                <input 
                  v-model="replyRole" 
                  type="radio" 
                  value="author" 
                  :name="`replyRole-${comment.id}`"
                />
                <span class="role-label author-label">作者</span>
              </label>
            </div>
          </div>
          <textarea 
            v-model="replyText" 
            placeholder="回复内容..." 
            class="comment-textarea comment-textarea--sm"
            rows="2"
          ></textarea>
          <div class="reply-form-submit">
            <BaseButton variant="secondary" size="sm" @click="submitReply(comment.id)">
              提交回复
            </BaseButton>
            <button class="cancel-reply-btn" @click="activeReplyId = null">
              取消
            </button>
          </div>
        </div>

        <!-- 子回复列表 -->
        <div v-if="comment.replies?.length" class="reply-list">
          <div v-for="reply in comment.replies" :key="reply.id" class="reply-card">
            <div class="comment-header">
              <div class="comment-user">
                <span class="user-avatar user-avatar--sm">{{ reply.author.slice(0, 1) }}</span>
                <span class="user-name">{{ reply.author }}</span>
                <span 
                  class="user-badge" 
                  :class="`user-badge--${reply.role}`"
                >
                  {{ reply.role === 'author' ? '作者' : '客户' }}
                </span>
                <span class="reply-to-text">回复给主层</span>
              </div>
              <span class="comment-date">{{ reply.createdAt }}</span>
            </div>
            <p class="comment-body">{{ reply.content }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 提示三方系统扩展 -->
    <div class="comment-footer-tip">
      💡 提示：本评论区当前保存在本地浏览器中。如需在发布线上后让所有访客进行互评，可联系在 `CommentSection.vue` 中配置接入 Giscus 或 Waline 评论插件。
    </div>
  </div>
</template>

<style scoped>
.comment-section {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid var(--border-soft);
  font-family: var(--font-sans);
  color: var(--text-main);
}

.comment-title {
  font-size: var(--text-h3);
  font-weight: 700;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.comment-count {
  font-size: var(--text-body);
  font-weight: 500;
  opacity: 0.6;
}

/* 评论输入表单样式 */
.comment-form-container, .reply-form-container {
  background: var(--bg-soft, rgba(0, 0, 0, 0.02));
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card, 12px);
  padding: 20px;
  margin-bottom: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
  transition: border-color 0.22s ease;
}

.comment-form-container:focus-within, .reply-form-container:focus-within {
  border-color: var(--brand-main);
}

.comment-form-meta, .reply-form-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-bottom: 12px;
}

.comment-input {
  min-height: 38px;
  padding: 0 12px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control, 6px);
  font-size: var(--text-small);
  background: var(--bg-main, #ffffff);
  color: var(--text-main);
  outline: none;
  transition: border-color 0.22s ease;
}

.comment-input:focus {
  border-color: var(--brand-main);
}

.comment-input--name {
  width: 200px;
}

.comment-input--sm {
  width: 150px;
  min-height: 32px;
  font-size: var(--text-small);
}

.role-selector {
  display: inline-flex;
  gap: 12px;
  background: var(--border-soft);
  padding: 4px;
  border-radius: var(--radius-control, 6px);
}

.role-option {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.role-option input {
  display: none;
}

.role-label {
  padding: 4px 8px;
  font-size: var(--text-small);
  font-weight: 500;
  border-radius: 4px;
  transition: background 0.22s, color 0.22s;
  opacity: 0.6;
}

.role-option input:checked + .role-label {
  background: var(--bg-main, #ffffff);
  opacity: 1;
  font-weight: 700;
}

.role-option input:checked + .client-label {
  color: #3b82f6;
}

.role-option input:checked + .author-label {
  color: var(--brand-main);
}

.comment-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control, 6px);
  font-size: var(--text-body);
  background: var(--bg-main, #ffffff);
  color: var(--text-main);
  outline: none;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.22s ease;
  margin-bottom: 12px;
}

.comment-textarea:focus {
  border-color: var(--brand-main);
}

.comment-textarea--sm {
  font-size: var(--text-small);
  padding: 8px;
  margin-bottom: 8px;
}

.comment-form-submit, .reply-form-submit {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}

.cancel-reply-btn {
  font-size: var(--text-small);
  opacity: 0.6;
  cursor: pointer;
  background: none;
  border: none;
}

.cancel-reply-btn:hover {
  opacity: 1;
}

/* 列表样式 */
.comment-empty {
  text-align: center;
  padding: 40px;
  opacity: 0.5;
  font-style: italic;
  border: 1px dashed var(--border-soft);
  border-radius: var(--radius-card, 12px);
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.comment-card {
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card, 12px);
  padding: 24px;
  background: var(--bg-main, #ffffff);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.comment-user {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--border-strong, #e5e5e5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: var(--text-small);
  color: var(--text-main);
}

.user-avatar--sm {
  width: 24px;
  height: 24px;
  font-size: 11px;
}

.user-name {
  font-weight: 700;
  font-size: var(--text-body);
}

.user-badge {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 500;
}

.user-badge--author {
  background: rgba(var(--brand-main-rgb, 178, 143, 113), 0.1);
  color: var(--brand-main);
}

.user-badge--client {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.reply-to-text {
  font-size: var(--text-small);
  opacity: 0.5;
  margin-left: 4px;
}

.comment-date {
  font-size: var(--text-small);
  opacity: 0.5;
}

.comment-body {
  font-size: var(--text-body);
  line-height: 1.6;
  margin: 0 0 16px 0;
  white-space: pre-wrap;
}

.comment-actions {
  display: flex;
  gap: 16px;
}

.action-btn {
  background: none;
  border: none;
  font-size: var(--text-small);
  opacity: 0.6;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.22s;
}

.action-btn:hover {
  opacity: 1;
}

/* 回复列表缩进 */
.reply-list {
  margin-top: 20px;
  border-left: 2px solid var(--border-soft);
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.reply-card {
  padding: 12px 0 0 0;
  border-top: 1px dashed var(--border-soft);
}

.reply-card:first-child {
  border-top: none;
  padding-top: 0;
}

.reply-form-container {
  margin-top: 16px;
  background: var(--bg-soft, rgba(0, 0, 0, 0.01));
}

.comment-footer-tip {
  margin-top: 48px;
  font-size: var(--text-small);
  opacity: 0.5;
  background: var(--bg-soft);
  padding: 12px 16px;
  border-radius: var(--radius-control, 6px);
  border: 1px solid var(--border-soft);
}
</style>
