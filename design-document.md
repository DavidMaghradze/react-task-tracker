# Design Decisions Document

### Choice of State Management:
  - Decision: Used React’s built-in useState, useEffect hooks for state management and Context API with Provider Pattern for managing Tasks state accross multiple components.
  - Reason: For this project local state management with Context is enough and straightforward.
  - Alternatives: Redux Toolkit or react-query. my personal choice would be react-query ([TansStack Query](https://tanstack.com/query/v3)).

### Styling Approach:
  - Decision: Used CSS modules for styling.
  - Reason: CSS modules provide scoped and modular CSS, reducing the risk of style conflicts.
  - Alternatives: I considered using styled-components or a CSS-in-JS library but chose CSS modules for simplicity and performance in this context. I also like Tailwind CSS, which is very customisable to build maintainable big web projects.

### Testing Strategy:
  - Decision: Implemented Jest and React Testing Library for testing.
  - Reason: These tools provide robust support for unit and integration testing and are widely used in the React ecosystem.
  - Alternatives: Other testing libraries like Enzyme were considered, but React Testing Library's focus on user behavior made it a better fit for this task and also is recommended by react.
