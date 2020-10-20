# Frontend Testing

## Scripts

- `npm install` - install npm packages for both backend and frontend
- `npm start` - start both backend and frontend

## Running the backend

- `node index.js server` - start the backend in server mode
- `node index.js runTest` - run a single test, require arguments

### Run test arguments

- `-u --url` - (**required**) url of the page to test
- `-f --file` - path to the file for the test config
- `-c --categories` - set which categories to test, if omitted all categories will be tested, possible categories are: *performance*, *accessibility*, *best-practices*, *seo*, *pwa*
- `-m --mobile` - if set the test will run in mobile mode
- `-s --speed` - set mobile network speed, possible values are 2g, 3g and 4g
- `--cookies` - list cookies to set before running the test, format should be: name=value

  If file is set the **categories**, **mobile** and **speed** arguments will be ignored.

  Config file structure:

  ``` json
    {
        "onlyCategories": ["seo", "pwa"],
        "mobile": true,
        "mobileDataSpeed": "3g",
        "cookies": [
            {"name": "cookieName", "value": "cookieValue"}
        ]
    }
  ```
