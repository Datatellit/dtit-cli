
![npm](https://nodei.co/npm/dtit-cli.png?downloads=true)

# dtit-cli - DTiT前端构建脚手架

**dtit-cli**是一个前端的脚手架工具，用于构建内部模板的工具，项目参考了[tg-cli](https://nodei.co/npm/dtit-cli.png?downloads=true)。

主要功能有：

* **初始化模版**
> - 生成PC、移动、Wechat等cli中现有模板
>- 添加本地自定义模板
>- 管理cli的模板

## 安装
环境: [Node.js](https://nodejs.org/en/download/) , npm  3.0+、 [Git](https://git-scm.com/).

``` bash
npm install -g dtit-cli
```



**如安装过慢，推荐**使用国内镜像安装 [cnpm](https://cnpmjs.org/)

----------

## 生成模板

安装完成以后，可以在命令行下使用 `dtit-cli` 命令来创建模板，该命令的用法：

```bash
$ dtit-cli -h

    Usage: dtit-cli <command>
  
  
    Options:
  
      -V, --version  output the version number
      -h, --help     output usage information
  
  
    Commands:
  
      add|a      Add a new dtit fe template
      list|l     List all the dtit fe templates
      init|i     Generate a new dtit fe project
      delete|d   Delete a new dtit fe template
```

快捷生成需求模板，使用 `dtit-cli init` 来实现

```bash
F:\Work\GitHub\dtit-cli>dtit-cli init
  ____ _____ _ _____    ____ _     ___ 
 |  _ \_   _(_)_   _|  / ___| |   |_ _|
 | | | || | | | | |   | |   | |    | | 
 | |_| || | | | | |   | |___| |___ | | 
 |____/ |_| |_| |_|    \____|_____|___|
                                       
? 选择项目类型：  (Use arrow keys)
> DTiT-FE-Mobile
  DTiT-FE-Wechat
  DTiT-FE-Desktop-AdminLTE
  DTiT-FE-Desktop-ElementUI
? 选择项目类型：  DTiT-FE-Wechat
? 输入项目名(例: Dtit-xxx-xxx)：  dtit-test
? 输入项目描述：  this is test project

 Start generating...

 √ Generation completed!

 cd dtit-test && npm install

```

## 后续说明（AdminLTE模板暂不支持）

1. 用命令行进入项目开发目录

```bash
cd <新建的目录>
```

2. 安装依赖项

```bash
npm install
```

3. 启动项目

```bash
npm run dev
```

执行上述命令后，访问 **http://localhost:8000**  
你对网页、样式、脚本、图片做的任何修改，一旦保存，浏览器会立即自动刷新当前页面。

## 开发说明
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)  
使用内置模板，进行项目开发，应对以下内容略有了解
* 拥有一定的前端基础  
* [Vue](https://cn.vuejs.org/) (了解并掌握Vue基础使用)  
* [ES6](http://es6.ruanyifeng.com/) (了解基本的import和export模块)  
* [Node.js](http://nodejs.cn/api/) (了解简单构建命令使用即可)  
* [Npm](https://docs.npmjs.com/) (了解依赖包的安装，卸载)  
* [Webpack](https://webpack.js.org/) (了解webpack基础知识)
* [ESLint](https://eslint.org/) (内置模板使用了Standard规则，此规则为Vue默认规则)  
更多说明，参见[内置模板详情](#内置模板详情)

## 打包发布

页面制作完毕之后，可以进行打包操作：

1. 生成 (`npm run build`)
```bash
F:\Work\NewSVN\A01.Dev-Application\Dtit-Present-BoardV2>npm run build

> board@1.0.0 build F:\Work\NewSVN\A01.Dev-Application\Dtit-Present-BoardV2
> node build/build.js

npm WARN invalid config loglevel="notice"
| building for production...
Starting to optimize CSS...
Processing static/css/app.7866e1e63e59ad6ceac3dcebe7a684d6.css...
Processed static/css/app.7866e1e63e59ad6ceac3dcebe7a684d6.css, before: 168491, after: 166355, ratio: 98.73%
Hash: 68f3729e268294830a72
Version: webpack 2.7.0
Time: 32316ms
        Asset     Size  Chunks                    Chunk Names
         xxx   12.9 kB          [emitted]         
         xxx  13.2 kB          [emitted]         
         xxx  31.4 kB          [emitted]         
         xxx  67.6 kB          [emitted]         
         xxxx 1.05 kB          [emitted]         

  Build complete.

  Tip: built files are meant to be served over an HTTP server.
  Opening index.html over file:// won't work.
```
该命令使用了webpack构建工具进行项目的构建。


## 内置模板详情（目录说明，用法等，参照对应项目）
[DTiT-FE-Mobile](https://github.com/Datatellit/DTiT-FE-Mobile.git)  
[DTiT-FE-Wechat](https://github.com/Datatellit/DTiT-FE-Wechat.git)  
[DTiT-FE-Desktop-AdminLTE](https://github.com/Datatellit/DTiT-FE-Desktop-AdminLTE.git)  
[DTiT-FE-Desktop-ElementUI](https://github.com/Datatellit/DTiT-FE-Desktop-ElementUI.git)