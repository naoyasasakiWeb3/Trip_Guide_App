# Trip Guide App

旅行者のための総合ガイドアプリケーション。旅行の計画から、現地での観光スポット情報、交通手段、レストラン情報までをカバーする多機能アプリです。

## 機能

- 旅行計画の作成と管理
- 人気の観光スポット情報
- 現地の交通情報
- おすすめレストランとカフェ
- ユーザーレビューと評価
- オフラインでのマップ利用
- 旅行に関する便利な情報

## 技術スタック

- React Native / Expo
- TypeScript
- Expo Router (ナビゲーション)
- その他のExpoライブラリ

## 開発環境のセットアップ

1. リポジトリをクローンする
```
git clone https://github.com/naoyasasakiWeb3/Trip_Guide_App.git
cd Trip_Guide_App
```

2. 依存関係をインストールする
```
npm install
```

3. 環境変数を設定する

ルートディレクトリに`.env`ファイルを作成し、以下の項目を設定してください：

```
# Google Places API Key（位置検索用）
GOOGLE_PLACES_API_KEY=あなたのAPIキー

# Google Custom Search API Key（画像検索用）
GOOGLE_SEARCH_API_KEY=あなたのAPIキー

# Google Custom Search Engine ID（画像検索用）
GOOGLE_SEARCH_ENGINE_ID=あなたの検索エンジンID
```

APIキーの取得方法：
- Google Places API: [Google Cloud Console](https://console.cloud.google.com/apis/library/places-backend.googleapis.com)
- Google Custom Search API: [Google Cloud Console](https://console.cloud.google.com/apis/library/customsearch.googleapis.com)
- Search Engine ID: [Programmable Search Engine](https://programmablesearchengine.google.com/)

4. アプリを起動する
```
npm start
```

## 貢献方法

プロジェクトへの貢献に興味がある場合は、イシューを作成するか、プルリクエストを送信してください。 