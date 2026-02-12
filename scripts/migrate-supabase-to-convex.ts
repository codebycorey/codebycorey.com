/**
 * One-time migration: Supabase → Convex view counts.
 *
 * Prerequisites:
 *   1. Convex deployed (`npx convex deploy` or `npx convex dev` running)
 *   2. CONVEX_URL env var set to your deployment URL
 *
 * Usage:
 *   CONVEX_URL="https://your-deployment.convex.cloud" npx tsx scripts/migrate-supabase-to-convex.ts
 *
 * After verifying, delete this script and remove setViewCount from convex/pages.ts.
 */

import { ConvexHttpClient } from 'convex/browser';
import { api } from '../convex/_generated/api';

const SUPABASE_URL = 'https://nlnukxwljjaweetekvft.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYwNzAxMTUyOSwiZXhwIjoxOTIyNTg3NTI5fQ.REx8EKVLoYi5Gbe1gZ9hj9SjuMR8eXEku3YLrgBY-zI';

interface SupabasePage {
  slug: string;
  view_count: number;
}

async function fetchSupabaseViewCounts(): Promise<SupabasePage[]> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/pages?select=slug,view_count`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Supabase fetch failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

async function main() {
  const convexUrl = process.env.CONVEX_URL;
  if (!convexUrl) {
    console.error('Error: Set CONVEX_URL environment variable');
    console.error(
      'Example: CONVEX_URL="https://your-deployment.convex.cloud" npx tsx scripts/migrate-supabase-to-convex.ts'
    );
    process.exit(1);
  }

  const convex = new ConvexHttpClient(convexUrl);

  console.log('Fetching view counts from Supabase...');
  const pages = await fetchSupabaseViewCounts();
  const toMigrate = pages.filter(
    (p) => p.view_count > 0 && !p.slug.startsWith('__')
  );
  console.log(`Found ${toMigrate.length} pages to migrate\n`);

  for (const page of toMigrate) {
    await convex.mutation(api.pages.setViewCount, {
      slug: page.slug,
      viewCount: page.view_count,
    });
    console.log(`  + ${page.slug}: ${page.view_count}`);
  }

  console.log('\nVerifying...');
  const convexPages = await convex.query(api.pages.getAllViewCounts, {});
  let mismatches = 0;

  for (const cp of convexPages) {
    const sp = toMigrate.find((p) => p.slug === cp.slug);
    if (!sp || sp.view_count !== cp.viewCount) {
      console.log(`  MISMATCH ${cp.slug}: convex=${cp.viewCount}, supabase=${sp?.view_count ?? 'missing'}`);
      mismatches++;
    }
  }

  if (mismatches === 0) {
    console.log(`All ${convexPages.length} pages verified successfully!`);
    console.log('\nNext steps:');
    console.log('  1. Remove setViewCount mutation from convex/pages.ts');
    console.log('  2. Delete this script');
  } else {
    console.error(`\n${mismatches} mismatches found — review above.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
