const queries = {
    all: 'SELECT * FROM entries',
    byEmail: `SELECT e.title, e.content, e.date, e.category, a.name, a.image
   FROM entries AS e
   INNER JOIN authors AS a
   ON e.id_author = a.id_author
   WHERE a.email = $1
   ORDER BY e.title;`,
    byId: 'SELECT * FROM entries WHERE id_entry = $1',
    createOne: 'INSERT INTO entries (title, content, id_author, category) VALUES ($1, $2, $3, $4) RETURNING *',
    editOne: 'SELECT id_entry FROM entries WHERE id_entry = $1',
    deleteOne: 'DELETE FROM entries WHERE id_entry = $1'
};


module.exports = queries;