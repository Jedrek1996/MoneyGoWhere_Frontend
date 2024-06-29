## Backend Repo: https://github.com/Jedrek1996/MoneyGoWhere_Backend
## ⚠️⚠️ To run ⚠️⚠️

Open the project directory in the folder directory cmd prompt, you can run the command below to start:

## `npm install`
Switch to the main branch and run this command during startup to install dependencies from package.json

> > If you get the react-scripts issue <<
> > 🥓 Run this command in cmd prompt: npm install react-scripts --save-dev

> > C:\Users\D{ID}\.npmrc (Comment out registery= https://)

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `Project Structure and File Organization Guidelines`

Here are some guidelines to follow when creating files in this project:

1. **Component File Format:**
   - Components should be written in JSX format.
   - Exceptions include `App.js` and `index.js`.

2. **Shared Components:**
   - Store shared components in the `shared` folder within the `components` directory.
   - Example: `src/components/shared/Navbar`.

3. **CSS File Organization:**
   - Place global CSS styles in the `App.css` file.
   - Custom CSS for individual components should be stored in the `styles` folder based on the component name.
     - Example: `src/styles/ComponentName.css`.

4. **Constants Component:**
   - Create a separate `constants` component to store hardcoded variables and strings.
   - Example: `src/constants/constants.js`.
