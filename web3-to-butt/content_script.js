// Modified from https://github.com/panicsteve/cloud-to-butt

// For static pages, walk once
walk(document.body);

// For dynamic apps, like Twitter, observe all DOM mutations henceforth within document body
var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    walk(mutation.target);
  });
});
observer.observe(document.body, { subtree: true, childList: true });

function walk(node) {
  // Function from here: http://is.gd/mwZp7E
  // Don't replace user-editable content
  const tagName = node.tagName ? node.tagName.toLowerCase() : "";
  if (
    tagName == "input" ||
    tagName == "textarea" ||
    isInsideContentEditable(node)
  ) {
    return;
  }

  var child, next;

  switch (node.nodeType) {
    case 1: // Element
    case 9: // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;

    case 3: // Text node
      handleText(node);
      break;
  }
}

function handleText(textNode) {
  var v = textNode.nodeValue;

  // We try to make it sound as natural as it can
  v = v.replace(/\bThe web3\b/g, "The butt");
  v = v.replace(/\bthe web3\b/g, "the butt");
  v = v.replace(/\bA web3\b/g, "A butt");
  v = v.replace(/\ba web3\b/g, "a butt");
  v = v.replace("Web3.0", "My Big Butt");
  v = v.replace(/\bWeb3\.0\b/g, "My Butt");
  v = v.replace(/\bweb3\b/g, "my butt");
  v = v.replace(/\bWeb3\b/g, "My Butt");
  v = v.replace(/\bweb 3\b/g, "my butt");

  textNode.nodeValue = v;
}

function isInsideContentEditable(node) {
  while (node.parentNode) {
    if (node.contentEditable === "true") {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
