## webpack 初学
##

* 安装依赖
```
 npm i
 npm install
 ```

* 打包：开发环境

```
npm run dev
```

* 打包：生产环境

```
npm run build
```

* webpack到处是坑

#### uglifyjs-webpack-plugin

> 这里在使用 uglifyjs-webpack-plugin JS代码压缩衣插件时，有个问题需要注意，我这里是没有默认安装 babel-loader 的，结果打包就出错（跟着视频看的，结果我的就不行），
> 于是安装了 babel 

```
npm install babel-loader babel-core babel-preset-es2015 --save-dev
```

> 结果还是报错，说是安装的是6x版本的，大概是不兼容 uglifyjs-webpack-plugin 吧，建议我安装7x版本，这里只安装 babel-loader@7 版本即可

```
npm install babel-loader@7
```

#### clean-webpack-plugin

> 这里又遇到坑，清理插件 clean-webpack-plugin 报错，先安装：

```
npm install clean-webpack-plugin --save-dev
```

> 这个报错，我看见报错信息里有个3x版本，于是安装：

```
npm install clean-webpack-plugin@3.0.0 --save-dev
```

>引入：

```
const CleanWebpackPlugin = require('clean-webpack-plugin')
```

>继续报错，说CleanWebpackPlugin不是一个构造器，于是查了webpack官网，官网是这样引入的：

```
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

//使用时也不传参了

new CleanWebpackPlugin()
```

> 这样就可以了












学习webpack让我学会了大部分markdown语法，哈哈哈哈哈啊~~