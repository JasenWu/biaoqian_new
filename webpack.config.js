const webpack = require('webpack');//引入webpack
const HtmlWebpackPlugin = require('html-webpack-plugin');//引入webpack插件 主要是生成html文件,我们这里主要用来把我们的html文件打包
const ExtractTextPlugin = require('extract-text-webpack-plugin');//这个webpack插件主要用来将js文件中的require的css分离打包
const path = require('path');//引入nodejs的path模块,主要为获取文件及其路径 然后方便操作
const glob = require('glob');//引入nodejs的glob模块,获取目标路径下的所有文件
const CopyWebpackPlugin = require('copy-webpack-plugin');//这个webpack插件主要用来拷贝文件,可惜拷贝的时候没有办法压缩,一大遗憾
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');//这个webpack插件主要用来合并js文件 我们如果写了很多vue插件的文件 可以合并为一个文件啊
const CleanWebpackPlugin = require('clean-webpack-plugin');//打包前删除文件
const ROOT_PATH = path.resolve(__dirname);//获取当前项目目录的字符串表示


//获取指定文件夹下所有指js和html并生成webpack入口js对象，如：
/*
 {
 jsEntries:
     { '/Users/jason/workspaces/webpackSample_React/js/index': './src/js/index.js',
     '/Users/jason/workspaces/webpackSample_React/js/login': './src/js/login.js' },

 htmlEntries:
     { '/Users/jason/workspaces/webpackSample_React/js/index': './src/template/index.html',
     '/Users/jason/workspaces/webpackSample_React/js/login': './src/template/login.html' }
 }

 */
function getEntry(globPath,type) {
    var files = glob.sync(globPath);//模糊匹配指定路径下的指定文件
    var entries = {},//js入口文件对象
        htmlEntrys = {},//html入口文件对象
        entry,
        dirname,
        basename,
        pathname,
        extname;
    for (var i = 0; i < files.length; i++) {//循环遍历所有html文件
        entry = files[i];//获得每个html文件的路径
        dirname = path.dirname(entry);//返回路径中代表文件夹的部分
        extname = path.extname(entry);//返回路径中文件的后缀名、扩展名、文件类型
        basename = path.basename(entry, extname);//返回路径中的最后一部分,extname表示把extname替换掉, 这里本意就是获取到文件名作为key
        pathname = './js/' + basename;
        //遍历整理html文件
        htmlEntrys[pathname] = files[i];
        //遍历整理js文件
        var jsFiles = glob.sync('./src/js/' + basename + '.js');//模糊匹配指定路径下的指定文件
        if (jsFiles.length > 0) {
            entries[pathname] = jsFiles[0];
        }
    }

    if(type == 'html'){
        return htmlEntrys;
    }else if(type == 'js'){
        return  entries;
    }

}

//生成Plugin插件数组

function createPlugins(htmlsEntryObj){
    var _Plugin = [];
    for (var key in htmlsEntryObj) {
        console.log("key",key);
        var htmlName = key.substring(key.lastIndexOf("/")+1,key.length);
        _Plugin.push(new HtmlWebpackPlugin({

            filename: htmlName + '.html',//这里面的key是哪里来的呢 是htmlsEntryObj的key,htmlsEntryObj的key是对应的每一个html文件的路径 他其实和js路径是一样的（在我们的项目中,我们把业务html文件和业务js放在同一个文件夹里）
            template: htmlsEntryObj[key],//参照html模板是

            inject: true,//true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。

            chunks: [key,'./js/common.js']//允许只对添加某些块 应entry那边指定的那些模块

        }))
    }
    _Plugin.push(new CopyWebpackPlugin([{from: __dirname + '/src/img/',to: __dirname + '/build/img/'}]));
    return _Plugin;
}



var _htmlsEntry = getEntry('./src/*.html','html');//获取当前目录指定的html文件--mac上面后面的src\\改成src/

var _entryJs = getEntry('./src/*.html','js');//获取当前目录指定的js文件--mac上面后面的src\\改成src/

var _plugin  = createPlugins(_htmlsEntry);//将html文件存放到HtmlWebpackPlugin数组中

module.exports = {
    devtool: 'eval-source-map',
    entry: _entryJs, //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build/", //打包后的文件存放的地方
        filename: '[name]-[hash].js' //打包后输出文件的文件名
    },
    devServer: {
        contentBase: "./build/", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        //hot: true
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader",

            },
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader",
                options: {
                    modules: true
                }
            }, {
                loader: "postcss-loader"
            }]
        }]
    }, plugins:_plugin
}
