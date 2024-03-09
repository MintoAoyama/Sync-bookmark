const PROP = PropertiesService.getScriptProperties().getProperties()

function main() {
  const searched = searchBookmarks()
  console.log(`[main] searched.length = ${searched.length}`)

  // ミュート対象のドメイン一覧を取得
  const muteDomains = PROP.MUTE_DOMAINS.split(',')

  // 「comment に [あとで読む] が含まれている」「ミュート対象のドメインではない」ブックマークを取得
  const filtered = searched.filter(bookmark => {
    const isMute = muteDomains.some(domain => bookmark.entry.url.includes(domain))
    return bookmark.comment.includes('[あとで読む]') && !isMute
  })
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