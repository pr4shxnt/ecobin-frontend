# Ecobin Admin Frontend

## Overview
This is the admin dashboard frontend for the Ecobin waste management system. It provides a comprehensive interface for managing waste collection schedules, sending notifications, and tracking admin locations.

## Features

### 🏠 Dashboard Overview
- Real-time statistics and metrics
- Recent schedules overview
- Quick action buttons
- System status indicators

### 📅 Schedule Management
- Create, edit, and delete waste collection schedules
- Set collection days and times
- Add target addresses for notifications
- Configure reminder frequencies
- Enable/disable push notifications

### 🔔 Notification Center
- Send manual notifications to specific addresses
- Quick send templates (reminders, updates, emergencies)
- Notification statistics and history
- Automatic reminder system (every 2 days)

### 📍 Live Tracking
- Real-time admin location tracking
- Interactive map (placeholder for Leaflet integration)
- Online admin status monitoring
- Location update functionality

### 🛣️ Route Management
- View all active collection routes
- Track collection progress
- Update collection status (pending, in-progress, completed)
- Route visualization with stops

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

### Installation
```bash
cd Frontend
npm install
```

### Running the Application
```bash
npm run dev
```

The admin dashboard will be available at:
- Login: `http://localhost:5173/admin/login`
- Dashboard: `http://localhost:5173/admin/dashboard`

## Admin Authentication

### Login
1. Navigate to `/admin/login`
2. Enter admin credentials
3. JWT token is stored in localStorage
4. Redirected to dashboard on successful login

### Protected Routes
All admin routes require authentication. The system automatically checks for valid JWT tokens and redirects to login if not authenticated.

## API Integration

### Base URL
```
http://localhost:5000/admin
```

### Authentication
Include JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Key Endpoints Used
- `POST /admin/auth/login` - Admin login
- `GET /admin/auth/profile` - Get admin profile
- `GET /admin/schedules` - Get all schedules
- `POST /admin/schedules` - Create schedule
- `POST /admin/notifications/send` - Send notification
- `GET /admin/location/online-admins` - Get online admins
- `GET /admin/routes` - Get all routes

## Components Structure

```
src/
├── Pages/
│   ├── AdminLogin.jsx          # Admin login page
│   └── AdminDashboard.jsx      # Main dashboard with navigation
├── Components/
│   └── Admin/
│       ├── AdminSidebar.jsx    # Navigation sidebar
│       ├── AdminHeader.jsx     # Header with user info
│       ├── DashboardOverview.jsx    # Dashboard overview
│       ├── ScheduleManagement.jsx   # Schedule CRUD operations
│       ├── NotificationCenter.jsx   # Notification management
│       ├── LiveTracking.jsx    # Location tracking
│       └── RouteManagement.jsx # Route management
```

## Features in Detail

### Schedule Management
- **Create Schedule**: Set name, zone, collection day/time, target addresses
- **Edit Schedule**: Modify existing schedules
- **Delete Schedule**: Remove schedules with confirmation
- **Address Management**: Add/remove target addresses for notifications

### Notification System
- **Manual Notifications**: Send custom notifications to specific addresses
- **Templates**: Pre-configured notification templates
- **Statistics**: Track sent, delivered, and clicked notifications
- **Automatic Reminders**: System sends reminders every 2 days

### Live Tracking
- **Real-time Updates**: Location updates every 30 seconds
- **Online Status**: Monitor which admins are online
- **Location History**: Track admin movement
- **Map Integration**: Placeholder for Leaflet map integration

### Route Management
- **Route Overview**: View all active routes with statistics
- **Stop Management**: Track collection progress at each stop
- **Status Updates**: Update collection status (pending → in-progress → completed)
- **Admin Assignment**: View assigned admins for each route

## Styling

The application uses Tailwind CSS for styling with a green color scheme matching the Ecobin brand.

### Color Palette
- Primary: Green (`green-600`, `green-700`)
- Secondary: Blue (`blue-600`, `blue-700`)
- Success: Green (`green-500`, `green-100`)
- Warning: Yellow (`yellow-500`, `yellow-100`)
- Error: Red (`red-500`, `red-100`)

## Future Enhancements

### Map Integration
- Integrate Leaflet.js for interactive maps
- Show real-time admin locations
- Display collection routes with stops
- Route optimization suggestions

### Real-time Updates
- WebSocket integration for live updates
- Push notifications for admin dashboard
- Real-time collection status updates

### Advanced Features
- Route optimization algorithms
- Collection analytics and reports
- Mobile-responsive design improvements
- Offline capability for mobile admins

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Check if JWT token is valid
   - Ensure backend is running
   - Clear localStorage and re-login

2. **API Connection Issues**
   - Verify backend server is running on port 5000
   - Check CORS configuration
   - Ensure proper API endpoints

3. **Component Loading Issues**
   - Check browser console for errors
   - Verify all dependencies are installed
   - Clear browser cache

### Development Tips

1. **Testing API Calls**
   - Use browser developer tools to monitor network requests
   - Check response status and data format
   - Verify authentication headers

2. **State Management**
   - Use React DevTools to inspect component state
   - Check localStorage for authentication data
   - Monitor useEffect dependencies

3. **Styling Issues**
   - Use Tailwind CSS IntelliSense for class suggestions
   - Check responsive breakpoints
   - Verify color scheme consistency

## Contributing

1. Follow the existing code structure
2. Use consistent naming conventions
3. Add proper error handling
4. Include loading states
5. Test all functionality before committing

## License

This project is part of the Ecobin waste management system.
