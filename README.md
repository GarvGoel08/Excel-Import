# Excel Data Importer - Frontend

A modern React application for importing and managing Excel data with validation, error handling, and a beautiful user interface.

## Features

### File Import
- Drag-and-drop file upload with fallback button
- Supports .xlsx files up to 2MB
- Real-time file validation and feedback
- Preview imported data before submission

### Data Validation
- Validates required columns (Name, Amount, Date, Verified)
- Detailed error reporting for invalid rows
- Shows validation errors in a modal dialog with sheet-wise tabs
- Supports partial imports - valid rows can be imported even if some rows have errors

### Data Preview & Management
- Interactive data table with pagination
- Format dates in DD-MM-YYYY format
- Indian number format for amounts (e.g., 12,34,456.00)
- Row deletion with confirmation dialog
- Visual status indicators for imported rows
- Sort and filter capabilities

### Admin View
- Dedicated `/admin/data` route for viewing all imported data
- Comprehensive data table with all records
- Status tracking for imported records
- Responsive design for all screen sizes

## Tech Stack

- **React 18** - Latest version of React for building user interfaces
- **React Router v6** - For application routing
- **Tailwind CSS** - For styling and responsive design
- **Framer Motion** - For smooth animations and transitions
- **React Dropzone** - For drag-and-drop file uploads
- **React Hot Toast** - For notifications
- **React Icons** - For beautiful icons

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory:
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_UPLOAD_ENDPOINT=/validate
REACT_APP_IMPORT_ENDPOINT=/import
REACT_APP_DELETE_ROW_ENDPOINT=/delete-row
```

4. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Project Structure

```
my-app/
├── public/
├── src/
│   ├── components/          # Reusable components
│   │   ├── DataTable.jsx   # Table component for displaying data
│   │   ├── ErrorModal.jsx  # Modal for showing validation errors
│   │   └── FileUpload.jsx  # File upload component
│   ├── pages/              # Page components
│   │   ├── ImportPage.jsx  # Main import page
│   │   └── AdminDataPage.jsx # Admin view for all data
│   ├── utils/              # Utility functions
│   │   └── formatters.js   # Date and number formatters
│   ├── App.js             # Main application component
│   └── index.js           # Application entry point
├── .env                   # Environment variables
└── tailwind.config.js    # Tailwind CSS configuration
```

## Usage

1. **Importing Data**:
   - Navigate to the home page
   - Drag and drop an Excel file or click to select
   - Review validation results
   - Import valid rows
   - Monitor import status with visual indicators

2. **Viewing Data**:
   - Click "View Data" in the navigation bar
   - Browse through imported records
   - Use pagination controls to navigate
   - View import status and timestamps

## Error Handling

The application handles various error scenarios:
- Invalid file types
- File size limits
- Missing required columns
- Invalid data formats
- Network errors
- Partial import failures

## Best Practices

- Proper error boundaries and fallbacks
- Responsive design principles
- Accessibility considerations
- Performance optimizations
- Clean code architecture
- Component reusability
- Proper type checking with PropTypes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
