
# Segwise Frontend Engineer Assignment

Live Demo: [https://frontend-engineer-assignment-segwise-nys3.vercel.app/](https://frontend-engineer-assignment-segwise-nys3.vercel.app/)

---

## Install dependencies

```bash
npm install
# or
yarn install
```

## Run the development server

```bash
npm run dev
# or
yarn dev
```

## Open the app

```bash
http://localhost:3000
```

---

## Data Details

The project uses mock creative advertising data with the following fields:

- **Dimensions**: `creative_id`, `creative_name`, `country`, `ad_network`, `os`, `campaign`, `ad_group`
- **Tags**: A list of `category:value` pairs.
- **Metrics**: `ipm`, `ctr`, `spend`, `impressions`, `clicks`, `cpm`, `cost_per_click`, `cost_per_install`, `installs`

Filtering, searching, and sorting features are based on this dataset.

---

## Filtering Logic

- **Dimension Filter**: Filters by non-metric, non-tag fields.
- **Tag Filter**:
  - First select a tag category.
  - Then choose a specific tag value for filtering.
- **Metric Filter**:
  - Supports operators: Greater Than (>), Equal To (=), Less Than (<).
  - Only one metric filter per metric can be applied at a time.

---

## Bonus Features

- Pagination in the table for better scalability.
- Expandable Full-Screen Modal from the small preview popup.
- Responsive UI to ensure usability across device sizes.
- Clean Project Structure for maintainability.

---

## Project Structure

```
/components     // Reusable UI components (Table, Filters, Preview Modal, etc.)
/pages          // Next.js pages (index.tsx)
/styles         // CSS Modules for styling
/utils          // Utility functions (e.g., filtering, sorting logic)
/data           // Mock data used for development
```

---

## Deployment

The project is deployed using **Vercel**.  
Access it live here:  
👉 [https://frontend-engineer-assignment-segwise-nys3.vercel.app/](https://frontend-engineer-assignment-segwise-nys3.vercel.app/)

---


