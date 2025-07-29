const { Client } = require('pg');

// Test connection to Supabase
async function testConnection() {
  const client = new Client({
    connectionString: 'postgresql://postgres.tdhmkccvahnxlrzyswpc:Jaladri202513090312345_@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔄 Attempting to connect to Supabase...');
    await client.connect();
    console.log('✅ Successfully connected to Supabase!');

    // Test a simple query
    const result = await client.query('SELECT version()');
    console.log('📊 Database version:', result.rows[0].version);

    // Check if we can create tables (permissions test)
    try {
      await client.query('SELECT 1');
      console.log('✅ Database permissions look good');
    } catch (permError) {
      console.log('⚠️  Permission issue:', permError.message);
    }

  } catch (error) {
    console.error('❌ Connection failed:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);

    if (error.code === 'ENOTFOUND') {
      console.log('\n🔍 DNS resolution failed. Check:');
      console.log('- Internet connection');
      console.log('- Supabase project URL is correct');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n🔍 Connection refused. Check:');
      console.log('- Supabase project is active (not paused)');
      console.log('- Database credentials are correct');
    } else if (error.message.includes('password authentication failed')) {
      console.log('\n🔍 Authentication failed. Check:');
      console.log('- Password is correct');
      console.log('- Special characters are properly URL encoded');
    }
  } finally {
    await client.end();
  }
}

testConnection();
