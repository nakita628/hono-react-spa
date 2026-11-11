<h1 id="react-tailwind-node-api">react-tailwind-node API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="react-tailwind-node-api-hello">hello</h1>

## readHello

<a id="opIdreadHello"></a>

> Code samples

```bash
curl http://localhost:8787/api/hello \
  -H 'Accept: application/json'
```

`GET /hello`

挨拶のメッセージを返す。

> Example responses

> 200 Response

```json
{
  "message": "Hono🔥"
}
```

> 500 Response

```json
{
  "type": "/problems/internal-server-error",
  "title": "サーバー内部エラー",
  "status": 500,
  "detail": "予期しないエラーが発生しました。",
  "instance": "/api/hello"
}
```

<h3 id="readhello-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|The request has succeeded.|[Message](#schemamessage)|
|500|Internal Server Error|500 Internal Server Error（`application/problem+json`）。app.onError が返す|[InternalServerProblem](#schemainternalserverproblem)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Message">Message</h2>
<!-- backwards compatibility -->
<a id="schemamessage"></a>
<a id="schema_Message"></a>
<a id="tocSmessage"></a>
<a id="tocsmessage"></a>

```json
{
  "message": "Hono🔥"
}
```

挨拶のメッセージ。

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|メッセージの本文|

<h2 id="tocS_InternalServerProblem">InternalServerProblem</h2>
<!-- backwards compatibility -->
<a id="schemainternalserverproblem"></a>
<a id="schema_InternalServerProblem"></a>
<a id="tocSinternalserverproblem"></a>
<a id="tocsinternalserverproblem"></a>

```json
{
  "type": "/problems/internal-server-error",
  "title": "サーバー内部エラー",
  "status": 500,
  "detail": "予期しないエラーが発生しました。",
  "instance": "/api/hello"
}
```

契約違反やその他の想定外のサーバー障害を表す RFC 9457 Problem Details。

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|true|none|problem type 識別子（相対 URI 参照。API のベース URI から解決される）|
|title|string|true|none|problem type の短い人間可読なまとめ|
|status|number|true|none|HTTP ステータスコード。RFC 9457 に従いボディにも再掲する|
|detail|string|true|none|この発生事象に固有の人間可読な説明|
|instance|string|true|none|この発生事象を識別する URI 参照（リクエストパス）|

#### Enumerated Values

|Property|Value|
|---|---|
|type|/problems/internal-server-error|
|title|サーバー内部エラー|
|status|500|
