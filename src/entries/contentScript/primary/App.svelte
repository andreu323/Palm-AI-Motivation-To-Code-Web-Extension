<script>
  import { onMount } from "svelte"; 
  import { generateText } from "./ai";
  import Subtitle from "./subtitle.svelte";
  import { destroy_block } from "svelte/internal"; 
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length) {
        if (mutation.type == "childList") {
          var targettitle = document.querySelector(
            "div#title.style-scope.ytd-watch-metadata"
          );
          var author = document.querySelector(
            "a.yt-simple-endpoint.style-scope.yt-formatted-string"
          );
          set_subtitle(targettitle,mutation.target,author);
        }
      }
    });
  });

  function checkNode() {
    var targetNode = document.querySelector(
      "h1.title.style-scope.ytd-video-primary-info-renderer"
    );
    if (!targetNode) {
      window.setTimeout(checkNode, 500);
      return;
    }
    var targettitle = document.querySelector(
      "div#title.style-scope.ytd-watch-metadata"
    );
    var author = document.querySelector(
            "a.yt-simple-endpoint.style-scope.yt-formatted-string"
          );
    set_subtitle(targettitle,targetNode,author);
    var config = {
      childList: true,
      subtree: true,
    };
    observer.observe(targetNode, config);
  }
  checkNode();
  var subtitle;
  async function set_subtitle(title_insert,videoTitle,author) {
  
    const titleText = videoTitle.textContent;
    const authorText = author.textContent;  
    if (subtitle) subtitle.$destroy();
    subtitle = new Subtitle({
      target: title_insert,
      props: { title: await generateText(titleText,authorText) },
    });
  }
</script>

 