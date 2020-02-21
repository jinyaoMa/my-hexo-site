# ma-jinyao.cn

耀 の 个人网站 | Mark の Personal Website

``` yaml

# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: "耀 の 个人网站 | Mark の Personal Website"
description: "耀 の 个人网站 | Mark の Personal Website"
author: jinyaoMa ( 耀 / Mark )
year: 2019

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: https://ma-jinyao.cn
root: /

# Directory
source_dir: source
public_dir: docs # 方便使用Github Page
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: code # markdown使用include_code标签
skip_render:
  - "code/*.*" # 排除code_dir
  - "extension/**/*.html" # 排除extension
  - "*.html" # 如果在在主目录source文件夹里放了搜索引擎验证的.html文件
  - "CNAME" # 如果在在主目录source文件夹里放了CNAME文件

# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link:
  enable: true # Open external links in new tab
  field: site # Apply to the whole site
  exclude: ""
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace: "  "
  wrap: true
  hljs: false

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: HH:mm:ss
## Use post's date for updated date unless set in front-matter
use_date_for_updated: false

# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: mustom

# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  - type: baidu_url_submitter
  - type: git
    repo:

all_minifier: true # 如果装了 hexo-all-minifier
nofollow: # 如果装了 hexo-filter-nofollow
  enable: true
  field: post
sitemap: # 如果装了 hexo-generator-sitemap
  path: sitemap.xml
  rel: true
autoprefixer: # 如果装了 hexo-autoprefixer
  exclude:
    - "*.min.css"
  overrideBrowserslist:
    - "last 2 versions"
babelify: # 如果装了 hexo-renderer-babelify + @babel/preset-env
  presets:
    - "@babel/preset-env"
  sourceMaps: false

ignore:
  - "**/source/asset/js/common/*.js" # 如果装了 hexo-renderer-babelify
  - "**/source/asset/js/part/*.js" # 如果装了 hexo-renderer-babelify
  - "**/source/asset/js/plugin/!(L2Dwidget.0.min.js)" # 如果装了 hexo-renderer-babelify

# 百度主动推送
baidu_url_submit:
  count: 1000 # 提交最新的一个链接
  host: ma-jinyao.cn # 在百度站长平台中注册的域名
  token: "" # 请注意这是您的秘钥， 所以请不要把博客源代码发布在公众仓库里!
  path: baidu_urls.txt # 文本文档的地址， 新链接会保存在此文本文档里

baidu_translate:
  appid: ""
  appkey: ""

valine:
  appid: ""
  appkey: ""

google_site_verification: ""
baidu_site_verification: ""

# adScript: ''

```