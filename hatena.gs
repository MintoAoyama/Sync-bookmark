// はてなアカウントの認証情報を取得
function getHatenaOAuth() {
  const scope = 'read_public%2Cread_private%2Cwrite_public%2Cwrite_private'
  return service = OAuth1.createService('Hatena')
    .setAccessTokenUrl('https://www.hatena.com/oauth/token')
    .setRequestTokenUrl(`https://www.hatena.com/oauth/initiate?scope=${scope}`)
    .setAuthorizationUrl('https://www.hatena.ne.jp/oauth/authorize')
    .setConsumerKey(PROP.HATENA_CONSUMER_KEY)
    .setConsumerSecret(PROP.HATENA_CONSUMER_SECRET)
    .setCallbackFunction('callbackHetena')
    .setPropertyStore(PropertiesService.getScriptProperties())
}

// 認証URLを取得しログに出力する
function getAuthorizeUriHetena() {
  const hatenaService = getHatenaOAuth()
  console.log(hatenaService.authorize())
}

// リダイレクト時に実行されるコールバック関数
function callbackHetena(request) {
  const hatenaService = getHatenaOAuth()
  // ここで認証成功時にアクセストークンがPropertyStoreに保存される
  const isAuthorized = hatenaService.handleCallback(request)
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success')
  } else {
    return HtmlService.createHtmlOutput('Denied')
  }
}

// Myブックマークの検索結果一覧を取得
function searchBookmarks() {
  const url = 'https://b.hatena.ne.jp/my/search/json'
  const query = 'あとで読む'
  const limit = 50
  const hatenaService = getHatenaOAuth()
  const response = hatenaService.fetch(`${url}?q=${query}&limit=${limit}`, {
    method: 'get',
    muteHttpExceptions: true
  })
  const data = JSON.parse(response.getContentText())
  // console.log(JSON.stringify(data.bookmarks))
  return data.bookmarks
}