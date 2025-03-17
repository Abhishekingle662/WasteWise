# WasteWise

WasteWise is a web application that connects households and small businesses with local recycling and composting services. It provides a service finder map, waste sorting guide, and rewards marketplace to incentivize sustainable behavior.

## Features

- **Service Finder**: Interactive map showing nearby recycling drop-offs or pickup options
- **Waste Sorting Guide**: Comprehensive guide to sorting waste correctly (recyclables, compost, landfill)
- **Rewards Marketplace**: Points earned for recycling, redeemable at local stores
- **User Dashboard**: Track your recycling impact and manage rewards
- **Environmental Impact**: View collective community impact statistics

## Technical Implementation

This application was built using:

- **Frontend**:
  - React.js for the user interface
  - Google Maps API for location services
  - CSS for styling without external UI libraries

- **Backend**:
  - Python/Flask RESTful API
  - Reinforcement Learning (Q-learning) for reward optimization
  - Containerized deployment with Docker

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/wastewise.git
cd wastewise
```

2. Install dependencies
```bash
npm install
```

3. Add your Google Maps API key in `public/index.html`

4. Start the development server
```bash
npm start
```

The application will run at [http://localhost:3000](http://localhost:3000)

## Project Structure

- `src/components/` - React components
- `src/data/` - Mock data for the application
- `public/images/` - Images used in the application
- `public/icons/` - Icons for various waste types and services

## Deployment

To build for production:

```bash
npm run build
```

The built files will be in the `build/` directory, ready to be deployed to any static site hosting service like GitHub Pages, Netlify, or Vercel.

## Impact

WasteWise aims to:

- Improve waste management infrastructure in cities
- Drive sustainable economic growth by connecting users with local businesses
- Support UN Sustainable Development Goals 11 (Sustainable Cities) and 8 (Economic Growth)

## Future Enhancements

- User authentication and profiles
- Real-time location tracking for pickup services
- Integration with municipal waste management systems
- Mobile app development
- Community forums and educational resources

## License

This project is open source and available under the [MIT License](LICENSE).
