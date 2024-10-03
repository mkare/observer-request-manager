# Observer Request Manager

This repository houses a **TypeScript-based Request Manager** built around the **Observer** design pattern. It provides a simple yet powerful way to handle API requests and state changes in modern JavaScript applications.

## Table of Contents

- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Scripts](#scripts)
- [License](#license)

## Key Features

- **Observer Pattern**: This design pattern promotes good coding practices and provides a robust system for tracking request states.
- **State Management**: Gracefully handle state changes in your application. Our manager allows you to track the status of your requests from loading to completion, making debugging easier.
- **API Utilities**: Utility functions to interact with specific API endpoints, simplifying the process of sending requests and handling responses.

## Installation

To install the necessary dependencies for the project, run the following command:

```bash
npm install
```

## Usage

The `Observer Request Manager` can be used to handle HTTP requests efficiently. Below is a simple example of how to utilize the request manager:

### Example Usage

In the `src/api/api.ts` file, you can implement your API calls:

```typescript
import {
  RequestManager,
  RequestMethod,
} from "../requestManager/requestManager";

// Create an instance of the RequestManager
const requestManager = new RequestManager();

// Make a GET request to a specific endpoint
async function fetchData() {
  try {
    const data = await requestManager.makeRequest<ResponseData>(
      RequestMethod.GET,
      "https://jsonplaceholder.typicode.com/posts"
    );
    console.log("Fetched Data:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
```

## File Structure

Here's an overview of the project structure:

```
observer-request-manager/
├── package.json
├── rollup.config.cjs
├── src/
│   ├── api/
│   │   ├── api.ts          # API request utilities
│   │   └── index.ts        # Example usage
│   └── requestManager/
│       ├── observer.ts     # Observer implementation
│       ├── requestManager.ts # Request management logic
│       └── types.ts        # Type definitions
├── dist/                   # Compiled output (after build)
└── README.md               # Project documentation
```

## Scripts

This project includes several scripts that can be run using npm:

- `build`: Compiles the TypeScript files into JavaScript using Rollup. Run with:
  ```bash
  npm run build
  ```
- `serve`: Launches a lightweight web server to serve the `index.html` file. Run with:
  ```bash
  npm run serve
  ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
