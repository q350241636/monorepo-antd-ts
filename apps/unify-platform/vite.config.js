import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'
import fs,{realpathSync} from 'fs'
import { defineConfig } from 'vite'
import path from 'path'
import lessToJS from 'less-vars-to-js'
import legacy from '@vitejs/plugin-legacy'

const appDirectory = realpathSync(process.cwd());
const resolveApp = relativePath => resolve(appDirectory, relativePath);
// const proxySetting = resolveApp('package.json').proxy;

// console.log('proxySetting',proxySetting)

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './config/variables.less'), 'utf8')
)
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'src': resolve(__dirname, 'src'),
      '@':resolve(__dirname, 'src')
    },
  },
  plugins: [ reactRefresh(),legacy() ],
  server: {
    proxy: {
      // 字符串简写写法
      '/api':{
        target: 'https://www.landluck.cn/react-ant-admin-api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
        modifyVars: themeVariables,
				additionalData: (content, resourcePath) => {
					// 解决 antd 与 pro-components 样式重复引入问题，过滤pro-components的样式。
					if (/antd\/es/.test(resourcePath)) {
						// console.log("跳过：", resourcePath);
						return "";
					} else {
						return content;
					}
				},
			},
		},
	}
})