# Carbon measurement procedure

Both frontend (react-carbon-footprint) and backend (@tgwf/co2) now estimate emissions using CO2.js 0.16.9 and its SWD model defaults, greenHost=false. These are modelled network-related estimates, not measured electricity or the complete carbon footprint of the project.

## Repeatable experiment

1. Define a scenario, e.g. open Home, Events, one event detail, Offers, one offer detail, then Profile. Specify account role, exact pages, actions, cache state, browser, build mode and wait duration. Test ticket payment separately because the external gateway leaves this app.
2. Close other app tabs. Restart backend (npm run dev) immediately before each run; each process creates a separate carbon-reports/*.jsonl file. Ignore earlier setup/test runs. Disable frontend cache in DevTools with DevTools open for a cold-cache run; measure warm-cache runs separately.
3. Use the frontend panel during development for quick checks. For a report, prefer a production build: run npm run build, stop the existing Vite dev server, then run npm run preview -- --port 5173 --strictPort. The same localhost:5173 origin preserves existing backend CORS settings. Vite dev traffic otherwise adds development overhead.
4. Reload ONCE at the start, navigate using app links, execute the exact scenario, then wait a fixed interval (e.g. 5 seconds after the last request finishes). Record frontend observed bytes and estimated g CO2. Frontend counters include resource entries already recorded in this page; full reload resets them. SPA navigation accumulates values.
5. From nearby-backend run: node scripts/carbonReport.js
   This summarizes the latest process report. To read an earlier run: node scripts/carbonReport.js "carbon-reports/FILE.jsonl"
6. Repeat the same scenario at least 3 times under the same conditions. Report individual runs and mean bytes / mean g CO2, with range or standard deviation. Compare optimized and baseline versions with identical scenarios.

## Report columns

Scenario | Build/cache conditions | Run | Frontend bytes | Frontend estimated g CO2 | API request body bytes | API response body bytes | API estimated g CO2 | Request count

Frontend displays raw bytes and estimated grams rounded to 2 decimal places, matching the supplied example. Small nonzero estimates can display as 0.00.
API total bytes = declared request body bytes + emitted response body bytes.
API estimated grams = sum of CO2.js perByte(totalBytes, false) for the requests.
Example measured during setup: a 19-byte health-check response was estimated at 0.0000072785466 g CO2. This is NOT the website's total or a representative usage scenario.

## Scope and interpretation

- Do NOT add frontend and backend estimates: API responses overlap, and CO2.js models more than backend CPU. Present the two views separately.
- Backend counts payloads only: no HTTP headers, TLS overhead, database traffic, outgoing Cloudinary/SSLCommerz calls, CPU electricity or idle power. Chunked request body sizes without Content-Length are flagged unknown and excluded; aborted responses are not logged. Response bytes are application output bytes, not packet capture.
- Frontend relies on browser Resource Timing. External resources without Timing-Allow-Origin, cached resources, uploads, initial document transfer and resources on an external payment page can be absent. localhost:5000 differs from localhost:5173, so backend API sizes may be hidden from this frontend hook. Backend logs provide a separate API view.
- Estimates use model defaults, not Bangladesh-specific electricity readings. Model/version and green-host assumption must be written in the report.
- An extrapolation such as mean g per scenario * assumed monthly scenario count is an estimated monthly amount for that scenario, not a measured entire-project footprint.
- Backend measurement is enabled by CARBON_TRACKING=true in .env; set false and restart to disable it. Reports contain route templates and counts, not request bodies, cookies or credentials, and are Git-ignored.

The frontend panel now always renders in App.jsx, in both development and production, as in the supplied screenshots. No click or environment flag is required.
