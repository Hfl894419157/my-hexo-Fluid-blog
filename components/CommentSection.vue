<script setup>
import { ref, onMounted, computed } from 'vue'
import { useData } from 'vitepress'
import BaseButton from './BaseButton.vue'

const { frontmatter } = useData()

// 用文章的 contentId 作为隔离 Key
const commentKey = computed(() => `blog-comments-${frontmatter.value.contentId || 'global'}`)

const comments = ref([])
const activeReplyId = ref(null)
const activeReplyToReplyId = ref(null)

// 发表评论和回复的内容
const commentText = ref('')
const replyText = ref('')
const replyToReplyText = ref('')

// 存储哪些评论的回复被展开了
const expandedComments = ref(new Set())

const isRepliesExpanded = (commentId) => expandedComments.value.has(commentId)

const toggleExpandReplies = (commentId) => {
  if (expandedComments.value.has(commentId)) {
    expandedComments.value.delete(commentId)
  } else {
    expandedComments.value.add(commentId)
  }
}

// 模拟初始化数据，让页面不空旷
const getMockComments = () => {
  return [
    {
      id: 1,
      author: '访客',
      role: 'client',
      content: '这个工作流在实际项目对接中太有用了，规范化视觉建档能规避掉很多反复沟通的成本！',
      createdAt: '2026-07-18 16:30',
      replies: [
        {
          id: 101,
          author: '访客',
          role: 'client',
          content: '是的！其实第一步和第二步整理好之后，后续的工作量能减少 80%，也能更好地保证品牌调性的稳定。',
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
  if (!commentText.value.trim()) return

  const newComment = {
    id: Date.now(),
    author: '访客',
    role: 'client',
    content: commentText.value.trim(),
    createdAt: formatDateTime(new Date()),
    replies: []
  }

  comments.value.unshift(newComment)
  saveComments()

  commentText.value = ''
}

// 提交回复
const submitReply = (parentId) => {
  if (!replyText.value.trim()) return

  const parentComment = comments.value.find(c => c.id === parentId)
  if (!parentComment) return

  const newReply = {
    id: Date.now(),
    author: '访客',
    role: 'client',
    content: replyText.value.trim(),
    createdAt: formatDateTime(new Date()),
    replies: []
  }

  parentComment.replies.push(newReply)
  saveComments()

  replyText.value = ''
  activeReplyId.value = null
}

// 提交对回复的回复
const submitReplyToReply = (commentId, replyId) => {
  if (!replyToReplyText.value.trim()) return

  const parentComment = comments.value.find(c => c.id === commentId)
  if (!parentComment) return

  const parentReply = parentComment.replies.find(r => r.id === replyId)
  if (!parentReply) return

  if (!parentReply.replies) parentReply.replies = []

  const newReply = {
    id: Date.now(),
    author: '访客',
    role: 'client',
    content: replyToReplyText.value.trim(),
    createdAt: formatDateTime(new Date())
  }

  parentReply.replies.push(newReply)
  saveComments()

  replyToReplyText.value = ''
  activeReplyToReplyId.value = null
}

const toggleReplyForm = (commentId) => {
  if (activeReplyId.value === commentId) {
    activeReplyId.value = null
  } else {
    activeReplyId.value = commentId
    activeReplyToReplyId.value = null
    replyText.value = ''
  }
}

const toggleReplyToReplyForm = (commentId, replyId) => {
  const key = `${commentId}-${replyId}`
  if (activeReplyToReplyId.value === key) {
    activeReplyToReplyId.value = null
  } else {
    activeReplyToReplyId.value = key
    activeReplyId.value = null
    replyToReplyText.value = ''
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
      <textarea 
        v-model="commentText" 
        placeholder="写下您的讨论或反馈意见..." 
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
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <!-- 评论主信息 -->
        <div class="comment-header">
          <div class="comment-user">
            <span class="user-avatar">{{ comment.author.slice(0, 1) }}</span>
            <span class="user-name">{{ comment.author }}</span>
          </div>
          <span class="comment-date">{{ comment.createdAt }}</span>
        </div>

        <p class="comment-body">{{ comment.content }}</p>

        <!-- 操作区 -->
        <div class="comment-actions">
          <button class="action-btn" @click="toggleReplyForm(comment.id)">
            💬 回复
          </button>
        </div>

        <!-- 回复输入表单 -->
        <div v-if="activeReplyId === comment.id" class="reply-form-container">
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
          <div 
            v-for="reply in ((comment.replies?.length || 0) > 3 && !isRepliesExpanded(comment.id) 
              ? comment.replies.slice(0, 3) 
              : comment.replies)" 
            :key="reply.id" 
            class="reply-card"
          >
            <div class="comment-header">
              <div class="comment-user">
                <span class="user-avatar user-avatar--sm">{{ reply.author.slice(0, 1) }}</span>
                <span class="user-name">{{ reply.author }}</span>
              </div>
              <span class="comment-date">{{ reply.createdAt }}</span>
            </div>
            <p class="comment-body">{{ reply.content }}</p>

            <!-- 回复的操作区 -->
            <div class="comment-actions">
              <button class="action-btn" @click="toggleReplyToReplyForm(comment.id, reply.id)">
                💬 回复
              </button>
            </div>

            <!-- 对回复的回复输入框 -->
            <div v-if="activeReplyToReplyId === `${comment.id}-${reply.id}`" class="reply-form-container">
              <textarea 
                v-model="replyToReplyText" 
                placeholder="回复内容..." 
                class="comment-textarea comment-textarea--sm"
                rows="2"
              ></textarea>
              <div class="reply-form-submit">
                <BaseButton variant="secondary" size="sm" @click="submitReplyToReply(comment.id, reply.id)">
                  提交回复
                </BaseButton>
                <button class="cancel-reply-btn" @click="activeReplyToReplyId = null">
                  取消
                </button>
              </div>
            </div>

            <!-- 对回复的回复（嵌套回复） -->
            <div v-if="reply.replies?.length" class="nested-reply-list">
              <div v-for="nested in reply.replies" :key="nested.id" class="nested-reply-card">
                <div class="comment-header">
                  <div class="comment-user">
                    <span class="user-avatar user-avatar--sm">{{ nested.author.slice(0, 1) }}</span>
                    <span class="user-name">{{ nested.author }}</span>
                  </div>
                  <span class="comment-date">{{ nested.createdAt }}</span>
                </div>
                <p class="comment-body">{{ nested.content }}</p>
              </div>
            </div>
          </div>

          <div v-if="(comment.replies?.length || 0) > 3" class="reply-expand-actions">
            <button class="expand-toggle-btn" @click="toggleExpandReplies(comment.id)">
              {{ isRepliesExpanded(comment.id) ? '收起回复' : `展开全部 ${comment.replies?.length || 0} 条回复` }}
            </button>
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
  color: var(--text-main);
}

.comment-count {
  font-size: var(--text-body);
  font-weight: 500;
  color: var(--text-muted);
}

/* 评论输入表单样式 */
.comment-form-container {
  background: var(--bg-section);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card, 12px);
  padding: 20px;
  margin-bottom: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
  transition: border-color 0.22s ease;
}

.reply-form-container {
  background: transparent;
  border: none;
  padding: 0;
  margin-top: 12px;
  margin-bottom: 16px;
  box-shadow: none;
}

.comment-form-container:focus-within {
  border-color: var(--brand-main);
}

.comment-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control, 8px);
  font-size: var(--text-body);
  background: var(--bg-page);
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
  color: var(--text-muted);
  cursor: pointer;
  background: none;
  border: none;
  transition: color 0.2s;
}

.cancel-reply-btn:hover {
  color: var(--text-main);
}

/* 列表样式 */
.comment-empty {
  text-align: center;
  padding: 40px;
  font-style: italic;
  border: 1px dashed var(--border-soft);
  border-radius: var(--radius-card, 12px);
  color: var(--text-muted);
}

.comment-list {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card, 14px);
  background: var(--bg-section);
  padding: 24px;
}

.comment-item {
  padding: 24px 0;
  border-bottom: 1px solid var(--border-soft);
}

.comment-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.comment-item:first-child {
  padding-top: 0;
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
  color: var(--text-main);
}

.reply-to-text {
  font-size: var(--text-small);
  color: var(--text-muted);
  margin-left: 4px;
}

.comment-date {
  font-size: var(--text-small);
  color: var(--text-muted);
}

.comment-body {
  font-size: var(--text-body);
  line-height: 1.6;
  margin: 0 0 16px 0;
  white-space: pre-wrap;
  color: var(--text-sub);
}

.comment-actions {
  display: flex;
  gap: 16px;
}

.action-btn {
  background: none;
  border: none;
  font-size: var(--text-small);
  color: var(--text-muted);
  cursor: pointer;
  padding: 0;
  transition: color 0.22s;
}

.action-btn:hover {
  color: var(--text-main);
}

/* 嵌套回复样式 */
.nested-reply-list {
  margin-top: 12px;
  margin-left: 20px;
  padding-left: 16px;
  border-left: 2px dotted var(--border-soft);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nested-reply-card {
  padding: 8px 0 0 0;
}

.nested-reply-card .comment-body {
  font-size: var(--text-small);
}

.nested-reply-card .comment-actions {
  margin: 4px 0 0;
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

.reply-expand-actions {
  margin-top: 12px;
  display: flex;
  justify-content: flex-start;
}

.expand-toggle-btn {
  background: none;
  border: none;
  color: var(--brand-main);
  font-size: var(--text-small);
  font-weight: 600;
  cursor: pointer;
  padding: 4px 0;
  transition: opacity 0.2s;
}

.expand-toggle-btn:hover {
  opacity: 0.8;
}

.comment-footer-tip {
  margin-top: 48px;
  font-size: var(--text-small);
  color: var(--text-muted);
  background: var(--bg-page);
  padding: 12px 16px;
  border-radius: var(--radius-control, 8px);
  border: 1px solid var(--border-soft);
}
</style>
