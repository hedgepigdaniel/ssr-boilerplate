# Development report

## Design process and decisions

Within the short timeframe, building a native app (e.g. using react-native)
would likely have been too difficult. Everything is simpler on the web
(compilation, component libraries, dev tools, testing, etc), so I opted for a
web app.

Since the task specified that an app server was necessary for maintaining state,
I opted for a hosted app architecture rather than a static one (e.g. using
react-static). This allowed the UI to contain dynamic server rendered routes
like `/trade/:symbol/:action` at the cost of some extra complexity.

I chose to base the app architecture on @respond-framework/boilerplate for
various reasons:

- Even though it (and rudy) isn't officially released, I maintain it, so I'm
  familiar (and happy) with how it works and can usually solve issues quickly.
- It supports seamless universal rendering (including data fetching, redirects,
  etc), which IMO should be the minimum standard for a modern web app. All the
  pages load correctly the first time from the server, and the page never
  reloads unless you click an external link.
- It avoids browser specific APIs because most of them don't work in node. This
  has a side benefit that refactoring the app into react-native would be
  relatively easy (Only the React components would be incompatible).
- It is built on a MVC architecture, which allows the reducers, selectors, and
  components to be all 100% pure functions. This makes it easy to understand and
  write unit tests for, and scalable as the app grows. There is only a small
  amount of procedural code (the thunks).

## Shortcuts and assumptions

- Stocks that are not traded against USD are ignored.
- The user provides their own AlphaVantage API key - if they go over the limit,
  its their problem.
- There is no secure login system, a user identifies themselves by choosing an
  API key.

## Bugs, issues, incomplete features

- The route to choose a stock to trade does an AlphaVantage API request for each
  character typed. This is enough to burn through the API limit (so low, wow).
  Easily fixed by adding a button and not searching while the user types.
  Interestingly, signing up for an API key provides no benefit other than
  informing AlphaVantage of your identity. Any random string works just as well.
- There is no API and no server side state because I ran out of time. My plan
  was to build a simple GraphQL API, probably mounted on the same express server
  under `/graphql` (to avoid having to determine the correct host:port, or deal
  with CORS etc). This would encourage a good API design with types and
  automatic documentation, which would make it easy to test the initial
  implementation using GraphiQL, and to refactor the backend later (with
  luxuries like a database) while relying on the types. I was planning to
  process the responses in the app using Redux rather than use Apollo, because
  there are a few deep confusions in my mind about Apollo vs Redux. The extra
  automation of state management that Apollo provides would probably be
  outweighed for this simple app by the extra architectural complexity of having
  Apollo and Redux, worse dev tools (Apollo dev tools never seem to work), and
  my confusion and doubts. At least `eslint-plugin-graphql` allows type checking
  API calls against the type definitions, which is a big improvement over
  building your own endpoints.
- There is no cash balance, and the actual buying and selling of stocks is not
  done yet.
- There is very little handling of errors and loading states. While the app is
  small this is easy to fix.
- There are no unit tests. If I had time I'd set up jest (because I've used it
  before), and add unit tests for the functional parts (each selector, reducer,
  and component). Testhing the thunks, routes, and other things would be
  possible but much harder (you would need to mock out side effects) and
  probably not worth the effort until later.
- Style is very lacking. The buttons are very ugly. There are definitely no
  animations. This can be fixed quite easily later while the app is still small
  (with the help of people who are good at design). My standard was "The
  intention is clear".

## Roadblocks

- Not unexpected, but I should really make a boilerplate so that next time
  somebody asks me to make a new app I don't have to copy and paste bits and
  pieces. That probably took me a few hours before I got to the specific
  features of this app. There were a few minor bugs that needed to be worked
  around/fixed (e.g. URL query state being ignored in SSR, title selector not
  being passed to the rudy title middleware). I also forgot to copy the babel
  config specific to the app, which stopped HMR from working for a while.
- I had a problem with browsers caching document/HTML requests. This caused
  redirects to be buggy - for example when the user logged out the server
  started redirecting most pages to the login page, but the browser had cached
  the non-redirecting versions. I don't understand the problem well so I found a
  middleware to disable most browser caching.
- There were AlphaVantage API client libraries on NPM, but I couldn't find any
  that supported the search endpoint (This seemed necessary for the app to make
  sense - a user has to be able to actually find the stock they want to buy.
  this is why I chose AlphaVantage over Quandl). Although these API clients
  existed, they relied on node specific APIs for some reason. Either that or I
  had a webpack config problem.
