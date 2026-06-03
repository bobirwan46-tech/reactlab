export const lessonsData = [
  {
    lessonNumber: 1,
    id: "components",
    title: "Components",
    level: "Beginner",
    time: "15 min",
    summary:
      "Learn how React breaks a user interface into small reusable building blocks.",
    learningGoal:
      "Understand what a React component is, why components are useful, and how they help you build large applications in a cleaner way.",
    explanation:
      "A component is a reusable piece of user interface. Instead of writing one large page, React encourages you to split the page into smaller parts such as buttons, cards, forms, navbars, modals and sections. Each component focuses on one job, which makes your code easier to understand, update and reuse.",
    realWorldUse:
      "In ReactLab, components are used for the Navbar, LessonCard, RoadmapCard, Modal, Drawer, FeaturedLessons section and many other parts of the interface.",
    keyPoints: [
      "Components are reusable UI blocks.",
      "A component usually returns JSX.",
      "Component names should start with a capital letter.",
      "Breaking a page into components makes your app easier to maintain.",
    ],
    commonMistake:
      "A common beginner mistake is putting the whole page into one very large component. This makes the file difficult to read and harder to update later.",
    code: `function WelcomeCard() {
  return (
    <div>
      <h2>Welcome to ReactLab</h2>
      <p>This is your first component.</p>
    </div>
  );
}`,
    practiceSteps: [
      "Create a new component called ProfileCard.",
      "Add a name, role and short description inside it.",
      "Render ProfileCard inside another page.",
      "Try creating a second card using the same component structure.",
    ],
    challenge:
      "Create a ProfileCard component that shows a name, role and short description.",
  },
  {
    lessonNumber: 2,
    id: "props",
    title: "Props",
    level: "Beginner",
    time: "15 min",
    summary:
      "Learn how to pass data into components so they can display different content.",
    learningGoal:
      "Understand how props allow parent components to send values into child components.",
    explanation:
      "Props are values passed into a component. They make a component flexible because the same component can display different information depending on the props it receives. Instead of hardcoding the title, description or difficulty inside a card, you can pass those values from the parent component.",
    realWorldUse:
      "In ReactLab, LessonCard receives props such as title, description, difficulty, time and icon. This allows one card design to display many different lessons.",
    keyPoints: [
      "Props are passed from parent to child.",
      "Props make components reusable.",
      "Props are read-only inside the child component.",
      "Destructuring props makes the code cleaner.",
    ],
    commonMistake:
      "A common mistake is changing props directly inside the child component. Props should be treated as read-only values.",
    code: `function LessonCard({ title, description }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}`,
    practiceSteps: [
      "Create a LessonCard component.",
      "Pass title and description into it.",
      "Render the same component twice with different values.",
      "Add a difficulty prop and display it as a label.",
    ],
    challenge:
      "Update LessonCard so it accepts title, description and difficulty as props.",
  },
  {
    lessonNumber: 3,
    id: "state",
    title: "useState",
    level: "Beginner",
    time: "18 min",
    summary:
      "Learn how React remembers changing values and updates the screen when they change.",
    learningGoal:
      "Understand how useState stores values inside a component and causes React to re-render when the value changes.",
    explanation:
      "useState is a React Hook that lets a component remember information. This information can be a number, text, boolean, array or object. When the state changes, React automatically updates the user interface to show the latest value.",
    realWorldUse:
      "In ReactLab, useState is used for search inputs, selected filters, pagination, modal visibility, login form values and selected lesson details.",
    keyPoints: [
      "useState stores values inside a component.",
      "State changes cause the UI to re-render.",
      "The first value is the current state.",
      "The second value is the function used to update the state.",
    ],
    commonMistake:
      "A common mistake is trying to update state by changing the variable directly. You must use the setter function, such as setCount or setSearch.",
    code: `const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  Count: {count}
</button>`,
    practiceSteps: [
      "Create a count state with an initial value of 0.",
      "Add a button to increase the count.",
      "Add another button to decrease the count.",
      "Add a reset button that returns the value to 0.",
    ],
    challenge:
      "Create a counter with increase, decrease and reset buttons.",
  },
  {
    lessonNumber: 4,
    id: "events",
    title: "Event Handling",
    level: "Beginner",
    time: "15 min",
    summary:
      "Learn how React responds when users click, type, submit or interact with the page.",
    learningGoal:
      "Understand how event handlers connect user actions to changes in your React application.",
    explanation:
      "Event handling allows your app to respond to user actions. In React, you can attach functions to events such as onClick, onChange, onSubmit and onMouseEnter. When the event happens, React runs the function you provided.",
    realWorldUse:
      "In ReactLab, event handling is used when users click filters, open lesson cards, submit login forms, upload files and navigate between pages.",
    keyPoints: [
      "Events connect user actions to functions.",
      "onClick is used for button clicks.",
      "onChange is commonly used for form inputs.",
      "onSubmit is used for form submission.",
    ],
    commonMistake:
      "A common mistake is calling the function immediately instead of passing the function reference. Use onClick={handleClick}, not onClick={handleClick()}.",
    code: `function ClickButton() {
  function handleClick() {
    alert("Button clicked");
  }

  return <button onClick={handleClick}>Click me</button>;
}`,
    practiceSteps: [
      "Create a button.",
      "Create a handleClick function.",
      "Connect the button to the function using onClick.",
      "Change a message on the screen when the button is clicked.",
    ],
    challenge:
      "Create a button that changes a message when clicked.",
  },
  {
    lessonNumber: 5,
    id: "conditional-rendering",
    title: "Conditional Rendering",
    level: "Beginner",
    time: "18 min",
    summary:
      "Learn how to show different UI depending on state, props or user actions.",
    learningGoal:
      "Understand how React can display different content when conditions are true or false.",
    explanation:
      "Conditional rendering means showing different elements depending on a condition. For example, you may show a login message when the user is not signed in, and a welcome message when the user is authenticated. This is one of the most important techniques for building interactive interfaces.",
    realWorldUse:
      "In ReactLab, conditional rendering is used for login/logout buttons, protected route messages, loading states, empty states, error messages and modal visibility.",
    keyPoints: [
      "Conditional rendering controls what appears on screen.",
      "Ternary operators are useful for either/or UI.",
      "The && operator is useful for showing something only when a condition is true.",
      "It is often used with state and authentication.",
    ],
    commonMistake:
      "A common mistake is making conditions too complex inside JSX. If the logic becomes hard to read, move it into a separate variable before the return statement.",
    code: `{isLoggedIn ? (
  <p>Welcome back!</p>
) : (
  <p>Please log in.</p>
)}`,
    practiceSteps: [
      "Create an isLoggedIn state.",
      "Show a welcome message when it is true.",
      "Show a login prompt when it is false.",
      "Add a button to toggle the login state.",
    ],
    challenge:
      "Create a login status message that changes depending on whether the user is logged in.",
  },
  {
    lessonNumber: 6,
    id: "lists",
    title: "Rendering Lists",
    level: "Beginner",
    time: "18 min",
    summary:
      "Learn how to display arrays of data using the JavaScript map method.",
    learningGoal:
      "Understand how React renders repeated UI from arrays and why each item needs a unique key.",
    explanation:
      "Many applications need to display lists of items such as products, posts, lessons, users or notifications. In React, you usually render lists using the map method. Each item should have a unique key so React can efficiently track which items changed.",
    realWorldUse:
      "In ReactLab, lists are used to display lessons, roadmap items, posts, filters, pagination buttons and uploaded files.",
    keyPoints: [
      "Use map to turn arrays into JSX.",
      "Each rendered item should have a unique key.",
      "Keys help React update lists efficiently.",
      "Avoid using array index as key when the list can change order.",
    ],
    commonMistake:
      "A common mistake is forgetting the key prop. React may still display the list, but it will warn you and updates may become less predictable.",
    code: `{lessons.map((lesson) => (
  <div key={lesson.id}>
    <h3>{lesson.title}</h3>
  </div>
))}`,
    practiceSteps: [
      "Create an array of products.",
      "Use map to display each product.",
      "Add a unique id to each product.",
      "Display the product name and price.",
    ],
    challenge:
      "Create a list of products and display each product name and price.",
  },
  {
    lessonNumber: 7,
    id: "forms",
    title: "Forms and Controlled Inputs",
    level: "Beginner",
    time: "22 min",
    summary:
      "Learn how React manages form values using state and controlled inputs.",
    learningGoal:
      "Understand how input values can be stored in React state and updated as the user types.",
    explanation:
      "A controlled input is an input field whose value is controlled by React state. This means the input value comes from state, and every change updates that state. Controlled inputs make it easier to validate, submit, reset and manage form data.",
    realWorldUse:
      "In ReactLab, controlled inputs are used for login forms, registration forms, post creation forms, edit forms, search fields and upload labels.",
    keyPoints: [
      "Controlled inputs store their value in state.",
      "onChange updates the state as the user types.",
      "Forms become easier to validate and reset.",
      "Each input usually needs its own state value.",
    ],
    commonMistake:
      "A common mistake is adding a value prop without an onChange handler. This makes the input read-only.",
    code: `const [name, setName] = useState("");

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`,
    practiceSteps: [
      "Create a name state.",
      "Connect it to an input value.",
      "Update the state using onChange.",
      "Display the typed value below the input.",
    ],
    challenge:
      "Create a form with name, email and phone fields.",
  },
  {
    lessonNumber: 8,
    id: "use-effect",
    title: "useEffect",
    level: "Intermediate",
    time: "25 min",
    summary:
      "Learn how to run side effects when a component loads or when values change.",
    learningGoal:
      "Understand when to use useEffect and how dependency arrays control when the effect runs.",
    explanation:
      "useEffect is a React Hook used for side effects. A side effect is anything that interacts with something outside the normal render process, such as fetching data, reading localStorage, setting event listeners or updating the document title. The dependency array controls when the effect should run.",
    realWorldUse:
      "In ReactLab, useEffect is used to fetch posts from the backend, debounce search input, listen to scroll events, read stored theme preferences and update UI when data changes.",
    keyPoints: [
      "useEffect runs after render.",
      "An empty dependency array means the effect runs once after mount.",
      "Dependencies tell React when to re-run the effect.",
      "Cleanup functions remove listeners or subscriptions.",
    ],
    commonMistake:
      "A common mistake is forgetting the dependency array, which can cause the effect to run more often than expected.",
    code: `useEffect(() => {
  console.log("Component loaded");
}, []);`,
    practiceSteps: [
      "Create a component with useEffect.",
      "Log a message when the component loads.",
      "Add a state value and include it as a dependency.",
      "Watch how the effect runs when the state changes.",
    ],
    challenge:
      "Use useEffect to load data when a page first opens.",
  },
  {
    lessonNumber: 9,
    id: "custom-hooks",
    title: "Custom Hooks",
    level: "Intermediate",
    time: "25 min",
    summary:
      "Learn how to move reusable stateful logic into your own custom hooks.",
    learningGoal:
      "Understand how custom hooks help reduce repeated logic and keep components cleaner.",
    explanation:
      "A custom hook is a reusable JavaScript function that uses React Hooks. Custom hooks are useful when multiple components need the same logic. Instead of copying the same state and effect code into many files, you can place that logic in one hook and reuse it.",
    realWorldUse:
      "In ReactLab, a useLocalStorage hook can be used to store dark mode preferences, authentication data or other persistent settings.",
    keyPoints: [
      "Custom hooks usually start with the word use.",
      "They can use built-in hooks like useState and useEffect.",
      "They help keep components focused on UI.",
      "They are useful for shared logic such as localStorage or fetching data.",
    ],
    commonMistake:
      "A common mistake is creating a custom hook too early. First build the logic once, then extract it into a hook when you see it being repeated.",
    code: `function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  return [value, setValue];
}`,
    practiceSteps: [
      "Create a useLocalStorage function.",
      "Use useState to store the value.",
      "Read the initial value from localStorage.",
      "Return the value and setter function.",
    ],
    challenge:
      "Create a custom hook that stores and reads a value from localStorage.",
  },
  {
    lessonNumber: 10,
    id: "react-router",
    title: "React Router",
    level: "Intermediate",
    time: "30 min",
    summary:
      "Learn how to create multiple pages in a React application without reloading the browser.",
    learningGoal:
      "Understand how React Router connects URLs to components and allows users to move between pages.",
    explanation:
      "React Router allows your React app to behave like a multi-page website while still running as a single-page application. Each route maps a URL path to a component. This lets users visit pages such as Home, Lessons, Login and API Lab without the browser fully reloading.",
    realWorldUse:
      "In ReactLab, React Router is used for Home, Lessons, Concepts, Lab, API Lab, Upload Lab, Login and dynamic lesson detail pages such as /lessons/components.",
    keyPoints: [
      "Routes connect URL paths to components.",
      "RouterProvider renders the active route.",
      "Nested routes allow shared layouts.",
      "Dynamic routes use parameters such as /lessons/:id.",
    ],
    commonMistake:
      "A common mistake is using normal anchor tags for internal navigation. In React Router, use Link or navigate to avoid full page reloads.",
    code: `<Route path="/lessons" element={<Lessons />} />`,
    practiceSteps: [
      "Create routes for Home and Lessons.",
      "Add a Login route.",
      "Create a dynamic route using /lessons/:id.",
      "Use Link or navigate to move between pages.",
    ],
    challenge:
      "Create routes for Home, Lessons, Lab and Login pages.",
  },

  // Keep lessons 11–33 from your current file below this line.
  {
    lessonNumber: 11,
    id: "shared-layouts",
    title: "Shared Layouts",
    level: "Intermediate",
    time: "25 min",
    summary:
      "Learn how to reuse common page structure across multiple routes.",
    learningGoal:
      "Understand how shared layouts help you avoid repeating the same navbar, footer and wrapper structure on every page.",
    explanation:
      "A shared layout is a component that wraps several pages with the same structure. For example, most pages in an app may need the same navbar at the top and the same main content container. Instead of adding the navbar to every page manually, you can create one layout component and let different pages render inside it.",
    realWorldUse:
      "In ReactLab, MainLayout is used to wrap main pages such as Home, Lessons, Concepts, Lab, API Lab, Upload Lab and Login. This keeps the application consistent and avoids repeating the Navbar in every page file.",
    keyPoints: [
      "Shared layouts reduce repeated page structure.",
      "They are commonly used with nested routes.",
      "Outlet decides where child routes appear.",
      "Layouts make large apps easier to organise.",
    ],
    commonMistake:
      "A common mistake is importing the Navbar into every page manually. This works at first, but becomes harder to maintain when the app grows.",
    code: `function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}`,
    practiceSteps: [
      "Create a MainLayout component.",
      "Place Navbar inside the layout.",
      "Add a main element for page content.",
      "Use Outlet so child pages can render inside the layout.",
    ],
    challenge:
      "Create a MainLayout that wraps all main pages with a shared navbar.",
  },
  {
    lessonNumber: 12,
    id: "context-api",
    title: "Context API",
    level: "Intermediate",
    time: "30 min",
    summary:
      "Learn how to share data across many components without passing props manually.",
    learningGoal:
      "Understand how Context API helps manage shared values such as login state, user information and theme preferences.",
    explanation:
      "Context API allows data to be made available to many components without passing it through every level as props. This is useful when several parts of the app need the same information. Instead of passing a value from parent to child to grandchild, you provide the value once and consume it wherever it is needed.",
    realWorldUse:
      "In ReactLab, AuthContext stores login state, token and user information. ThemeContext stores dark mode preferences. This allows components like Navbar, ProtectedRoute and page components to access shared state easily.",
    keyPoints: [
      "Context shares values across components.",
      "A Provider makes the value available.",
      "useContext reads the shared value.",
      "Context is useful for app-wide state, not every small local value.",
    ],
    commonMistake:
      "A common mistake is using Context for every piece of state. Local state should still stay inside the component when only one component needs it.",
    code: `const ThemeContext = createContext();

function useTheme() {
  return useContext(ThemeContext);
}`,
    practiceSteps: [
      "Create a ThemeContext.",
      "Wrap your app with a ThemeProvider.",
      "Store dark mode state inside the provider.",
      "Use useContext to read and toggle dark mode from another component.",
    ],
    challenge:
      "Create a ThemeContext that stores dark mode and allows components to toggle it.",
  },
  {
    lessonNumber: 13,
    id: "authentication",
    title: "Authentication",
    level: "Intermediate",
    time: "35 min",
    summary:
      "Learn how login and logout flows work in a React application.",
    learningGoal:
      "Understand how a frontend stores authentication data after login and uses it to control access to protected features.",
    explanation:
      "Authentication is the process of confirming who a user is. In a typical React app, the user submits an email and password, the backend verifies the credentials, and the frontend receives authentication data such as a token and user object. The app can then remember the login session and show different UI depending on whether the user is authenticated.",
    realWorldUse:
      "In ReactLab, authentication is used so users can log in, store a JWT token, access protected pages such as API Lab and Upload Lab, and create or manage their own posts.",
    keyPoints: [
      "Authentication confirms the user's identity.",
      "The backend usually verifies the email and password.",
      "The frontend stores authentication data after successful login.",
      "Login state can control what the user is allowed to see or do.",
    ],
    commonMistake:
      "A common mistake is only changing the frontend UI after login without actually verifying the user through the backend.",
    code: `function login(authData) {
  localStorage.setItem("token", authData.token);
  localStorage.setItem("user", JSON.stringify(authData.user));

  setToken(authData.token);
  setUser(authData.user);
}`,
    practiceSteps: [
      "Create a login form with email and password fields.",
      "Send the login details to the backend.",
      "Store the returned token and user object.",
      "Update the UI after login succeeds.",
    ],
    challenge:
      "Create a login function that stores a token and user object in localStorage.",
  },
  {
    lessonNumber: 14,
    id: "protected-routes",
    title: "Protected Routes",
    level: "Intermediate",
    time: "30 min",
    summary:
      "Learn how to prevent unauthenticated users from opening private pages.",
    learningGoal:
      "Understand how protected routes check login state before allowing access to certain pages.",
    explanation:
      "Protected routes are routes that should only be visible to authenticated users. Before rendering the page, the route checks whether the user is logged in. If not, the app can redirect the user to the login page or show a message asking them to sign in.",
    realWorldUse:
      "In ReactLab, ProtectedRoute is used to protect API Lab and Upload Lab. This means users must log in before they can access features that create posts, update data or upload files.",
    keyPoints: [
      "Protected routes control access to private pages.",
      "They usually check authentication state.",
      "Unauthenticated users can be redirected to login.",
      "They improve both user experience and app structure.",
    ],
    commonMistake:
      "A common mistake is hiding a link in the Navbar but leaving the actual route unprotected. The route itself should also check access.",
    code: `if (!isAuthenticated) {
  return <Navigate to="/login" />;
}

return children;`,
    practiceSteps: [
      "Create a ProtectedRoute component.",
      "Read authentication status from context.",
      "Return children when the user is authenticated.",
      "Redirect to login when the user is not authenticated.",
    ],
    challenge:
      "Protect the API Lab page so only logged-in users can access it.",
  },
  {
    lessonNumber: 15,
    id: "api-integration",
    title: "API Integration",
    level: "Intermediate",
    time: "35 min",
    summary:
      "Learn how React connects to a backend API to load and send data.",
    learningGoal:
      "Understand how the frontend uses fetch to communicate with a backend server.",
    explanation:
      "API integration allows your React app to request data from a backend and send data back to it. The frontend sends an HTTP request, the backend processes it, and the frontend receives a response. This is how full-stack apps move beyond static pages and start working with real data.",
    realWorldUse:
      "In ReactLab, API integration is used to fetch posts from the Express backend, create new posts, update existing posts, delete posts, log in users and upload files.",
    keyPoints: [
      "APIs allow frontend and backend to communicate.",
      "fetch sends HTTP requests from React.",
      "Responses are often returned as JSON.",
      "API calls usually need loading and error states.",
    ],
    commonMistake:
      "A common mistake is forgetting to await response.json(), which means the app does not actually read the response body.",
    code: `const response = await fetch("http://127.0.0.1:5001/posts");
const data = await response.json();`,
    practiceSteps: [
      "Create a function that fetches posts.",
      "Call the function when the page loads.",
      "Store the returned posts in state.",
      "Display the posts in a list.",
    ],
    challenge:
      "Fetch posts from your Express API and display them in React.",
  },
  {
    lessonNumber: 16,
    id: "crud",
    title: "CRUD Operations",
    level: "Intermediate",
    time: "40 min",
    summary:
      "Learn how applications create, read, update and delete data.",
    learningGoal:
      "Understand the four core operations used by most full-stack applications.",
    explanation:
      "CRUD stands for Create, Read, Update and Delete. These operations describe how users interact with data in an application. A blog app creates posts, reads posts, updates posts and deletes posts. A banking app may create applications, read account information, update details and delete draft records.",
    realWorldUse:
      "In ReactLab, CRUD is used in APILab where users can create posts, view posts, edit their own posts and delete their own posts.",
    keyPoints: [
      "Create adds new data.",
      "Read retrieves existing data.",
      "Update modifies existing data.",
      "Delete removes data.",
    ],
    commonMistake:
      "A common mistake is building only the frontend form but forgetting that the backend and database must also support the matching operation.",
    code: `await fetch(\`\${API_BASE_URL}/posts/\${id}\`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: \`Bearer \${token}\`,
  },
  body: JSON.stringify(postData),
});`,
    practiceSteps: [
      "Create a form to add a post.",
      "Display all posts from the backend.",
      "Add an edit button to update a post.",
      "Add a delete button to remove a post.",
    ],
    challenge:
      "Build a posts page that allows users to create, edit and delete their own posts.",
  },
  {
    lessonNumber: 17,
    id: "backend-express",
    title: "Express Backend",
    level: "Intermediate",
    time: "40 min",
    summary:
      "Learn how to build a backend server using Express.js.",
    learningGoal:
      "Understand how Express handles routes, requests, responses and middleware.",
    explanation:
      "Express is a backend framework for Node.js. It allows you to create routes that respond to requests from the frontend. Each route can run logic, access a database, check authentication and return a response. Express is commonly used to build REST APIs for full-stack applications.",
    realWorldUse:
      "In ReactLab, Express powers the backend API for posts, authentication, protected routes, admin routes, user routes and file uploads.",
    keyPoints: [
      "Express runs on Node.js.",
      "Routes define API endpoints.",
      "Controllers contain request-handling logic.",
      "Middleware can run before route handlers.",
    ],
    commonMistake:
      "A common mistake is placing the global error handler before the routes. Error handlers should usually be placed after all routes.",
    code: `app.get("/", (req, res) => {
  res.send("ReactLab Express API is running");
});`,
    practiceSteps: [
      "Create an Express app.",
      "Add express.json middleware.",
      "Create a health check route.",
      "Connect posts and auth routes.",
    ],
    challenge:
      "Create an Express server with routes for posts and authentication.",
  },
  {
    lessonNumber: 18,
    id: "postgresql",
    title: "PostgreSQL Database",
    level: "Intermediate",
    time: "40 min",
    summary:
      "Learn how to store real application data in a relational database.",
    learningGoal:
      "Understand why databases are needed and how PostgreSQL stores data in tables.",
    explanation:
      "PostgreSQL is a relational database. It stores data in tables made of rows and columns. Unlike React state or localStorage, database records remain available even after refreshing the browser, closing the app or restarting the server. This makes PostgreSQL suitable for real application data.",
    realWorldUse:
      "In ReactLab, PostgreSQL stores users, hashed passwords, posts, ownership information and timestamps.",
    keyPoints: [
      "PostgreSQL stores persistent data.",
      "Tables contain rows and columns.",
      "SQL is used to query and update data.",
      "Databases are essential for full-stack apps.",
    ],
    commonMistake:
      "A common mistake is expecting React state to permanently store application data. State disappears when the page reloads unless it is saved somewhere persistent.",
    code: `const result = await pool.query(
  "SELECT * FROM posts ORDER BY created_at DESC"
);`,
    practiceSteps: [
      "Create a PostgreSQL database.",
      "Create a posts table.",
      "Insert a sample post.",
      "Query the posts table from Express.",
    ],
    challenge:
      "Create a posts table and connect it to your Express API.",
  },
  {
    lessonNumber: 19,
    id: "jwt-auth",
    title: "JWT Authentication",
    level: "Intermediate",
    time: "35 min",
    summary:
      "Learn how token-based authentication allows the backend to recognise logged-in users.",
    learningGoal:
      "Understand how JWT tokens are created, stored and sent with protected requests.",
    explanation:
      "JWT stands for JSON Web Token. After login, the backend creates a signed token that represents the authenticated user. The frontend stores this token and sends it with protected requests. The backend verifies the token before allowing the request to continue.",
    realWorldUse:
      "In ReactLab, JWT authentication is used when users create, edit or delete posts. The frontend sends the token in the Authorization header, and the backend checks who the user is.",
    keyPoints: [
      "JWT tokens are created by the backend.",
      "The frontend sends the token with protected requests.",
      "The backend verifies the token before allowing access.",
      "Tokens should be kept secure.",
    ],
    commonMistake:
      "A common mistake is sending protected requests without the Authorization header. The backend will not know who the user is.",
    code: `headers: {
  Authorization: \`Bearer \${token}\`,
}`,
    practiceSteps: [
      "Log in and receive a token.",
      "Store the token in localStorage or context.",
      "Send the token in the Authorization header.",
      "Protect a backend route using token verification.",
    ],
    challenge:
      "Send a JWT token with create, update and delete post requests.",
  },
  {
    lessonNumber: 20,
    id: "ownership",
    title: "Ownership Enforcement",
    level: "Intermediate",
    time: "30 min",
    summary:
      "Learn how to ensure users can only manage data that belongs to them.",
    learningGoal:
      "Understand why authentication alone is not enough and how ownership checks protect user data.",
    explanation:
      "Ownership enforcement checks whether the logged-in user owns a record before allowing updates or deletion. A user may be authenticated, but that does not mean they should be allowed to edit another user's data. The backend must compare the record owner with the logged-in user's id.",
    realWorldUse:
      "In ReactLab, ownership enforcement prevents one user from editing or deleting posts created by another user.",
    keyPoints: [
      "Authentication confirms who the user is.",
      "Ownership checks confirm what the user is allowed to manage.",
      "The backend should enforce ownership rules.",
      "Frontend hiding alone is not enough for security.",
    ],
    commonMistake:
      "A common mistake is only hiding edit and delete buttons on the frontend. A malicious user could still call the API directly unless the backend checks ownership.",
    code: `if (post.user_id !== req.user.id) {
  return res.status(403).json({
    message: "You are not allowed to edit this post.",
  });
}`,
    practiceSteps: [
      "Store user_id when creating a post.",
      "Read the post before editing or deleting.",
      "Compare post.user_id with req.user.id.",
      "Return 403 if the user does not own the post.",
    ],
    challenge:
      "Prevent users from editing or deleting posts created by another user.",
  },

    {
    lessonNumber: 21,
    id: "middleware",
    title: "Middleware",
    level: "Advanced",
    time: "35 min",
    summary:
      "Learn how Express middleware processes requests before they reach route handlers.",
    learningGoal:
      "Understand how middleware can validate requests, authenticate users and handle errors.",
    explanation:
      "Middleware sits between the incoming request and the final route handler. It can inspect, modify or block requests before they continue. Middleware is one of the most powerful concepts in Express because it allows reusable logic to be applied across many routes.",
    realWorldUse:
      "In ReactLab, middleware is used for authentication, post validation, ID validation, async error handling and global error management.",
    keyPoints: [
      "Middleware runs before route handlers.",
      "Middleware can allow, modify or reject requests.",
      "Reusable logic belongs in middleware.",
      "Middleware improves code organisation.",
    ],
    commonMistake:
      "A common mistake is forgetting to call next(), causing requests to hang indefinitely.",
    code: `export function protect(req, res, next) {
  const token = req.headers.authorization;
  next();
}`,
    practiceSteps: [
      "Create a logging middleware.",
      "Create an authentication middleware.",
      "Apply middleware to selected routes.",
      "Observe how middleware runs before controllers.",
    ],
    challenge:
      "Create middleware that blocks requests without a valid token.",
  },

  {
    lessonNumber: 22,
    id: "error-handling",
    title: "Error Handling",
    level: "Advanced",
    time: "30 min",
    summary:
      "Learn how to handle application errors gracefully.",
    learningGoal:
      "Understand how to catch, report and respond to errors consistently.",
    explanation:
      "Errors occur in every application. Good applications handle errors predictably and provide meaningful feedback to users. Express provides a global error handler that catches errors and returns structured responses.",
    realWorldUse:
      "ReactLab uses a global error handler so API responses remain consistent when something goes wrong.",
    keyPoints: [
      "Errors should be handled centrally.",
      "Users should receive clear messages.",
      "Unexpected crashes should be avoided.",
      "Error responses should follow a consistent format.",
    ],
    commonMistake:
      "A common mistake is exposing internal system details directly to users.",
    code: `app.use(errorHandler);`,
    practiceSteps: [
      "Create a global error handler.",
      "Throw an error intentionally.",
      "Verify the error response.",
      "Return a friendly error message.",
    ],
    challenge:
      "Build a global error handler that returns JSON responses.",
  },

  {
    lessonNumber: 23,
    id: "file-uploads",
    title: "File Uploads",
    level: "Advanced",
    time: "40 min",
    summary:
      "Learn how users upload files from React to Express.",
    learningGoal:
      "Understand multipart form uploads and backend file processing.",
    explanation:
      "File uploads differ from normal JSON requests because binary data must be transferred. Express uses specialised middleware such as Multer to process uploaded files.",
    realWorldUse:
      "ReactLab UploadLab allows users to upload images, PDFs and documents to the backend server.",
    keyPoints: [
      "Files require multipart/form-data.",
      "Multer processes uploaded files.",
      "Uploaded files need storage.",
      "Validation should be applied.",
    ],
    commonMistake:
      "A common mistake is trying to send files as JSON.",
    code: `const formData = new FormData();
formData.append("file", selectedFile);`,
    practiceSteps: [
      "Create a file input.",
      "Create FormData.",
      "Send the file to Express.",
      "Display upload success.",
    ],
    challenge:
      "Build an image upload feature.",
  },

  {
    lessonNumber: 24,
    id: "multer",
    title: "Multer",
    level: "Advanced",
    time: "35 min",
    summary:
      "Learn how Multer processes uploaded files in Express.",
    learningGoal:
      "Understand how Multer stores, validates and manages uploaded files.",
    explanation:
      "Multer is Express middleware specifically designed for file uploads. It receives uploaded files and stores them according to your configuration.",
    realWorldUse:
      "ReactLab uses Multer to process image and PDF uploads.",
    keyPoints: [
      "Multer handles multipart requests.",
      "Files can be stored locally.",
      "File types can be validated.",
      "File names can be customised.",
    ],
    commonMistake:
      "A common mistake is accepting all file types without validation.",
    code: `upload.single("file")`,
    practiceSteps: [
      "Install Multer.",
      "Create upload middleware.",
      "Connect middleware to a route.",
      "Test image uploads.",
    ],
    challenge:
      "Restrict uploads to images only.",
  },

  {
    lessonNumber: 25,
    id: "static-files",
    title: "Static File Serving",
    level: "Advanced",
    time: "25 min",
    summary:
      "Learn how Express makes uploaded files publicly accessible.",
    learningGoal:
      "Understand how uploaded files are served through URLs.",
    explanation:
      "After files are uploaded, users often need to access them later. Express can expose folders as static resources so browsers can retrieve them directly.",
    realWorldUse:
      "ReactLab exposes the uploads folder through Express so images and PDFs can be viewed from the browser.",
    keyPoints: [
      "Static files can be accessed via URL.",
      "Express can expose folders.",
      "Images can be displayed directly.",
      "Security considerations remain important.",
    ],
    commonMistake:
      "A common mistake is exposing sensitive directories publicly.",
    code: `app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);`,
    practiceSteps: [
      "Create an uploads folder.",
      "Configure express.static.",
      "Upload an image.",
      "Open it from the browser.",
    ],
    challenge:
      "Display uploaded images inside React.",
  },

  {
    lessonNumber: 26,
    id: "search-filtering",
    title: "Search and Filtering",
    level: "Advanced",
    time: "35 min",
    summary:
      "Learn how users search and filter large datasets.",
    learningGoal:
      "Understand how search improves user experience and data discovery.",
    explanation:
      "Search allows users to quickly find specific records. Filtering narrows results based on selected criteria.",
    realWorldUse:
      "ReactLab uses search and filtering to find posts and lessons.",
    keyPoints: [
      "Search improves usability.",
      "Filtering reduces information overload.",
      "Search can happen on the frontend or backend.",
      "Debouncing improves performance.",
    ],
    commonMistake:
      "A common mistake is making API calls on every keystroke.",
    code: `params.append("search", search);`,
    practiceSteps: [
      "Create a search input.",
      "Store search text in state.",
      "Filter results.",
      "Add debouncing.",
    ],
    challenge:
      "Build a searchable lessons page.",
  },

  {
    lessonNumber: 27,
    id: "sorting",
    title: "Sorting",
    level: "Advanced",
    time: "25 min",
    summary:
      "Learn how to reorder data for better user experience.",
    learningGoal:
      "Understand common sorting techniques and implementation.",
    explanation:
      "Sorting changes the order in which information is displayed. Users often expect newest items first, alphabetical sorting or custom ordering.",
    realWorldUse:
      "ReactLab supports newest, oldest and alphabetical sorting.",
    keyPoints: [
      "Sorting improves discoverability.",
      "Multiple sorting options increase flexibility.",
      "Backend sorting is often more scalable.",
      "Sorting should be predictable.",
    ],
    commonMistake:
      "A common mistake is sorting data inconsistently between frontend and backend.",
    code: `ORDER BY created_at DESC`,
    practiceSteps: [
      "Add sorting controls.",
      "Sort alphabetically.",
      "Sort by date.",
      "Test with large datasets.",
    ],
    challenge:
      "Add newest and oldest sorting to a posts page.",
  },

  {
    lessonNumber: 28,
    id: "pagination",
    title: "Pagination",
    level: "Advanced",
    time: "35 min",
    summary:
      "Learn how to divide large datasets into manageable pages.",
    learningGoal:
      "Understand why pagination improves performance and usability.",
    explanation:
      "Pagination limits the amount of data displayed at one time. Instead of loading hundreds of records at once, users can navigate through smaller groups.",
    realWorldUse:
      "ReactLab uses pagination for posts, lessons and technology roadmaps.",
    keyPoints: [
      "Pagination improves performance.",
      "Users see smaller groups of information.",
      "Backend pagination reduces database load.",
      "Page navigation should remain intuitive.",
    ],
    commonMistake:
      "A common mistake is loading all records and paginating only on the frontend.",
    code: `LIMIT $1 OFFSET $2`,
    practiceSteps: [
      "Create page state.",
      "Calculate total pages.",
      "Display page buttons.",
      "Load the correct records.",
    ],
    challenge:
      "Build paginated post listings.",
  },

  {
    lessonNumber: 29,
    id: "role-based-access",
    title: "Role-Based Access Control",
    level: "Advanced",
    time: "35 min",
    summary:
      "Learn how applications grant permissions based on roles.",
    learningGoal:
      "Understand how admin and user permissions differ.",
    explanation:
      "RBAC controls what users can do based on their assigned role. Different roles receive different permissions.",
    realWorldUse:
      "ReactLab could allow admins to manage all content while normal users manage only their own content.",
    keyPoints: [
      "Roles define permissions.",
      "Admins typically have broader access.",
      "RBAC improves security.",
      "Backend enforcement is essential.",
    ],
    commonMistake:
      "A common mistake is enforcing permissions only in the UI.",
    code: `if (user.role !== "admin") {
  return res.status(403);
}`,
    practiceSteps: [
      "Create user roles.",
      "Protect admin routes.",
      "Display different menus.",
      "Test permissions.",
    ],
    challenge:
      "Create an admin-only page.",
  },

  {
    lessonNumber: 30,
    id: "upload-lab",
    title: "UploadLab Project",
    level: "Advanced",
    time: "45 min",
    summary:
      "Apply file upload concepts in a complete project.",
    learningGoal:
      "Combine frontend and backend upload functionality into one workflow.",
    explanation:
      "UploadLab brings together file selection, upload processing, storage and display in a full-stack project.",
    realWorldUse:
      "ReactLab uses UploadLab as a practical demonstration of image and PDF upload workflows.",
    keyPoints: [
      "Combines multiple concepts.",
      "Uses React and Express together.",
      "Introduces file storage.",
      "Demonstrates real-world workflows.",
    ],
    commonMistake:
      "A common mistake is testing only successful uploads and not handling invalid files.",
    code: `const response = await uploadFile(formData);`,
    practiceSteps: [
      "Create upload form.",
      "Upload a file.",
      "Store the file.",
      "Display uploaded content.",
    ],
    challenge:
      "Build a complete image upload page.",
  },

  {
    lessonNumber: 31,
    id: "architecture",
    title: "Application Architecture",
    level: "Advanced",
    time: "40 min",
    summary:
      "Learn how frontend, backend and database layers work together.",
    learningGoal:
      "Understand full-stack application structure.",
    explanation:
      "Modern applications separate responsibilities between frontend, backend and database layers. This improves maintainability and scalability.",
    realWorldUse:
      "ReactLab uses React, Express and PostgreSQL as separate architectural layers.",
    keyPoints: [
      "Frontend handles presentation.",
      "Backend handles business logic.",
      "Database stores persistent data.",
      "Clear separation improves maintainability.",
    ],
    commonMistake:
      "A common mistake is mixing business logic into frontend components.",
    code: `React → Express → PostgreSQL`,
    practiceSteps: [
      "Map request flow.",
      "Identify responsibilities.",
      "Trace data movement.",
      "Document architecture.",
    ],
    challenge:
      "Draw the architecture of ReactLab.",
  },

  {
    lessonNumber: 32,
    id: "deployment",
    title: "Deployment Fundamentals",
    level: "Advanced",
    time: "40 min",
    summary:
      "Learn what happens when an application moves to production.",
    learningGoal:
      "Understand hosting, environments and production considerations.",
    explanation:
      "Deployment is the process of making an application available to users outside the development environment.",
    realWorldUse:
      "ReactLab can eventually be deployed to cloud infrastructure with separate frontend and backend hosting.",
    keyPoints: [
      "Development differs from production.",
      "Environment variables are important.",
      "Security becomes critical.",
      "Monitoring is required.",
    ],
    commonMistake:
      "A common mistake is exposing secrets in source code.",
    code: `.env`,
    practiceSteps: [
      "Prepare environment variables.",
      "Build the frontend.",
      "Deploy the backend.",
      "Verify production behaviour.",
    ],
    challenge:
      "Create a deployment checklist for ReactLab.",
  },

  {
    lessonNumber: 33,
    id: "fullstack-capstone",
    title: "Full-Stack Capstone",
    level: "Advanced",
    time: "60 min",
    summary:
      "Combine everything learned into a complete application.",
    learningGoal:
      "Apply React, Express, PostgreSQL and authentication together.",
    explanation:
      "The capstone project demonstrates how all lessons work together. It requires frontend development, backend APIs, database integration, authentication, uploads and user management.",
    realWorldUse:
      "ReactLab itself is a simplified example of a full-stack application.",
    keyPoints: [
      "Combines frontend and backend development.",
      "Requires authentication and database integration.",
      "Uses multiple concepts together.",
      "Represents real-world software development.",
    ],
    commonMistake:
      "A common mistake is focusing only on features without considering structure and maintainability.",
    code: `React + Express + PostgreSQL`,
    practiceSteps: [
      "Plan application features.",
      "Build frontend pages.",
      "Build backend APIs.",
      "Connect database and authentication.",
    ],
    challenge:
      "Build your own mini full-stack application using everything learned in ReactLab.",
  }


];
