Install the prismic.io command line interface (CLI):

```npm install -g prismic-cli```

Launch this command. You'll get a local copy of this code and a preconfigured prismic.io content repository to populate the landing pages.

```prismic theme https://github.com/lamenath/landing-page-theme```

Change the prismic.io API endpoint in ```prismic-config.js``` (set it to something like https://{the-prismic-repo-you-ve-just-created-with-the-cli}.prismic.io/api)

Go to the prismic.io repository you've just created with the CLI

Populate content for a page, **give it the sample-page uid** , publish and run

```nodemon```
