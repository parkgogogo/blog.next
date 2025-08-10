# Markdown Rendering Test

This is a test document for markdown rendering.

## Headers

### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header

## Text Formatting

**Bold Text**
*Italic Text*
~~Strikethrough~~
`Inline Code`

## Lists

### Unordered List
- Item 1
- Item 2
  - Nested Item 2.1
  - Nested Item 2.2

### Ordered List
1. First Item
2. Second Item
3. Third Item

## Links and Images

[Echo Site](https://echo.example.com)

![Test Image](/next.svg)

## Code Blocks

```javascript
function test() {
  console.log('Hello World');
}
```

## Blockquotes

> This is a blockquote
> with multiple lines

## Tables

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |

## Horizontal Rule

---

## Programming Scenarios

### REST API Example (Node.js + Express)
```javascript
const express = require('express');
const app = express();
app.use(express.json());

// GET /health
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// POST /echo
app.post('/echo', (req, res) => {
  const { message } = req.body || {};
  res.status(201).json({ echoed: message ?? 'no message' });
});

app.listen(3000, () => console.log('API listening on :3000'));
```

### Async/Await Error Handling (TypeScript)
```typescript
type User = { id: string; name: string };

async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);
  return res.json();
}

(async () => {
  try {
    const user = await fetchUser('123');
    console.log('user', user);
  } catch (err) {
    console.error('error', err);
  }
})();
```

### Shell Snippets
```bash
# Find TODOs in JS/TS
rg -n --glob '**/*.{js,ts,tsx}' 'TODO|FIXME'

# Start a Python venv and install deps
python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
```

### SQL: Pagination and Filtering
```sql
SELECT id, email, created_at
FROM users
WHERE status = 'active'
ORDER BY created_at DESC
LIMIT 20 OFFSET 40;
```

### Git Workflow
```bash
git switch -c feat/add-user-endpoints
git add .
git commit -m "feat(api): add user endpoints with validation"
git push -u origin feat/add-user-endpoints
```

### Dockerfile: Minimal Node Runtime
```Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

### Python: Data Class and Logging
```python
from dataclasses import dataclass
import logging

logging.basicConfig(level=logging.INFO)

@dataclass
class Config:
    retries: int = 3
    timeout_s: float = 2.5

def run_job(cfg: Config) -> None:
    for i in range(cfg.retries):
        logging.info("attempt %d/%d", i + 1, cfg.retries)
    logging.info("done with timeout %.1fs", cfg.timeout_s)

if __name__ == "__main__":
    run_job(Config())
```

### Go: Context with Timeout
```go
package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
	defer cancel()

	ch := make(chan string, 1)
	go func() {
		time.Sleep(300 * time.Millisecond)
		ch <- "result"
	}()

	select {
	case r := <-ch:
		fmt.Println("OK:", r)
	case <-ctx.Done():
		fmt.Println("Timeout:", ctx.Err())
	}
}
```

### Frontend: React Hooks Example
```tsx
import { useEffect, useState } from 'react';

export function Clock() {
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return <time dateTime={now.toISOString()}>{now.toLocaleTimeString()}</time>;
}
```

### Testing: Jest Example
```ts
import { sum } from './math';

test('sum adds numbers', () => {
  expect(sum(2, 3)).toBe(5);
});
```

### YAML: CI Workflow (GitHub Actions)
```yaml
name: CI
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test -- --ci
```
