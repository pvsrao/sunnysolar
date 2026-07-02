// ═══════════════════════════════════════════════════════════════════════════
// SUNNY SOLAR — WEBSITE FORM INTEGRATION
// Add this script to your sunnysolar.in website (index.html)
// Place just before the closing </body> tag
// ═══════════════════════════════════════════════════════════════════════════

// STEP 1: Add Supabase SDK — paste this in your <head> section:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>

// STEP 2: Add this entire script block before </body>

(function() {
  // ── YOUR SUPABASE CREDENTIALS (same as CRM app) ──────────────────────────
  const SUPABASE_URL      = 'https://wqotjjseireaczeqbzoq.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxb3RqanNlaXJlYWN6ZXFiem9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0MTU2NTcsImV4cCI6MjA5Nzk5MTY1N30.UpfyuvapT-WRPx_HuJ1A1jyhz1TzBYfBs_9rTyAJ-ac';
  // ─────────────────────────────────────────────────────────────────────────

  const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Find your existing quote form submit button
  // IMPORTANT: Replace 'your-form-id' with the actual id of your <form> element
  // OR replace 'your-submit-btn-id' with the id of your submit button
  // Look in your index.html for the form that has Name, Mobile, City, Bill, Type fields

  document.addEventListener('DOMContentLoaded', function() {

    // Try to find the form — adjust selector if needed
    const form = document.querySelector('form') || document.getElementById('quote-form');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
      // Don't prevent default — let your existing form logic run too

      // Collect field values — adjust selectors to match your actual input names/ids
      const name        = (document.querySelector('input[placeholder*="Name"]') ||
                           document.querySelector('input[name="name"]'))?.value?.trim() || '';
      const phone       = (document.querySelector('input[placeholder*="Mobile"]') ||
                           document.querySelector('input[type="tel"]'))?.value?.trim() || '';
      const location    = (document.querySelector('input[placeholder*="City"]') ||
                           document.querySelector('input[name="city"]'))?.value?.trim() || '';
      const monthly_bill= (document.querySelector('input[placeholder*="Bill"]') ||
                           document.querySelector('input[name="bill"]'))?.value?.trim() || '';
      const systemSelect= document.querySelector('select');
      const system_type = systemSelect ? systemSelect.options[systemSelect.selectedIndex]?.text : '';

      if (!name || !phone) return; // Skip if essential fields empty

      try {
        await sb.from('leads').insert([{
          name,
          phone,
          location,
          monthly_bill,
          system_type,
          source:    'Website',           // ← marks it as website enquiry in CRM
          status:    'Follow-Up',         // ← auto status for new website leads
          notes:     'Lead from sunnysolar.in website form',
          created_by: null                // ← null = unassigned (admin can assign)
        }]);
        console.log('✅ CRM: Lead saved from website form');
      } catch(err) {
        // Silent fail — don't break your website form if CRM is down
        console.warn('CRM sync failed (non-critical):', err.message);
      }
    });

    console.log('✅ Sunny Solar CRM: Website form integration active');
  });
})();
