import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const uploadAction = readFileSync(
  new URL('../.github/actions/upload-oss-images/action.yml', import.meta.url),
  'utf8'
)
const deployWorkflow = readFileSync(
  new URL('../.github/workflows/deploy.yml', import.meta.url),
  'utf8'
)

test('OSS upload keeps hashed images immutable and never deletes remote objects', () => {
  assert.match(uploadAction, /--include "\*\.avif"/)
  assert.match(uploadAction, /--include "\*\.webp"/)
  assert.match(uploadAction, /--ignore-existing/)
  assert.match(uploadAction, /max-age=31536000, immutable/)
  assert.doesNotMatch(uploadAction, /OSSUTIL_BINARY[^\n]*(?:\brm\b|\bsync\b)/)
  assert.doesNotMatch(uploadAction, /--delete/)
})

test('Pages publication is ordered after the OSS upload step', () => {
  const ossUploadIndex = deployWorkflow.indexOf('uses: ./.github/actions/upload-oss-images')
  const pagesArtifactIndex = deployWorkflow.indexOf('uses: actions/upload-pages-artifact@v3')

  assert.notEqual(ossUploadIndex, -1)
  assert.notEqual(pagesArtifactIndex, -1)
  assert.ok(ossUploadIndex < pagesArtifactIndex)
})
