import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import favicons from "favicons"; //* - Подробнее на сайте "https://github.com/itgalaxy/favicons".
import path from "path";
import fsPromises from "fs/promises";
const fs = require("fs");

const outputDir = './dist';
const faviconsOutputDirPath = 'assets/favicons';
const faviconsOutputDirFullPath = `${outputDir}/${faviconsOutputDirPath}`; // Output directory path.
const logoImg = './src/assets/favicon/logo.png'; // Source image(s). `string`, `buffer` or array of `string`
const htmlBaseName = 'index.html'; // HTML file basename.

const configuration = {
  //? path: "/", // Path for overriding default icons path. `string`
  appName: 'Weatemp', // Your application's name. `string`
  appShortName: 'Weatemp', // Your application's short_name. `string`. Optional. If not set, appName will be used
  appDescription: 'Погода для Вашего местоположения и любого города мира', // Your application's description. `string`
  developerName: 'Беркуль Юрий Эдуардович', // Your (or your developer's) name. `string`
  developerURL: null, // Your (or your developer's) URL. `string`
  dir: "auto", // Primary text direction for name, short_name, and description
  lang: "ru-RU", // Primary language for name and short_name
  background: "#6495ed", // Background colour for flattened icons. `string`
  theme_color: "#6495ed", // Theme color user for example in Android's task switcher. `string`
  appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
  display: "standalone", // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
  orientation: "any", // Default orientation: "any", "natural", "portrait" or "landscape". `string`
  //? scope: "/", // set of URLs that the browser considers within your app
  //? start_url: "/?homescreen=1", // Start URL when launching the application from a device. `string`
  preferRelatedApplications: true, // Should the browser prompt the user to install the native companion app. `boolean`
  //? relatedApplications: undefined, // Information about the native companion apps. This will only be used if `preferRelatedApplications` is `true`. `Array<{ id: string, url: string, platform: string }>`
  version: "1.0", // Your application's version string. `string`
  //? pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
  loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
  manifestMaskable: true, // Maskable source image(s) for manifest.json. "true" to use default source. More information at https://web.dev/maskable-icon/. `boolean`, `string`, `buffer` or array of `string`
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //
    android: "#6495ed", // Create Android homescreen icon. `boolean` or `{ offset, background }` or an array of sources
    appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background }` or an array of sources
    appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }` or an array of sources
    favicons: true, // Create regular favicons. `boolean` or `{ offset, background }` or an array of sources
    windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background }` or an array of sources
    yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background }` or an array of sources
  },
  //? shortcuts: [
    // Your applications's Shortcuts (see: https://developer.mozilla.org/docs/Web/Manifest/shortcuts)
    // Array of shortcut objects:
  //     {
  //?         name: "View your Inbox", // The name of the shortcut. `string`
  //?         short_name: "inbox", // optionally, falls back to name. `string`
  //?         description: "View your inbox messages", // optionally, not used in any implemention yet. `string`
  //?         url: "/inbox", // The URL this shortcut should lead to. `string`
  //?         icon: "test/inbox_shortcut.png", // source image(s) for that shortcut. `string`, `buffer` or array of `string`
  //     },
    // more shortcuts objects
  // ],
};

const addFavicons = async () => {
  const response = await favicons(logoImg, configuration);
  await fsPromises.mkdir(faviconsOutputDirFullPath, { recursive: true });
  await Promise.all(
    response.images.map(
      async (image) => {
        await fsPromises.writeFile(path.join(faviconsOutputDirFullPath, image.name), image.contents)
      }
    )
  );
  await Promise.all(
    response.files.map(
      async (file) => {
        await fsPromises.writeFile(path.join(faviconsOutputDirFullPath, file.name), file.contents)
      }
    )
  );
  await fsPromises.writeFile(path.join(faviconsOutputDirFullPath, htmlBaseName), response.html.join("\n    "));
};

const htmlPlugin = () => {
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
  mode: 'production',
  plugins: [
    vue(),
    vueJsx(),
    htmlPlugin()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
