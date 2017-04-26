module.exports = {

  // This function will be used to generate links to Prismic.io documents

  apiEndpoint: 'https://originate-demo.prismic.io/api',

  // This function will be used to generate links to Prismic.io documents
  // As your project grows, you should update this function according to your routes
  linkResolver: function(doc, ctx) {
    if (doc.type == 'page') {
      return '/' + doc.uid;
    }
    else if (doc.type == 'spotlight') {
      return '/spotlight/' + doc.uid;
    }
    else if (doc.type == 'event') {
      return '/event/' + doc.uid;
    }
    return '/';
  }
};
