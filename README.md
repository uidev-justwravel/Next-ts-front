# Next TS Front App

This project requires **Node.js v20.14.0** to run.

## How to Initialize the Repository

### To set up and run the project, follow these steps:

```bash
git clone <repository-url>
cd <project-directory>
npm install
npm run dev
```

### To analyze your code and display any linting issues, run:

```bash
npm run lint
```

### To automatically fix linting issues wherever possible, use the --fix flag:

```bash
npm run lint -- --fix
```


### To locally build and run code execute these commands:
```bash
npm run build
npm start
```

### There should be a line gap between library imports and local file imports:
```bash
import Link from "next/link";
import { usePathname } from "next/navigation";

import SideDrawer from "../components/SideDrawer";
```


# Users you can use:
## Admin
```bash
      "username": "emilys",
      "password": "emilyspass",
```

## Moderator
```bash
      "username": "miar",
      "password": "miarpass",
```

## User
```bash
      "username": "evelyns",
      "password": "evelynspass",
```