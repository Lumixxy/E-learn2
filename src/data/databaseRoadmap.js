export const databaseRoadmap = {
  nodes: [
    {
      id: 'db-intro',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { 
        label: 'Database Fundamentals',
        type: 'lesson',
        description: 'Introduction to databases and DBMS concepts',
        duration: '2 hours',
        resources: [
          { type: 'video', title: 'Database Fundamentals Explained', url: 'https://www.youtube.com/watch?v=wR0jg0eQsZA' },
          { type: 'article', title: 'Introduction to Database Systems', url: 'https://www.geeksforgeeks.org/introduction-of-dbms-database-management-system-set-1/' },
          { type: 'exercise', title: 'Database Concepts Practice', url: 'https://www.w3schools.com/sql/sql_intro.asp' }
        ],
        topics: ['DBMS Concepts', 'Data Models', 'Database Architecture', 'RDBMS vs NoSQL']
      }
    },
    {
      id: 'sql-basics',
      type: 'default',
      position: { x: 400, y: 150 },
      data: { 
        label: 'SQL Basics',
        type: 'lesson',
        description: 'Learn SQL syntax and basic queries',
        duration: '3 hours',
        resources: [
          { type: 'video', title: 'SQL Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY' },
          { type: 'article', title: 'SQL Basics Guide', url: 'https://www.w3schools.com/sql/sql_syntax.asp' },
          { type: 'exercise', title: 'Interactive SQL Practice', url: 'https://sqlbolt.com/' }
        ],
        topics: ['SELECT Statements', 'WHERE Clauses', 'ORDER BY', 'INSERT/UPDATE/DELETE']
      }
    },
    {
      id: 'db-quiz-1',
      type: 'default',
      position: { x: 200, y: 250 },
      data: { 
        label: 'SQL Fundamentals Quiz',
        type: 'quiz',
        description: 'Test your understanding of SQL basics'
      }
    },
    {
      id: 'table-design',
      type: 'default',
      position: { x: 400, y: 250 },
      data: { 
        label: 'Table Design & Normalization',
        type: 'lesson',
        description: 'Database design principles and normalization',
        duration: '4 hours',
        resources: [
          { type: 'video', title: 'Database Design and Normalization', url: 'https://www.youtube.com/watch?v=UrYLYV7WSHM' },
          { type: 'article', title: 'Database Normalization Explained', url: 'https://www.guru99.com/database-normalization.html' },
          { type: 'exercise', title: 'Database Design Practice', url: 'https://www.lucidchart.com/pages/database-diagram/database-design' }
        ],
        topics: ['Entity-Relationship Diagrams', '1NF, 2NF, 3NF', 'Primary/Foreign Keys', 'Schema Design']
      }
    },
    {
      id: 'advanced-sql',
      type: 'default',
      position: { x: 400, y: 350 },
      data: { 
        label: 'Advanced SQL',
        type: 'lesson',
        description: 'Joins, subqueries, and complex operations',
        duration: '5 hours',
        resources: [
          { type: 'video', title: 'Advanced SQL Techniques', url: 'https://www.youtube.com/watch?v=2Fn0WAyZV0E' },
          { type: 'article', title: 'SQL Joins Explained', url: 'https://www.w3schools.com/sql/sql_join.asp' },
          { type: 'exercise', title: 'Advanced SQL Challenges', url: 'https://www.hackerrank.com/domains/sql' }
        ],
        topics: ['INNER/OUTER Joins', 'Subqueries', 'Window Functions', 'CTEs']
      }
    },
    {
      id: 'db-assignment-1',
      type: 'default',
      position: { x: 600, y: 350 },
      data: { 
        label: 'E-commerce Database',
        type: 'assignment',
        description: 'Design and implement an e-commerce database schema'
      }
    },
    {
      id: 'indexing',
      type: 'default',
      position: { x: 400, y: 450 },
      data: { 
        label: 'Indexing & Performance',
        type: 'lesson',
        description: 'Database optimization and indexing strategies',
        duration: '3 hours',
        resources: [
          { type: 'video', title: 'Database Indexing Explained', url: 'https://www.youtube.com/watch?v=ITcOiLSfVJQ' },
          { type: 'article', title: 'SQL Performance Tuning', url: 'https://use-the-index-luke.com/' },
          { type: 'exercise', title: 'Query Optimization Practice', url: 'https://www.postgresql.org/docs/current/using-explain.html' }
        ],
        topics: ['B-Tree Indexes', 'Query Optimization', 'Execution Plans', 'Performance Monitoring']
      }
    },
    {
      id: 'transactions',
      type: 'default',
      position: { x: 400, y: 550 },
      data: { 
        label: 'Transactions & ACID',
        type: 'lesson',
        description: 'Transaction management and ACID properties',
        duration: '3 hours',
        resources: [
          { type: 'video', title: 'Database Transactions Explained', url: 'https://www.youtube.com/watch?v=P80Js_qClUE' },
          { type: 'article', title: 'ACID Properties in DBMS', url: 'https://www.geeksforgeeks.org/acid-properties-in-dbms/' },
          { type: 'exercise', title: 'Transaction Control Practice', url: 'https://www.w3schools.com/sql/sql_transaction.asp' }
        ],
        topics: ['Atomicity', 'Consistency', 'Isolation', 'Durability', 'Concurrency Control']
      }
    },
    {
      id: 'db-quiz-2',
      type: 'default',
      position: { x: 200, y: 650 },
      data: { 
        label: 'Advanced Database Quiz',
        type: 'quiz',
        description: 'Test your knowledge of advanced database concepts'
      }
    },
    {
      id: 'nosql',
      type: 'default',
      position: { x: 400, y: 650 },
      data: { 
        label: 'NoSQL Databases',
        type: 'lesson',
        description: 'Introduction to MongoDB and document databases',
        duration: '4 hours',
        resources: [
          { type: 'video', title: 'NoSQL Database Tutorial', url: 'https://www.youtube.com/watch?v=0buKQHokLK8' },
          { type: 'article', title: 'MongoDB Basics', url: 'https://docs.mongodb.com/manual/introduction/' },
          { type: 'exercise', title: 'MongoDB University', url: 'https://university.mongodb.com/' }
        ],
        topics: ['Document Databases', 'MongoDB Operations', 'Schema Design', 'Aggregation Pipeline']
      }
    },
    {
      id: 'db-security',
      type: 'default',
      position: { x: 400, y: 750 },
      data: { 
        label: 'Database Security',
        type: 'lesson',
        description: 'Security best practices and data protection',
        duration: '3 hours',
        resources: [
          { type: 'video', title: 'Database Security Best Practices', url: 'https://www.youtube.com/watch?v=aU9RsE4fcRM' },
          { type: 'article', title: 'SQL Injection Prevention', url: 'https://owasp.org/www-community/attacks/SQL_Injection' },
          { type: 'exercise', title: 'Security Testing Practice', url: 'https://www.hacksplaining.com/exercises/sql-injection' }
        ],
        topics: ['SQL Injection Prevention', 'Access Control', 'Encryption', 'Backup Security']
      }
    },
    {
      id: 'db-assignment-2',
      type: 'default',
      position: { x: 600, y: 750 },
      data: { 
        label: 'Analytics Dashboard',
        type: 'assignment',
        description: 'Build a data analytics dashboard with complex queries'
      }
    },
    {
      id: 'peer-evaluation',
      type: 'default',
      position: { x: 400, y: 850 },
      data: { 
        label: 'Peer Database Review',
        type: 'peer-evaluation',
        description: 'Review and provide feedback on peer database designs'
      }
    },
    {
      id: 'db-certificate',
      type: 'default',
      position: { x: 400, y: 950 },
      data: { 
        label: 'Database Certificate',
        type: 'certificate',
        description: 'Earn your database management certificate'
      }
    }
  ],
  edges: [
    { id: 'e1', source: 'db-intro', target: 'sql-basics' },
    { id: 'e2', source: 'sql-basics', target: 'db-quiz-1' },
    { id: 'e3', source: 'sql-basics', target: 'table-design' },
    { id: 'e4', source: 'table-design', target: 'advanced-sql' },
    { id: 'e5', source: 'advanced-sql', target: 'db-assignment-1' },
    { id: 'e6', source: 'advanced-sql', target: 'indexing' },
    { id: 'e7', source: 'indexing', target: 'transactions' },
    { id: 'e8', source: 'transactions', target: 'db-quiz-2' },
    { id: 'e9', source: 'transactions', target: 'nosql' },
    { id: 'e10', source: 'nosql', target: 'db-security' },
    { id: 'e11', source: 'db-security', target: 'db-assignment-2' },
    { id: 'e12', source: 'db-assignment-2', target: 'peer-evaluation' },
    { id: 'e13', source: 'peer-evaluation', target: 'db-certificate' }
  ]
};
