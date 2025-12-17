
import pg from 'pg';

const { Client } = pg;

if (!process.env.DATABASE_URI) {
    console.error('DATABASE_URI is not set');
    process.exit(1);
}

const client = new Client({
  connectionString: process.env.DATABASE_URI,
});

async function checkTables() {
  try {
    await client.connect();
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.log('Tables in database:');
    res.rows.forEach(row => console.log(row.table_name));

    const rels = await client.query(`
        SELECT * FROM information_schema.tables 
        WHERE table_name = 'awards_rels';
    `);
    
    if (rels.rows.length === 0) {
        console.log('\n❌ "awards_rels" table does NOT exist.');
    } else {
        console.log('\n✅ "awards_rels" table exists.');
    }

  } catch (err) {
    console.error('Error connecting to DB:', err);
  } finally {
    await client.end();
  }
}

checkTables();
