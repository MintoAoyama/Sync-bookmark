const PROP = PropertiesService.getScriptProperties().getProperties()

function main() {
  const searched = searchBookmarks()
  console.log(`[main] searched.length = ${searched.length}`)

  // comment に [あとで読む] が含まれているブックマークを取得
  const filtered = searched.filter(bookmark => bookmark.comment.includes('[あとで読む]'))
  console.log(`[main] filtered.length = ${filtered.length}`)

  // eid に 任意の文字列が来るまでをリストとして出力
  let urls = []
  for (let bookmark of filtered) {
    if (bookmark.entry.eid == PROP.LAST_EID) break
    urls.push(bookmark.entry.url)
    console.log(JSON.stringify(bookmark))
  }
  console.log(`[main] urls.length = ${urls.length}`)

  // Instapaperに送信
  for (let url of urls) {
    addInstapaper(url)
    Utilities.sleep(100)
  }

  // ブックマークの最新エントリの eid を ScriptProperties に保存
  if (searched.length == 0) return
  const lastEid = searched[0].entry.eid
  console.log(`[main] lastEid = ${lastEid}`)
  PropertiesService.getScriptProperties().setProperty('LAST_EID', lastEid)
}