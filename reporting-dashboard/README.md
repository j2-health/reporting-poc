# Healthcare Access Dashboard

A React dashboard that visualizes healthcare access metrics using Highcharts.

## Features

- Member access visualization with pie chart
- Geographic distribution of members with/without access on a map
- Distance to care metrics in tabular format
- Box plot visualization of distance distribution

## Technologies Used

- React
- TypeScript
- Highcharts & Highcharts Maps
- CSS Grid for layout

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```
   cd reporting-dashboard
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `src/components/` - React components
- `src/data/` - Dummy data files
- `public/` - Static assets

## Notes

This is a client-side only implementation with dummy data. In a production environment, you would connect this to a backend API to fetch real data. 