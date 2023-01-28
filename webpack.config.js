const path = require('path');
const HTMLWebpackPlugin=require('html-webpack-plugin');

module.exports = {

	entry: './src/index.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
		assetModuleFilename:'[name][ext]',
		publicPath: '/',
	},
    devServer:{
	
		historyApiFallback:true,
		open:true,
		compress:true,
        port:3000,
		static: {
            directory: path.join(__dirname, "dist"),
        },
      
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:'./src/index.html'
        })
    ],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-react', '@babel/preset-env'],
					},
				},
			},
            {
				test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                   
                ]

                
            },
			{
				test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
				use: [
				  {
					loader: 'url-loader',
					options: {
					  limit: 8192,
					  name:'[name].[ext]',
					  outputPath:'assets',
					  publicPath:'assets',

					}
				  }]
			},
			{
				test: /\.mp4$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name:'[name].[ext]',
							outputPath:'assets/',
							publicPath:'assets/',
						}
					}
				]
			}
				  
			
		],
	},


};