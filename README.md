# P-Hackathon-Web
## 使い方
リポジトリの `fork` ボタンを押して `fork` する

![](https://i.imgur.com/UyyBKi1.png)

```
git clone
```

`master` ブランチで`develop`ブランチを切る

```
git checkout -b develop
```

１ファイル単位で作業が一段落ついたら、プルリクを送る

[初心者向けGithubへのPullRequest方法](https://qiita.com/samurai_runner/items/7442521bce2d6ac9330b)


### フロントエンド
```shell
cd frontend && npm install
npm start
```
### バックエンド
Django `1` 系なので Python `3.5` `3.6` `3.7`
が使える

`virtualenv`を事前にインストール

`pip3 install virtualenv`

`pip`と`pip3`は別物なので注意

[Python の実行環境を切り替えて使用する (virtualenv) Python3.2まで](https://maku77.github.io/python/env/virtualenv.html)

[venv: Python 仮想環境管理](https://qiita.com/fiftystorm36/items/b2fd47cf32c7694adc2e)

```shell
cd backend
virtualenv env
source env/bin/activate
pip3 install -r requirements/local.txt
python manage.py makemigrations
python manage.py custom_user
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

