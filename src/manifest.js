import pkg from "../package.json";

const manifest = {
 
 
  content_scripts: [
    {
      js: ["src/entries/contentScript/primary/main.js"],
      css: ['src/app.css'],
      matches: ["*://www.youtube.com/*"],
 
    },
  ],
  host_permissions: ["*://www.youtube.com/*"],
  icons: {  
    16: "icons/sofa.png",  
  },
 
};

export function getManifest() {
  return {
    author: pkg.author,
    description: pkg.description,
    name: pkg.displayName ?? pkg.name,
    version: pkg.version,
    manifest_version: 3,
    ...manifest,
  };
}
