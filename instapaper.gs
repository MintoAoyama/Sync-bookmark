// Instapaper にブックマークを追加する
function addInstapaper(url) {
  console.log('[addInstapaper] url = ' + url)
  const res = UrlFetchApp.fetch('https://www.instapaper.com/api/add', {
    method: 'post',
    payload: {
      username: PROP.INSTAPAPER_USERNAME,
      password: PROP.INSTAPAPER_PASSWORD,
      url: url
    }
  })
  if (res.getResponseCode() != 201) {
    console.error(`[addInstapaper] ${res.getContentText()}`)
    return false
  }
  console.log(`[addInstapaper] ${res.getContentText()}`)
  return true
}