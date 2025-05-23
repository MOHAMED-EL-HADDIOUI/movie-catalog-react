# Movie Catalog React Application

## Introduction
A modern web application for browsing and managing movie catalogs. This application provides users with a comprehensive interface to search, view, and manage movie information with features like authentication, search functionality, and detailed movie views.

## Objectives
- Provide a user-friendly interface for browsing movies
- Implement secure user authentication
- Enable efficient movie search and filtering
- Display detailed movie information
- Ensure responsive design for various screen sizes

## Technical Architecture
The application follows a modern React-based architecture with the following structure:
- **Frontend**: React.js with component-based architecture
- **Routing**: React Router for navigation
- **Authentication**: Okta for secure user authentication
- **UI Components**: Bootstrap and React-Bootstrap for responsive design
- **Data Grid**: AG Grid for efficient data display
- **State Management**: React's built-in state management

### Project Structure
```
src/
├── components/         # Reusable UI components
│   ├── movie-details.js
│   ├── movies.js
│   ├── navbar.js
│   └── search-box.js
├── pages/             # Page components
│   ├── home.js
│   ├── Login.js
│   └── ImplicitCallback.js
├── App.js            # Main application component
└── index.js          # Application entry point
```

## Technologies Used
- **React.js** (v16.8.4) - Frontend framework
- **React Router** (v5.0.0) - Navigation and routing
- **Okta** (v1.2.0) - Authentication and authorization
- **Bootstrap** (v5.3.6) - UI framework
- **React-Bootstrap** (v1.3.0) - React components for Bootstrap
- **AG Grid** (v32.3.2) - Data grid component
- **Reactstrap** (v6.5.0) - Additional React components
- **Universal Cookie** (v7.2.2) - Cookie management

## Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/MOHAMED-EL-HADDIOUI/movie-catalog-react.git
   cd movie-catalog-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_OKTA_CLIENT_ID=your_okta_client_id
   REACT_APP_OKTA_ISSUER=your_okta_issuer
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage Instructions
1. **Authentication**
   - Access the login page to authenticate using Okta
   - New users can register through the Okta interface

2. **Browsing Movies**
   - Use the search box to find specific movies
   - Browse through the movie grid
   - Click on a movie to view detailed information

3. **Navigation**
   - Use the navbar to navigate between different sections
   - Access user profile and settings through the user menu

## Development
- Run tests: `npm test`
- Build for production: `npm run build`
- Eject from create-react-app: `npm run eject`

## Recommendations and Future Improvements
1. **Performance Optimization**
   - Implement code splitting for better load times
   - Add lazy loading for images
   - Optimize bundle size

2. **Feature Enhancements**
   - Add user ratings and reviews
   - Implement movie recommendations
   - Add watchlist functionality
   - Enable social sharing

3. **Technical Improvements**
   - Upgrade to latest React version
   - Implement TypeScript for better type safety
   - Add comprehensive unit tests
   - Implement error boundaries
   - Add loading states and error handling

4. **User Experience**
   - Add dark mode support
   - Implement advanced filtering options
   - Add keyboard shortcuts
   - Improve mobile responsiveness
