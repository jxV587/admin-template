module.exports = {
	baseUrl: './',
	assetsDir: 'static',
	productionSourceMap: false,
	devServer: {
		host: '192.168.1.113',
		port: 8080,
		//     proxy: {
		//         '/api':{
		//             target:'http://jsonplaceholder.typicode.com',
		//             changeOrigin:true,
		//             pathRewrite:{
		//                 '/api':''
		//             }
		//         }
		//     }

	}
}
