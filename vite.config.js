import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const fs = require("fs");
import {
  addFavicons,
  faviconsOutputDirPath,
  faviconsOutputDirFullPath,
  htmlBaseName
} from './VCPlaginHtml';

console.log(`\n========== РЕЖИМ: ${process.env.NODE_ENV && typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toUpperCase() : process.env.NODE_ENV} ==========\n`);

const htmlPlugin = () => { //* - https://vitejs.dev/guide/api-plugin.html#transformindexhtml.
  return {
    name: 'html-transform',
    async transformIndexHtml(html) {
      await addFavicons();
      let linkTags = fs.readFileSync(`${faviconsOutputDirFullPath}/${htmlBaseName}`, "utf8")
        .replace(/href="\//g, `href="${faviconsOutputDirPath}/`)
        .replace(/content="\//g, `content="${faviconsOutputDirPath}/`);

      return html.replace(
        /<head>/,
        `<head>\n    ${linkTags}`,
      )
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  plugins: [
    vue(),
    vueJsx(),
    htmlPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
