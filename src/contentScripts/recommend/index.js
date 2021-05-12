const doc = document;
const getArticleTitle = () => {
  let title = '';

  // 微信公众号文章需单独方式取 title #activity-name
  if (doc.getElementById('activity-name')) {
    title = doc.getElementById('activity-name').textContent;
  } else {
    const titleNodes = document.getElementsByTagName('title');
    title = (titleNodes && titleNodes.length) ? titleNodes[0].textContent : '';
  }

  return title;
};

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'GET_TOPIC_INFO') {
    const title = getArticleTitle();

    const descNodes = doc.querySelectorAll('meta[name=description]');
    const descriptionEl = (descNodes && descNodes.length) ? descNodes[0] : '';
    const description = descriptionEl ? descriptionEl.getAttribute('content') : title;

    sendResponse({
      title: title.trim(),
      link: window.location.href,
      description: description.trim(),
    });
  }
});
