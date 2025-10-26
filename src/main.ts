import { App } from './app';

// Initialize the application
const app = new App();

// Make app globally available for admin panel functions
(window as any).app = app;
