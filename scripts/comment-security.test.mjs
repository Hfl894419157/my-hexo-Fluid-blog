import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

test('公开评论区不暴露伪作者模式或客户端删除入口', async () => {
  const source = await readFile(path.join(repoRoot, 'components', 'CommentSection.vue'), 'utf8')

  for (const forbidden of [
    '作者模式',
    'authorMode',
    'toggleAuthorMode',
    'deleteComment',
    'deleteReply',
    'deleteNestedReply',
    'action-btn--danger'
  ]) {
    assert.equal(source.includes(forbidden), false, `CommentSection.vue 不应包含 ${forbidden}`)
  }
})
